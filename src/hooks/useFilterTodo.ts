import { useTodoPaginationContext } from '@/context'
import { useSearchFilterContext } from '@/context/TodoSearchFilterContext'
import { useTodoContext } from '@/server/context'
import { ToDo } from '@/types/api'
import { useEffect, useState } from 'react'

export const useFilterTodo = () => {
  const todos = useTodoContext()

  const searchFilter = useSearchFilterContext()
  const { size, pageIndex } = useTodoPaginationContext()

  const [filteredTodos, setFilteredTodos] = useState<ToDo[]>([])

  useEffect(() => {
    const { searchText, deadline, done } = searchFilter

    setFilteredTodos(
      todos
        .filter((todo) => todo.text.includes(searchText ?? ''))
        .filter((todo) => {
          if (!deadline) return true

          const from = deadline.from?.getTime() ?? 0
          const to = deadline.to?.getTime() ?? 0

          return todo.deadline >= from && todo.deadline <= to
        })
        .filter((todo) => {
          if (done === undefined) return true
          return todo.done === done
        })
    )
  }, [size, todos, pageIndex, searchFilter])

  return {
    todos: filteredTodos,
  }
}
