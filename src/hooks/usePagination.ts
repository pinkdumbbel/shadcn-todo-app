import { useFilteredTodosContext } from '@/context'
import { useTodoContext } from '@/server/context'

export const usePagination = () => {
  const todos = useTodoContext()
  const { pageIndex, size } = useFilteredTodosContext()

  return {
    hasPrevPage: pageIndex > 0,
    hasNextPage: pageIndex * size + size < todos.length,
    isFirstPage: !pageIndex,
    isLastPage: pageIndex * size + size >= todos.length,
  }
}
