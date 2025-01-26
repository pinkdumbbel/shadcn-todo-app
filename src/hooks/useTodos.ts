import { getTodos } from '@/server'
import { ToDo, TodoSearchParams } from '@/types/api'
import { useEffect, useMemo, useState } from 'react'

export const useTodos = (params: Partial<TodoSearchParams>) => {
  const [data, setData] = useState<ToDo[]>([])
  const todos = useMemo(
    () =>
      data
        .filter((todo) => todo.text.includes(params.text ?? ''))
        .filter((todo) => {
          if (!params.deadline) return true

          const from = params.deadline.from?.getTime() ?? 0
          const to = params.deadline.to?.getTime() ?? 0

          return todo.deadline >= from && todo.deadline <= to
        })
        .filter((todo) =>
          params.done === undefined ? true : todo.done === params.done
        )
        .slice(
          (params.page ?? 0) * (params.size ?? 0),
          (params.page ?? 0) * (params.size ?? 0) + (params.size ?? 0)
        ),
    [data, params]
  )

  const fetchTodos = async () => {
    setData(await getTodos())
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  return {
    todos,
    total: data.length,
  }
}
