import { TableCell } from '@/components/ui/table'
import {
  CircleCheckBig as CircleCheckBigIcon,
  Circle as CircleIcon,
} from 'lucide-react'

interface DoneCellProp {
  done: boolean
}

export const DoneCell = ({ done }: DoneCellProp) => (
  <TableCell className="w-[10%] text-[16px] font-medium">
    {done ? <Done /> : <Todo />}
  </TableCell>
)

const Done = () => (
  <div className="flex gap-x-[8px] items-center">
    <CircleCheckBigIcon width={20} height={20} />
    <p>Done</p>
  </div>
)

const Todo = () => (
  <div className="flex gap-x-[8px] items-center">
    <CircleIcon width={20} height={20} />
    <p>Todo</p>
  </div>
)
