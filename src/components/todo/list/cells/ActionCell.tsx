import { TableCell } from '@/components/ui/table'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover'
import { EllipsisVertical as EllipsisVerticalIcon } from 'lucide-react'
import { TodoUpdateDialog } from '../TodoUpdateDialog'
import { TodoDeleteActionButton } from '../TodoDeleteActionButton'

interface ActionCellProps {
  id: number
}

export const ActionCell = ({ id }: ActionCellProps) => (
  <TableCell className="w-0">
    <ShowMoreButton id={id} />
  </TableCell>
)

const ShowMoreButton = ({ id }: { id: number }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button>
          <EllipsisVerticalIcon />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <ul>
          <li className="border-b-2 border-solid border-gray-100">
            <TodoUpdateDialog id={id} />
          </li>
          <li>
            <TodoDeleteActionButton id={id} />
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  )
}
