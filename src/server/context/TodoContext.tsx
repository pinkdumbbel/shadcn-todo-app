import { PropsWithChildren } from 'react'
import { FetchedTodoProvider } from './FetchedTodoContext'
import { SearchFilterProvider } from './SearchFilterContext'
import { PaginationProvider } from './PaginationContext'

export const TodoContextProvider = ({ children }: PropsWithChildren) => (
  <FetchedTodoProvider>
    <SearchFilterProvider>
      <PaginationProvider>{children}</PaginationProvider>
    </SearchFilterProvider>
  </FetchedTodoProvider>
)
