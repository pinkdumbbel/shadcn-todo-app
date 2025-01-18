import { Input } from '@/components/ui/input'

import { Checkbox } from '@/components/ui/checkbox'
import { DatePicker } from '../common'
import { Calendar } from '@/components/ui/calendar'
import { useState } from 'react'
import { DateRange } from 'react-day-picker'

export const TodSearchFilter = () => {
  const [date, setDate] = useState<DateRange>()

  return (
    <section className="flex items-center gap-x-[12px] mt-[40px]">
      <Input placeholder="Filter todos..." className="w-[480px] h-[48px]" />

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

      <Checkbox id="completed" className="w-[24px] h-[24px]" />

      <label htmlFor="completed" className="text-[16px] text-gray-700">
        Completed
      </label>
    </section>
  )
}
