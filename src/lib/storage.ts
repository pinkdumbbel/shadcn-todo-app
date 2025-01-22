import { DateRange } from 'react-day-picker'

export const getSearchFilterFromStorage = (): {
  searchText?: string
  deadline?: DateRange
  done?: boolean
} => {
  const searchFilter = localStorage.getItem('searchFilter')

  if (!searchFilter) return {}

  const parsedSearchFilter = JSON.parse(searchFilter)

  return {
    searchText: parsedSearchFilter.searchText,
    deadline: parsedSearchFilter.deadline
      ? {
          from: new Date(parsedSearchFilter.deadline.from),
          to: new Date(parsedSearchFilter.deadline.to),
        }
      : undefined,
    done: parsedSearchFilter.done,
  }
}
