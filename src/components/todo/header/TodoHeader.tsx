import { AddTodoDialog } from './AddTodoDialog'

export const TodoHeader = () => (
  <header className="flex justify-between">
    <h1 className="text-3xl font-bold">Todo List</h1>
    <AddTodoDialog />
  </header>
)
