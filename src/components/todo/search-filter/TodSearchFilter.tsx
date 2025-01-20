import { Input } from '@/components/ui/input'
import { startTransition } from 'react'
import { useFilteredTodosContext, useFilterTodosActionContext } from '@/context'

export const TodSearchFilter = () => {
  const { filterByText } = useFilterTodosActionContext()
  const { text } = useFilteredTodosContext()

  const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    startTransition(() => {
      filterByText(value)
    })
  }

  return (
    <section className="flex items-center gap-x-[12px] mt-[40px]">
      <Input
        value={text}
        placeholder="Filter todos..."
        className="w-[480px] h-[48px]"
        onChange={onChangeText}
      />

      {/* <div className="w-[300px]">
        <DatePicker placeholder="Filter deadline...">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </DatePicker>
      </div>

      <Checkbox id="done" className="w-[24px] h-[24px]" />

      <label htmlFor="done" className="text-[16px] text-gray-700">
        Done
      </label> */}
    </section>
  )
}
