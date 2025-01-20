import { getSearchFilterFromStorage } from '@/lib/storage'
import {
  createContext,
  PropsWithChildren,
  startTransition,
  useCallback,
  useContext,
  useState,
} from 'react'
import { DateRange } from 'react-day-picker'

interface SearchFilter {
  searchText?: string
  deadline?: DateRange
  done?: boolean
}

interface SearchFilterAction {
  filterBySearchText: (text: string) => void
  filterByDeadline: (deadline?: DateRange) => void
  filterByDone: (done: boolean) => void
}

const TodoSearchFilterContext = createContext<SearchFilter>({})
const TodoSearchFilterActionContext = createContext<SearchFilterAction>({
  filterBySearchText: () => undefined,
  filterByDeadline: () => undefined,
  filterByDone: () => undefined,
})

const searchFilterKey = 'searchFilter'

export const TodoSearchFilterProvider = ({ children }: PropsWithChildren) => {
  const [searchFilter, setSearchFilter] = useState<SearchFilter>(
    getSearchFilterFromStorage()
  )

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

  const updater = {
    filterBySearchText,
    filterByDone,
    filterByDeadline,
  }

  return (
    <TodoSearchFilterActionContext.Provider value={updater}>
      <TodoSearchFilterContext.Provider value={searchFilter}>
        {children}
      </TodoSearchFilterContext.Provider>
    </TodoSearchFilterActionContext.Provider>
  )
}

export const useSearchFilterContext = () => useContext(TodoSearchFilterContext)
export const useSearchFilterActionContext = () =>
  useContext(TodoSearchFilterActionContext)
