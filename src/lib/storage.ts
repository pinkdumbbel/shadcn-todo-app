export const getSearchFilterFromStorage = () => {
  const searchFilter = localStorage.getItem('searchFilter')

  if (!searchFilter) return {}

  const parsedSearchFilter = JSON.parse(searchFilter)

  return {
    searchText: parsedSearchFilter.searchText,
    deadline: {
      from: new Date(parsedSearchFilter.deadline.from),
      to: new Date(parsedSearchFilter.deadline.to),
    },
    done: parsedSearchFilter.done,
  }
}
