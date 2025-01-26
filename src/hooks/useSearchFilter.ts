import { getSearchFilterFromStorage } from '@/lib/storage'
import { ToDoSearchFilterParams } from '@/types/todo'
import { startTransition, useState } from 'react'
import { DateRange } from 'react-day-picker'

const searchParamsKey = 'searchParams'

export const useSearchFilter = () => {
  const [params, setParams] = useState<Partial<ToDoSearchFilterParams>>(
    getSearchFilterFromStorage()
  )

  const onChangeText = (text: string) => {
    setParams((prevParams) => ({
      ...prevParams,
      text,
    }))

    startTransition(() => {
      localStorage.setItem(searchParamsKey, JSON.stringify({ ...params, text }))
    })
  }

  const onChangeDeadline = (deadline?: DateRange) => {
    setParams((prevParams) => ({
      ...prevParams,
      deadline,
    }))

    startTransition(() => {
      localStorage.setItem(
        searchParamsKey,
        JSON.stringify({ ...params, deadline })
      )
    })
  }

  const onChangeDone = (done: boolean) => {
    setParams((prevParams) => ({
      ...prevParams,
      done,
    }))

    startTransition(() => {
      localStorage.setItem(searchParamsKey, JSON.stringify({ ...params, done }))
    })
  }

  const onReset = () => {
    setParams({})
    startTransition(() => {
      localStorage.setItem(searchParamsKey, '{}')
    })
  }

  const searchFilterHandlers = {
    onChangeText,
    onChangeDeadline,
    onChangeDone,
    onReset,
  }

  return {
    params,
    searchFilterHandlers,
  }
}
