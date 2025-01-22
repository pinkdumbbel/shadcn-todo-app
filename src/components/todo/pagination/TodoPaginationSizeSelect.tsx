import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  useFilteredTodoContext,
  usePaginationActionContext,
} from '@/server/context/PaginationContext'

const rowsPerPage = ['5', '10', '20']

export const TodoPaginationSizeSelect = () => {
  const { size } = useFilteredTodoContext()
  const { updateSize } = usePaginationActionContext()

  return (
    <div className="flex gap-x-[8px]">
      <span className="text-[20px]">Rows per page</span>
      <Select onValueChange={(size) => updateSize(Number(size))}>
        <SelectTrigger className="w-[100px]">
          <SelectValue placeholder={size}>{size}</SelectValue>
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            {rowsPerPage.map((value) => (
              <SelectItem key={value} value={value}>
                {value}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
