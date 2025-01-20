import { Input } from '@/components/ui/input'
import {
  useSearchFilterActionContext,
  useSearchFilterContext,
} from '@/context/TodoSearchFilterContext'
import { DatePicker } from '../common'
import { Calendar } from '@/components/ui/calendar'
import { DateRange } from 'react-day-picker'
import { Checkbox } from '@/components/ui/checkbox'

export const TodSearchFilter = () => {
  const { searchText, deadline, done } = useSearchFilterContext()
  const { filterBySearchText, filterByDeadline, filterByDone } =
    useSearchFilterActionContext()

  const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    filterBySearchText(value)
  }

  const onChangeDeadline = (date?: DateRange) => {
    filterByDeadline(date)
  }

  const onChangeDone = (done: boolean) => {
    filterByDone(done)
  }

  return (
    <section className="flex items-center gap-x-[12px] mt-[40px]">
      <Input
        value={searchText}
        placeholder="Filter todos..."
        className="w-[480px] h-[48px]"
        onChange={onChangeText}
      />

      <div className="w-[240px]">
        <DatePicker placeholder="Filter deadline..." date={deadline}>
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={deadline?.from}
            selected={deadline}
            onSelect={onChangeDeadline}
            numberOfMonths={2}
          />
        </DatePicker>
      </div>

      <Checkbox
        id="done"
        className="w-[24px] h-[24px]"
        onCheckedChange={onChangeDone}
        checked={done}
      />

      <label htmlFor="done" className="text-[16px] text-gray-700">
        Done
      </label>
    </section>
  )
}
