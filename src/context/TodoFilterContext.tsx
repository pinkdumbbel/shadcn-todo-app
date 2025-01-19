import { useTodoContext } from '@/server/context'
import {
  createContext,
  PropsWithChildren,
  startTransition,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

interface Pagination {
  size: number
  pageIndex: number
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

const TodoPaginationContext = createContext<Pagination & { text: string }>({
  ...initialState,
  text: '',
})
const TodoPaginationActionContext = createContext<
  PaginationAction & SearchFilterAction
>({ ...initialActionState, ...initialSearchFilterActionState })

export const TodoFilterProvider = ({ children }: PropsWithChildren) => {
  const todos = useTodoContext()

  const [pagination, setPagination] = useState<Pagination>(initialState)
  const [searchText, setSearchFilter] = useState<string>('')

  const filterByText = (text: string) => {
    setSearchFilter(text)
    startTransition(() => {
      localStorage.setItem('searchText', text)
    })
  }

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

  const filter: PaginationAction & SearchFilterAction = useMemo(
    () => ({
      updateSize,
      moveNextPage,
      movePrevPage,
      moveFirstPage,
      moveLastPage,
      filterByText,
    }),
    [moveFirstPage, moveLastPage, updateSize]
  )

  return (
    <TodoPaginationActionContext.Provider value={filter}>
      <TodoPaginationContext.Provider
        value={{ ...pagination, text: searchText }}
      >
        {children}
      </TodoPaginationContext.Provider>
    </TodoPaginationActionContext.Provider>
  )
}

export const useFilteredTodosContext = () => useContext(TodoPaginationContext)

export const useFilterTodosActionContext = () =>
  useContext(TodoPaginationActionContext)
