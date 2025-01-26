import { ToDoPaginationParams, ToDoSearchFilterParams } from '@/types/todo'
import { useState } from 'react'
import { useTodos } from './useTodos'

export const usePagination = (
  searchFilterParams: Partial<ToDoSearchFilterParams>
) => {
  const [pagination, setPagination] = useState<ToDoPaginationParams>({
    page: 0,
    size: 10,
  })

  const { total } = useTodos({ ...searchFilterParams, ...pagination })

  const handlePagination = (direction: 'prev' | 'next' | 'first' | 'last') => {
    const page = (() => {
      switch (direction) {
        case 'prev':
          return pagination.page - 1
        case 'next':
          return pagination.page + 1
        case 'first':
          return 0
        case 'last':
          return Math.floor(total / pagination.size)
      }
    })()

    setPagination((prev) => ({
      ...prev,
      page,
    }))
  }

  return {
    pagination,
    handlePagination,
    /* hasNextPage: todos.length >= pagination.size,
    hasPrevPage: pagination.page > 0,
    isFirstPage: pagination.page === 0,
    isLastPage: total <= pagination.page * pagination.size + pagination.size, */
  }
}
