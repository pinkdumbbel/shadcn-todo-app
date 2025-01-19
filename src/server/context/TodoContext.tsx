import { ToDo } from '@/types/api'
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { getTodos } from '../fetch'

interface TodoContextValue {
  todos: ToDo[]
  setTodos: (todos: ToDo[]) => void
}

const TodoContext = createContext<TodoContextValue>({
  todos: [],
  setTodos: () => undefined,
})

export const TodoProvider = ({ children }: PropsWithChildren) => {
  const [todos, setTodos] = useState<ToDo[]>([])

  const fetchTodos = useCallback(async () => {
    const todos = await getTodos()
    setTodos(todos)
  }, [])

  useEffect(() => {
    fetchTodos()
  }, [fetchTodos])

  return (
    <TodoContext.Provider value={{ todos, setTodos }}>
      {children}
    </TodoContext.Provider>
  )
}

export const useTodoContext = () => useContext(TodoContext)
