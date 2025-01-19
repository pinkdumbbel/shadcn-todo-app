import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn, yyyymmdd, yyyymmddRange } from '@/lib/utils'
import { Calendar as CalendarIcon } from 'lucide-react'
import { PropsWithChildren } from 'react'
import { DateRange } from 'react-day-picker'

interface DatePickerProps {
  date?: Date | DateRange
  placeholder?: string
}

export const DatePicker = ({
  date,
  placeholder,
  children,
}: PropsWithChildren<DatePickerProps>) => (
  <Popover>
    <PopoverTrigger asChild>
      <Button
        variant={'outline'}
        className={cn(
          'w-full h-[48px] justify-start text-left font-normal',
          !date && 'text-muted-foreground'
        )}
      >
        <CalendarIcon className="mr-2 h-4 w-4" />
        {date ? formatDate(date) : <span>{placeholder}</span>}
      </Button>
    </PopoverTrigger>

    <PopoverContent className="w-auto p-0">{children}</PopoverContent>
  </Popover>
)

const isDateRange = (date: unknown): date is DateRange =>
  date !== null && typeof date === 'object' && 'from' in date && 'to' in date

const formatDate = (date: DatePickerProps['date']): string =>
  isDateRange(date) ? yyyymmddRange(date) : yyyymmdd(date)
