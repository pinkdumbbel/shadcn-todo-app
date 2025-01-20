import { Checkbox } from '@/components/ui/checkbox'
import { Popover, PopoverTrigger } from '@/components/ui/popover'
import * as Table from '@/components/ui/table'
import {
  getDaysUntilDeadline,
  isDeadlineApproaching,
  yyyymmddMs,
} from '@/lib/utils'
import { PopoverContent } from '@radix-ui/react-popover'
import { EllipsisVertical } from 'lucide-react'
import { TodoUpdateDialog } from './TodoUpdateDialog'
import { memo } from 'react'
import { TodoDeleteActionButton } from './TodoDeleteActionButton'
import { useFilterTodo } from '@/hooks'
import { useTodoRowCheckActionContext, useTodoRowCheckContext } from '@/context'
import { Info as InfoIcon } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export const TodoList = () => {
  const { todos } = useFilterTodo()
  const todoIds = useTodoRowCheckContext()
  const { checkAllTodo, checkTodo } = useTodoRowCheckActionContext()

  return (
    <section className="mt-[20px] border-[1px] border-solid border-gray-300 rounded-lg">
      <Table.Table>
        <Table.TableHeader>
          <Table.TableRow className="hover:bg-transparent">
            <Table.TableHead className="w-[24px]">
              <Checkbox
                className="w-[24px] h-[24px]"
                checked={todoIds.length > 0 && todos.length === todoIds.length}
                onClick={checkAllTodo}
              />
            </Table.TableHead>
            <Table.TableHead className="text-[20px]">Todo</Table.TableHead>
            <Table.TableHead className="text-[20px]">Deadline</Table.TableHead>
            <Table.TableHead className="text-[20px]">Done</Table.TableHead>
          </Table.TableRow>
        </Table.TableHeader>

        <Table.TableBody>
          {todos.map((todo) => (
            <Table.TableRow key={todo.id}>
              <Table.TableCell>
                <Checkbox
                  className="w-[24px] h-[24px]"
                  checked={todoIds.includes(todo.id)}
                  onClick={() => checkTodo(todo.id)}
                />
              </Table.TableCell>
              <Table.TableCell className="text-[16px] font-medium text-gray-700 truncate">
                {todo.text}({todo.id})
              </Table.TableCell>
              {isDeadlineApproaching(todo.deadline) ? (
                <DeadlineApproachCell deadline={todo.deadline} />
              ) : (
                <Table.TableCell className="w-[20%] text-[16px] font-medium text-gray-700">
                  {yyyymmddMs(todo.deadline)}
                </Table.TableCell>
              )}
              <Table.TableCell className="w-[10%] text-[16px] font-medium text-gray-700">
                {todo.done ? 'Y' : 'N'}
              </Table.TableCell>
              <Table.TableCell className="w-0">
                <ShowMoreButton id={todo.id} />
              </Table.TableCell>
            </Table.TableRow>
          ))}
        </Table.TableBody>
      </Table.Table>
    </section>
  )
}

const ShowMoreButton = memo(({ id }: { id: number }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button>
          <EllipsisVertical />
        </button>
      </PopoverTrigger>
      <PopoverContent className="bg-white ">
        <ul className="border-2 border-solid border-gray-100">
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
})

interface DeadlineApproachCellProps {
  deadline: number
}

const DeadlineApproachCell = ({ deadline }: DeadlineApproachCellProps) => {
  const untilDay = getDaysUntilDeadline(deadline)

  return (
    <Table.TableCell className="w-[20%] text-[16px] font-medium text-red-700">
      <div className="flex gap-x-[8px] items-center">
        <TooltipProvider delayDuration={50}>
          <Tooltip>
            <TooltipTrigger>
              <InfoIcon width={20} height={20} className=" stroke-red-700" />
            </TooltipTrigger>
            <TooltipContent
              className="bg-black text-white text-[16px]"
              side="bottom"
            >
              <p>
                {untilDay >= 0
                  ? `마감 기한이 ${untilDay}일 남았습니다.`
                  : '마감 기한이 지났습니다.'}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <p>{yyyymmddMs(deadline)}</p>
      </div>
    </Table.TableCell>
  )
}
