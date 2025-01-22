import { Checkbox } from '@/components/ui/checkbox'
import * as Table from '@/components/ui/table'

import { useFilterTodo } from '@/hooks'
import { useTodoRowCheckActionContext, useTodoRowCheckContext } from '@/context'
import { DeadlineCell, TodoTextCell, DoneCell, ActionCell } from './cells'
import { ScrollArea } from '@/components/ui/scroll-area'

export const TodoList = () => {
  const { todos } = useFilterTodo()
  const todoIds = useTodoRowCheckContext()
  const { checkAllTodo, checkTodo } = useTodoRowCheckActionContext()

  return (
    <section className="mt-[20px] border-[1px] border-solid border-gray-300 rounded-lg">
      <ScrollArea className="h-[860px]" type="always">
        <Table.Table>
          <Table.TableHeader className="h-[60px]">
            <Table.TableRow className="hover:bg-transparent">
              <Table.TableHead className="w-[24px]">
                <Checkbox
                  className="w-[24px] h-[24px]"
                  checked={
                    todoIds.length > 0 && todos.length === todoIds.length
                  }
                  onClick={checkAllTodo}
                />
              </Table.TableHead>
              <Table.TableHead className="text-[20px]">Todo</Table.TableHead>
              <Table.TableHead className="text-[20px]">
                Deadline
              </Table.TableHead>
              <Table.TableHead className="text-[20px]">Done</Table.TableHead>
            </Table.TableRow>
          </Table.TableHeader>

          <Table.TableBody>
            {todos.map((todo) => (
              <Table.TableRow key={todo.id} className="h-[80px]">
                <Table.TableCell>
                  <Checkbox
                    className="w-[24px] h-[24px]"
                    checked={todoIds.includes(todo.id)}
                    onClick={() => checkTodo(todo.id)}
                  />
                </Table.TableCell>

                <TodoTextCell done={todo.done} text={todo.text} />

                <DeadlineCell deadline={todo.deadline} />

                <DoneCell done={todo.done} />

                <ActionCell id={todo.id} />
              </Table.TableRow>
            ))}
          </Table.TableBody>
        </Table.Table>
      </ScrollArea>
    </section>
  )
}
