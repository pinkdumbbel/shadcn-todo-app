import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from 'react'
import { useFilterTodo } from '@/hooks'

interface TodoRowCheck {
  checkTodo: (id: number) => void
  checkAllTodo: () => void
}

const initialActionState = {
  checkTodo: () => undefined,
  checkAllTodo: () => undefined,
}

const TodoRowCheckContext = createContext<number[]>([])
const TodoRowCheckActionContext =
  createContext<TodoRowCheck>(initialActionState)

export const TodoRowCheckProvider = ({ children }: PropsWithChildren) => {
  const { todos } = useFilterTodo()
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

  return (
    <TodoRowCheckActionContext.Provider value={{ checkTodo, checkAllTodo }}>
      <TodoRowCheckContext.Provider value={todoIds}>
        {children}
      </TodoRowCheckContext.Provider>
    </TodoRowCheckActionContext.Provider>
  )
}

export const useTodoRowCheckContext = () => useContext(TodoRowCheckContext)
export const useTodoRowCheckActionContext = () =>
  useContext(TodoRowCheckActionContext)
