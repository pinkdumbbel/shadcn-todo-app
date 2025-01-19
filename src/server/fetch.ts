import { APIResponse, ToDo } from '@/types/api'

const endpoint = '/api/todos'

export const getTodos = async (): Promise<ToDo[]> => {
  const response = await fetch(endpoint)
  const { data = [] }: APIResponse<ToDo[]> = await response.json()
  return data
}

export const getTodoById = async (id: number): Promise<ToDo> => {
  const response = await fetch(`${endpoint}/${id}`)
  return response.json()
}

export const createTodo = async (todo: ToDo): Promise<ToDo> => {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  })
  return response.json()
}

export const updateTodo = async ({ id, ...payload }: ToDo): Promise<ToDo> => {
  const response = await fetch(`${endpoint}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  return response.json()
}

export const deleteTodo = async (id: number): Promise<void> => {
  await fetch(`${endpoint}/${id}`, {
    method: 'DELETE',
  })
}
