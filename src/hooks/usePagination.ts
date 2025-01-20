import { useTodoPaginationContext } from '@/context'
import { useFilterTodo } from './useFilterTodo'

export const usePagination = () => {
  const { todos } = useFilterTodo()
  const { pageIndex, size } = useTodoPaginationContext()

  return {
    hasPrevPage: pageIndex > 0,
    hasNextPage: pageIndex * size + size < todos.length,
    isFirstPage: !pageIndex,
    isLastPage: pageIndex * size + size >= todos.length,
  }
}
