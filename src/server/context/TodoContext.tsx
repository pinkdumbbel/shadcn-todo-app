import { ToDo } from '@/types/api'
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { createTodo, getTodos } from '../fetch'
import { ToDoPayload } from '@/types/todo'

interface TodoActionContextValue {
  addTodo: (payload: ToDoPayload) => void
}

const TodoActionContext = createContext<TodoActionContextValue>({
  addTodo: () => undefined,
})

const TodoContext = createContext<ToDo[]>([])

export const TodoProvider = ({ children }: PropsWithChildren) => {
  const [todos, setTodos] = useState<ToDo[]>([])

  const fetchTodos = useCallback(async () => {
    const todos = await getTodos()
    setTodos(todos)
  }, [])

  const addTodo = async (payload: ToDoPayload) => {
    const newTodo = await createTodo({
      ...payload,
      done: false,
    })
    setTodos((prevTodos) => [...prevTodos, newTodo])
  }

  useEffect(() => {
    fetchTodos()
  }, [fetchTodos])

  return (
    <TodoActionContext.Provider value={{ addTodo }}>
      <TodoContext.Provider value={todos}>{children}</TodoContext.Provider>
    </TodoActionContext.Provider>
  )
}

export const useTodoContext = () => useContext(TodoContext)

export const useTodoActionContext = () => useContext(TodoActionContext)
