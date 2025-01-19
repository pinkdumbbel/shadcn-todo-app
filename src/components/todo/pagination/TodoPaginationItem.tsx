import { Button } from '@/components/ui/button'
import { PaginationItem } from '@/components/ui/pagination'
import { ComponentProps, PropsWithChildren } from 'react'

interface TodoPaginationItemProps
  extends Pick<ComponentProps<typeof Button>, 'onClick' | 'disabled'> {}

export const TodoPaginationItem = ({
  children,
  ...props
}: PropsWithChildren<TodoPaginationItemProps>) => {
  return (
    <PaginationItem>
      <Button
        {...props}
        size="icon"
        className="bg-white border-[1px] border-solid border-gray-500 hover:bg-gray-100"
      >
        {children}
      </Button>
    </PaginationItem>
  )
}
