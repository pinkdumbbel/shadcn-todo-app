import { DateRange } from 'react-day-picker'
import { ToDo } from './api'

export type ToDoPayload = Pick<ToDo, 'text' | 'deadline'>

export interface ToDoSearchFilterParams {
  text: string
  deadline: DateRange
  done: boolean
}

export interface ToDoPaginationParams {
  page: number
  size: number
}

export type TodoSearchParams = Partial<
  ToDoSearchFilterParams & ToDoPaginationParams
>
