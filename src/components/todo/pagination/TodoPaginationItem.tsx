import { Button } from '@/components/ui/button'
import { PaginationItem } from '@/components/ui/pagination'
import { PropsWithChildren } from 'react'

export const TodoPaginationItem = ({ children }: PropsWithChildren) => (
  <PaginationItem>
    <Button
      size="icon"
      className="bg-white border-[1px] border-solid border-gray-500 hover:bg-gray-100"
    >
      {children}
    </Button>
  </PaginationItem>
)
