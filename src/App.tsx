import { TodoHeader } from './components/todo/header'
import { TodSearchFilter } from './components/todo/search-filter'
import { TodoList } from './components/todo/list'
import { TodoPagination } from './components/todo/pagination'
import { TodoProvider } from './server/context'
import {
  TodoPaginationProvider,
  TodoRowCheckProvider,
  TodoSearchFilterProvider,
} from './context'

const App = () => (
  <main className="w-screen h-screen flex justify-center items-center">
    <article className="w-[60%] flex flex-col p-[40px] border-[1px] border-solid border-gray-300 rounded-xl shadow-xl">
      <TodoProvider>
        <TodoSearchFilterProvider>
          <TodoPaginationProvider>
            <TodoRowCheckProvider>
              <TodoHeader />
              <TodSearchFilter />
              <TodoList />
              <TodoPagination />
            </TodoRowCheckProvider>
          </TodoPaginationProvider>
        </TodoSearchFilterProvider>
      </TodoProvider>
    </article>
  </main>
)

export default App
