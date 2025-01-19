import { TodoHeader } from './components/todo/header'
import { TodSearchFilter } from './components/todo/search-filter'
import { TodoList } from './components/todo/list'
import { TodoPagination } from './components/todo/pagination'
import { TodoProvider } from './server/context'
import { TodoFilterProvider, TodoRowCheckProvider } from './context'

const App = () => (
  <main className="w-screen h-screen flex justify-center items-center">
    <article className="w-[50%] max-h-[80%] flex flex-col p-[40px] border-[1px] border-solid border-gray-300 rounded-xl shadow-xl">
      <TodoProvider>
        <TodoFilterProvider>
          <TodoRowCheckProvider>
            <TodoHeader />
            <TodSearchFilter />
            <TodoList />
            <TodoPagination />
          </TodoRowCheckProvider>
        </TodoFilterProvider>
      </TodoProvider>
    </article>
  </main>
)

export default App
