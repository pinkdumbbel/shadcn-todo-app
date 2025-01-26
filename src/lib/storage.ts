import { DateRange } from 'react-day-picker'

export const getSearchFilterFromStorage = (): {
  text?: string
  deadline?: DateRange
  done?: boolean
} => {
  const searchFilter = localStorage.getItem('searchParams')

  if (!searchFilter) return {}

  const parsedSearchFilter = JSON.parse(searchFilter)

  return {
    text: parsedSearchFilter.searchText,
    deadline: parsedSearchFilter.deadline
      ? {
          from: new Date(parsedSearchFilter.deadline.from),
          to: new Date(parsedSearchFilter.deadline.to),
        }
      : undefined,
    done: parsedSearchFilter.done,
  }
}
