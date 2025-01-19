import { ToDo } from '@/types/api'
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import {
  createTodo,
  getTodos,
  updateTodo as updateTodoRequest,
  deleteTodo as deleteTodoRequest,
} from '../fetch'
import { ToDoPayload } from '@/types/todo'

interface TodoActionContextValue {
  addTodo: (payload: ToDoPayload) => void
  updateTodo: (payload: ToDo) => Promise<ToDo>
  deleteTodo: (id: number) => void
}
const TodoActionContext = createContext<TodoActionContextValue>({
  addTodo: () => undefined,
  updateTodo: () => ({} as Promise<ToDo>),
  deleteTodo: () => undefined,
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

  const updateTodo = async (payload: ToDo): Promise<ToDo> => {
    const updatedTodo = await updateTodoRequest(payload)
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    )
    return updatedTodo
  }

  const deleteTodo = async (id: number) => {
    await deleteTodoRequest(id)
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id))
  }

  useEffect(() => {
    fetchTodos()
  }, [fetchTodos])

  return (
    <TodoActionContext.Provider value={{ addTodo, updateTodo, deleteTodo }}>
      <TodoContext.Provider value={todos}>{children}</TodoContext.Provider>
    </TodoActionContext.Provider>
  )
}

export const useTodoContext = () => useContext(TodoContext)

export const useTodoActionContext = () => useContext(TodoActionContext)
