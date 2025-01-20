import { TableCell } from '@/components/ui/table'

interface TodoTextCellProps {
  text: string
  done: boolean
}

export const TodoTextCell = ({ text, done }: TodoTextCellProps) => (
  <TableCell
    className={`text-[16px] font-medium text-gray-700 truncate ${
      done ? 'line-through	text-gray-400' : 'text-gray-700'
    }`}
  >
    {text}
  </TableCell>
)
