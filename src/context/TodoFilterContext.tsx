import { useTodoContext } from '@/server/context'
import { ToDo } from '@/types/api'
import {
  createContext,
  PropsWithChildren,
  startTransition,
  useContext,
  useEffect,
  useState,
} from 'react'

interface Pagination {
  size: number
  pageIndex: number
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

interface SearchFilterAction {
  filterByText: (text: string) => void
}

const initialState = {
  size: 10,
  pageIndex: 0,
  hasPrevPage: false,
  hasNextPage: false,
  isFirstPage: false,
  isLastPage: false,
}

const initialActionState = {
  updateSize: () => undefined,
  moveNextPage: () => undefined,
  movePrevPage: () => undefined,
  moveFirstPage: () => undefined,
  moveLastPage: () => undefined,
}

const initialSearchFilterActionState = {
  filterByText: () => undefined,
}

const PaginatedTodosContext = createContext<ToDo[]>([])
const TodoPaginationContext = createContext<Pagination>({
  ...initialState,
})
const TodoPaginationActionContext = createContext<
  PaginationAction & SearchFilterAction
>({ ...initialActionState, ...initialSearchFilterActionState })

export const TodoFilterProvider = ({ children }: PropsWithChildren) => {
  const todos = useTodoContext()
  const [filteredTodos, setFilteredTodos] = useState<ToDo[]>([])
  const [pagination, setPagination] = useState<Pagination>(initialState)
  const [searchFilter, setSearchFilter] = useState<string>('')

  const filterByText = (text: string) => {
    setSearchFilter(text)
    startTransition(() => {
      localStorage.setItem('searchFilter', JSON.stringify(text))
    })
  }

  const updateSize = (size: number) => {
    setPagination((prev) => {
      const totalPage = Math.ceil(todos.length / size)
      const newPageIndex = Math.min(prev.pageIndex, totalPage - 1)

      return {
        ...prev,
        size,
        pageIndex: newPageIndex,
      }
    })
  }

  const movePrevPage = () => {
    setPagination((prev) => ({
      ...prev,
      pageIndex: prev.pageIndex - 1,
    }))
  }

  const moveNextPage = () => {
    setPagination((prev) => ({
      ...prev,
      pageIndex: prev.pageIndex + 1,
    }))
  }

  const moveFirstPage = () => {
    if (!pagination.pageIndex) return

    setPagination((prev) => ({
      ...prev,
      pageIndex: 0,
    }))
  }

  const moveLastPage = () => {
    const lastPageIndex = Math.ceil(todos.length / pagination.size) - 1

    if (pagination.pageIndex === lastPageIndex) return

    setPagination((prev) => ({
      ...prev,
      pageIndex: lastPageIndex,
    }))
  }

  useEffect(() => {
    const { pageIndex, size } = pagination

    const pageCnt = pageIndex * size

    setFilteredTodos(
      todos
        .slice(pageCnt, pageCnt + size)
        .filter(({ text }) => text.includes(searchFilter))
    )

    setPagination((prev) => ({
      ...prev,
      hasPrevPage: pageIndex > 0,
      hasNextPage: pageIndex * prev.size + prev.size < todos.length,
      isFirstPage: !pageIndex,
      isLastPage: pageIndex * prev.size + prev.size >= todos.length,
    }))
  }, [todos, pagination, searchFilter])

  return (
    <TodoPaginationActionContext.Provider
      value={{
        updateSize,
        moveNextPage,
        movePrevPage,
        moveFirstPage,
        moveLastPage,
        filterByText,
      }}
    >
      <TodoPaginationContext.Provider value={{ ...pagination }}>
        <PaginatedTodosContext.Provider value={filteredTodos}>
          {children}
        </PaginatedTodosContext.Provider>
      </TodoPaginationContext.Provider>
    </TodoPaginationActionContext.Provider>
  )
}

export const useFilteredTodosContext = () => {
  const filteredTodos = useContext(PaginatedTodosContext)
  const pagination = useContext(TodoPaginationContext)

  return {
    filteredTodos,
    ...pagination,
  }
}

export const useFilterTodosActionContext = () =>
  useContext(TodoPaginationActionContext)
