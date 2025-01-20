import { clsx, type ClassValue } from 'clsx'
import { DateRange } from 'react-day-picker'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const yyyymmdd = (date?: Date): string => {
  if (!date) return ''

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export const yyyymmddRange = (date?: DateRange): string => {
  if (!date) return ''

  const from = yyyymmdd(date.from)
  const to = yyyymmdd(date.to)

  return `${from} ~ ${to}`
}

export const yyyymmddMs = (date: number) => yyyymmdd(new Date(date))

export const getDaysUntilDeadline = (deadline: number): number => {
  const now = new Date()
  now.setHours(0, 0, 0, 0)

  const diffTime = deadline - now.getTime()
  return Math.floor(diffTime / (1000 * 60 * 60 * 24))
}

export const isDeadlineApproaching = (deadline: number): boolean =>
  getDaysUntilDeadline(deadline) <= 3
