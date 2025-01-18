import { Checkbox } from '@/components/ui/checkbox'
import * as Table from '@/components/ui/table'

export const TodoList = () => {
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
            <Table.TableHead className="text-[20px]">Completed</Table.TableHead>
          </Table.TableRow>
        </Table.TableHeader>

        <Table.TableBody>
          <Table.TableRow>
            <Table.TableCell>
              <Checkbox className="w-[24px] h-[24px]" />
            </Table.TableCell>
            <Table.TableCell className="max-w-[500px] truncate text-[16px] font-medium text-gray-700 "></Table.TableCell>
            <Table.TableCell className="w-[20%] text-[16px] font-medium text-gray-700">
              2025-01-20
            </Table.TableCell>
            <Table.TableCell className="w-[10%] text-[16px] font-medium text-gray-700">
              N
            </Table.TableCell>
          </Table.TableRow>
        </Table.TableBody>
      </Table.Table>
    </section>
  )
}
