import { useFilteredTodosContext } from '@/context'
import { useTodoContext } from '@/server/context'
import { ToDo } from '@/types/api'
import { useEffect, useState } from 'react'

export const useFilterTodo = () => {
  const todos = useTodoContext()

  const { size, pageIndex, text } = useFilteredTodosContext()

  const [filteredTodos, setFilteredTodos] = useState<ToDo[]>([])

  useEffect(() => {
    const pageCnt = pageIndex * size

    setFilteredTodos(
      todos
        .filter((todo) => todo.text.includes(text))
        .slice(pageCnt, pageCnt + size)
    )
  }, [size, todos, pageIndex, text])

  return {
    todos: filteredTodos,
  }
}
