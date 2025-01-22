import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from 'react'
import { useTodoActionContext } from '@/server/context'
import { useTodos } from '@/hooks/useTodos'

interface TodoRowCheck {
  checkTodo: (id: number) => void
  checkAllTodo: () => void
  deleteTodos: () => Promise<void>
}

const initialActionState = {
  checkTodo: () => undefined,
  checkAllTodo: () => undefined,
  deleteTodos: () => undefined as unknown as Promise<void>,
}

const TodoRowCheckContext = createContext<number[]>([])
const TodoRowCheckActionContext =
  createContext<TodoRowCheck>(initialActionState)

export const TodoRowCheckProvider = ({ children }: PropsWithChildren) => {
  const { deleteTodo } = useTodoActionContext()
  const todos = useTodos()
  const [todoIds, setTodoIds] = useState<number[]>([])

  const checkTodo = useCallback((id: number) => {
    setTodoIds((todoIds) =>
      todoIds.includes(id)
        ? todoIds.filter((todoId) => todoId !== id)
        : [...todoIds, id]
    )
  }, [])

  const checkAllTodo = useCallback(() => {
    if (todoIds.length) {
      setTodoIds([])
      return
    }
    const ids = todos.map(({ id }) => id)
    setTodoIds(ids)
  }, [todos, todoIds.length])

  const deleteTodos = useCallback(async () => {
    const todoDeleteRequests = todoIds.map((id) => () => deleteTodo(id))
    await Promise.all(todoDeleteRequests.map((request) => request()))
    setTodoIds([])
  }, [deleteTodo, todoIds])

  return (
    <TodoRowCheckActionContext.Provider
      value={{ checkTodo, checkAllTodo, deleteTodos }}
    >
      <TodoRowCheckContext.Provider value={todoIds}>
        {children}
      </TodoRowCheckContext.Provider>
    </TodoRowCheckActionContext.Provider>
  )
}

export const useTodoRowCheckContext = () => useContext(TodoRowCheckContext)
export const useTodoRowCheckActionContext = () =>
  useContext(TodoRowCheckActionContext)
