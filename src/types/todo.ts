import { ToDo } from './api'

export type ToDoPayload = Pick<ToDo, 'text' | 'deadline'>
