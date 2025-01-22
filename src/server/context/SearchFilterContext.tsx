import { getSearchFilterFromStorage } from '@/lib/storage'
import {
  createContext,
  PropsWithChildren,
  startTransition,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import { DateRange } from 'react-day-picker'
import { useFetchedTodoContext } from './FetchedTodoContext'
import { ToDo } from '@/types/api'

interface SearchFilter {
  searchText?: string
  deadline?: DateRange
  done?: boolean
}

interface SearchFilterAction {
  filterBySearchText: (text: string) => void
  filterByDeadline: (deadline?: DateRange) => void
  filterByDone: (done: boolean) => void
  resetSearchFilter: () => void
}

const SearchFilterContext = createContext<ToDo[]>([])
const SearchFilterActionContext = createContext<SearchFilterAction>({
  filterBySearchText: () => undefined,
  filterByDeadline: () => undefined,
  filterByDone: () => undefined,
  resetSearchFilter: () => undefined,
})

const searchFilterKey = 'searchFilter'

export const SearchFilterProvider = ({ children }: PropsWithChildren) => {
  const todos = useFetchedTodoContext()

  const [searchFilter, setSearchFilter] = useState<SearchFilter>(
    getSearchFilterFromStorage()
  )

  const filteredTodos = useMemo(() => {
    const { searchText, deadline, done } = searchFilter

    return todos
      .filter((todo) => todo.text.includes(searchText ?? ''))
      .filter((todo) => {
        if (!deadline) return true

        const from = deadline.from?.getTime() ?? 0
        const to = deadline.to?.getTime() ?? 0

        return todo.deadline >= from && todo.deadline <= to
      })
      .filter((todo) => (done === undefined ? true : todo.done === done))
  }, [todos, searchFilter])

  const filterBySearchText = useCallback(
    (searchText: string) => {
      setSearchFilter((prev) => ({
        ...prev,
        searchText,
      }))
      startTransition(() =>
        localStorage.setItem(
          searchFilterKey,
          JSON.stringify({ ...searchFilter, searchText })
        )
      )
    },
    [searchFilter]
  )

  const filterByDeadline = useCallback(
    (deadline?: DateRange) => {
      setSearchFilter((prev) => ({
        ...prev,
        deadline,
      }))
      startTransition(() => {
        localStorage.setItem(
          searchFilterKey,
          JSON.stringify({ ...searchFilter, deadline })
        )
      })
    },
    [searchFilter]
  )

  const filterByDone = useCallback(
    (done: boolean) => {
      setSearchFilter((prev) => ({
        ...prev,
        done,
      }))
      startTransition(() => {
        localStorage.setItem(
          searchFilterKey,
          JSON.stringify({ ...searchFilter, done })
        )
      })
    },
    [searchFilter]
  )

  const resetSearchFilter = () => {
    setSearchFilter({})
    localStorage.removeItem(searchFilterKey)
  }

  const updater = {
    filterBySearchText,
    filterByDone,
    filterByDeadline,
    resetSearchFilter,
  }

  return (
    <SearchFilterActionContext.Provider value={updater}>
      <SearchFilterContext.Provider value={filteredTodos}>
        {children}
      </SearchFilterContext.Provider>
    </SearchFilterActionContext.Provider>
  )
}

export const useSearchFilterContext = () => useContext(SearchFilterContext)
export const useSearchFilterActionContext = () =>
  useContext(SearchFilterActionContext)
