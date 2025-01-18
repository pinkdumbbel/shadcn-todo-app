import { TodoHeader } from './components/todo/header'
import { TodSearchFilter } from './components/todo/search-filter'
import { TodoList } from './components/todo/list'
import { TodoPagination } from './components/todo/pagination'

const App = () => (
  <main className="w-screen h-screen flex justify-center items-center">
    <article className="w-[50%] max-h-[80%] flex flex-col p-[40px] border-[1px] border-solid border-gray-300 rounded-xl shadow-xl">
      <TodoHeader />
      <TodSearchFilter />
      <TodoList />
      <TodoPagination />
    </article>
  </main>
)

export default App
