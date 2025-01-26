import { Header } from './header'
import { SearchFilter } from './search-filter'
import { List } from './list'
import { useSearchFilter } from '@/hooks/useSearchFilter'
import { Pagination } from './pagination'
import { usePagination } from '@/hooks/usePagination'

export const TodoList = () => {
  const { params, searchFilterHandlers } = useSearchFilter()
  const { pagination, movePage } = usePagination(params)

  return (
    <article className="w-[60%] flex flex-col p-[40px] border-[1px] border-solid border-gray-300 rounded-xl shadow-xl">
      <Header />
      <SearchFilter params={params} handlers={searchFilterHandlers} />
      <List searchFilterParams={params} />
      <Pagination pagination={pagination} handlePagination={movePage} />
    </article>
  )
}
