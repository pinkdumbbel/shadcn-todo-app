import { Checkbox } from '@/components/ui/checkbox'
import * as Table from '@/components/ui/table'
import { useTodoContext } from '@/server/context'

export const TodoList = () => {
  const { todos } = useTodoContext()

  return (
    <section className="mt-[20px] border-[1px] border-solid border-gray-300 rounded-lg">
      <Table.Table>
        <Table.TableHeader>
          <Table.TableRow className="hover:bg-transparent">
            <Table.TableHead className="w-[24px]">
              <Checkbox className="w-[24px] h-[24px]" />
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
                <Checkbox className="w-[24px] h-[24px]" />
              </Table.TableCell>
              <Table.TableCell className="max-w-[500px] truncate text-[16px] font-medium text-gray-700 ">
                {todo.text}
              </Table.TableCell>
              <Table.TableCell className="w-[20%] text-[16px] font-medium text-gray-700">
                {todo.deadline}
              </Table.TableCell>
              <Table.TableCell className="w-[10%] text-[16px] font-medium text-gray-700">
                {todo.done ? 'Y' : 'N'}
              </Table.TableCell>
            </Table.TableRow>
          ))}
        </Table.TableBody>
      </Table.Table>
    </section>
  )
}
