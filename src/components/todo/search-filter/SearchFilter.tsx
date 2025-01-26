import { Input } from '@/components/ui/input'
import { DatePicker } from '../common'
import { Calendar } from '@/components/ui/calendar'
import { DateRange } from 'react-day-picker'
import { Checkbox } from '@/components/ui/checkbox'
import { ToDoSearchFilterParams } from '@/types/todo'
import { RotateCwIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface SearchFilterProps {
  params: Partial<ToDoSearchFilterParams>
  handlers: {
    onChangeText: (text: string) => void
    onChangeDeadline: (date?: DateRange) => void
    onChangeDone: (done: boolean) => void
    onReset: () => void
  }
}

export const SearchFilter = ({ params, handlers }: SearchFilterProps) => (
  <section className="flex justify-between mt-[40px]">
    <div className="flex items-center gap-x-[12px] ">
      <Input
        value={params.text}
        placeholder="Filter todos..."
        className="w-[480px] h-[48px]"
        onChange={(event) => handlers.onChangeText(event.target.value)}
      />

      <div className="w-[240px]">
        <DatePicker placeholder="Filter deadline..." date={params.deadline}>
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={params.deadline?.from}
            selected={params.deadline}
            onSelect={handlers.onChangeDeadline}
            numberOfMonths={2}
          />
        </DatePicker>
      </div>

      <Checkbox
        id="done"
        className="w-[24px] h-[24px]"
        onCheckedChange={handlers.onChangeDone}
        checked={!!params.done}
      />

      <label htmlFor="done" className="text-[16px] text-gray-700">
        Done
      </label>
    </div>

    <Button
      size="icon"
      className="bg-white hover:bg-gray-100"
      onClick={handlers.onReset}
    >
      <RotateCwIcon className="stroke-black" />
    </Button>
  </section>
)
