import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import { useSearchFilterContext } from './SearchFilterContext'
import { ToDo } from '@/types/api'

interface Pagination {
  size: number
  pageIndex: number
}

interface PaginatedResult extends Pagination {
  todos: ToDo[]
  hasPrevPage: boolean
  hasNextPage: boolean
  isFirstPage: boolean
  isLastPage: boolean
}

interface PaginationAction {
  updateSize: (size: number) => void
  moveNextPage: () => void
  movePrevPage: () => void
  moveFirstPage: () => void
  moveLastPage: () => void
}

const initialState = {
  todos: [],
  hasPrevPage: false,
  hasNextPage: false,
  isFirstPage: false,
  isLastPage: false,
  size: 10,
  pageIndex: 0,
}

const initialActionState = {
  updateSize: () => undefined,
  moveNextPage: () => undefined,
  movePrevPage: () => undefined,
  moveFirstPage: () => undefined,
  moveLastPage: () => undefined,
}

const PaginationContext = createContext<PaginatedResult>(initialState)
const PaginationActionContext =
  createContext<PaginationAction>(initialActionState)

export const PaginationProvider = ({ children }: PropsWithChildren) => {
  const todos = useSearchFilterContext()

  const [pagination, setPagination] = useState<Pagination>({
    size: 10,
    pageIndex: 0,
  })

  const paginatedResult: PaginatedResult = useMemo(() => {
    const { pageIndex, size } = pagination
    const currentPageIndex = pageIndex * size

    const paginatedTodos = todos.slice(
      currentPageIndex,
      currentPageIndex + size
    )

    return {
      todos: paginatedTodos,
      hasPrevPage: pageIndex > 0,
      hasNextPage: pageIndex < Math.ceil(todos.length / size) - 1,
      isFirstPage: !pageIndex,
      isLastPage: pageIndex === Math.ceil(todos.length / size) - 1,
      ...pagination,
    }
  }, [pagination, todos])

  const updateSize = useCallback(
    (size: number) => {
      setPagination((prev) => {
        const totalPage = Math.ceil(todos.length / size)
        const newPageIndex = Math.min(prev.pageIndex, totalPage - 1)

        return {
          ...prev,
          size,
          pageIndex: newPageIndex,
        }
      })
    },
    [todos.length]
  )

  const movePrevPage = useCallback(() => {
    setPagination((prev) => ({
      ...prev,
      pageIndex: prev.pageIndex - 1,
    }))
  }, [])

  const moveNextPage = useCallback(() => {
    setPagination((prev) => ({
      ...prev,
      pageIndex: prev.pageIndex + 1,
    }))
  }, [])

  const moveFirstPage = useCallback(() => {
    if (!pagination.pageIndex) return

    setPagination((prev) => ({
      ...prev,
      pageIndex: 0,
    }))
  }, [pagination.pageIndex])

  const moveLastPage = useCallback(() => {
    const lastPageIndex = Math.ceil(todos.length / pagination.size) - 1

    if (pagination.pageIndex === lastPageIndex) return

    setPagination((prev) => ({
      ...prev,
      pageIndex: lastPageIndex,
    }))
  }, [pagination.pageIndex, pagination.size, todos.length])

  const paginationAction = useMemo(
    () => ({
      updateSize,
      moveNextPage,
      movePrevPage,
      moveFirstPage,
      moveLastPage,
    }),
    [updateSize, moveNextPage, movePrevPage, moveFirstPage, moveLastPage]
  )

  return (
    <PaginationActionContext.Provider value={paginationAction}>
      <PaginationContext.Provider value={paginatedResult}>
        {children}
      </PaginationContext.Provider>
    </PaginationActionContext.Provider>
  )
}

export const useFilteredTodoContext = () => useContext(PaginationContext)

export const usePaginationActionContext = () =>
  useContext(PaginationActionContext)
