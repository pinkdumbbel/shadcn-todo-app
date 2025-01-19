import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { DatePicker } from '../common'
import { Calendar } from '@/components/ui/calendar'
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react'
import { useTodoActionContext } from '@/server/context'
import { ToDo } from '@/types/api'
import { getTodoById } from '@/server'
import { Checkbox } from '@/components/ui/checkbox'

interface TodoUpdateDialogProps {
  id: number
}

export const TodoUpdateDialog = ({ id }: TodoUpdateDialogProps) => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="w-[200px] h-[40px] text-left px-[12px] hover:bg-gray-50">
          수정
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-[800px] ">
        <DialogHeader>
          <DialogTitle className="text-3xl">Edit Todo</DialogTitle>
        </DialogHeader>

        <UpdateTodoForm id={id} closeDialog={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}

interface UpdateTodoFormProps {
  id: number
  closeDialog: () => void
}

const UpdateTodoForm = ({ id, closeDialog }: UpdateTodoFormProps) => {
  const { updateTodo } = useTodoActionContext()

  const [todo, setTodo] = useState<ToDo | null>(null)

  const [payload, setPayload] = useState<{
    text: string | null
    deadline?: Date
    done?: boolean
  }>({
    text: null,
  })

  const onChangeText = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setPayload((prev) => ({
      ...prev,
      text: value,
    }))
  }

  const onChangeDeadline = (deadline?: Date) => {
    setPayload((prev) => ({
      ...prev,
      deadline,
    }))
  }

  const onChangeDone = () => {
    setPayload((prev) => ({
      ...prev,
      done: !prev.done,
    }))
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!payload.text || !payload.deadline) return

    const updatedTodo = await updateTodo({
      id,
      deadline: payload.deadline.getTime(),
      text: payload.text,
      done: !!payload.done,
    })

    setTodo(updatedTodo)
    closeDialog()
  }

  const fetchTodo = useCallback(async () => {
    setTodo(await getTodoById(id))
  }, [id])

  useEffect(() => {
    fetchTodo()
  }, [fetchTodo])

  useEffect(() => {
    if (!todo) return

    setPayload({
      text: todo.text,
      deadline: new Date(todo.deadline),
      done: todo.done,
    })
  }, [todo])

  return (
    <form onSubmit={onSubmit} className="space-y-[40px] mt-[40px]">
      <div className="space-y-[24px]">
        <div className="flex gap-x-[20px] items-center">
          <p className="shrink-0 w-[100px]">Todo</p>
          <Input
            value={payload.text === null ? todo?.text : payload?.text}
            onChange={onChangeText}
            placeholder="Enter your todo..."
            className="h-[48px]"
          />
        </div>
        <div className="flex gap-x-[20px] items-center">
          <p className="shrink-0 w-[100px]">Deadline</p>
          <div className="w-[280px]">
            <DatePicker date={payload.deadline} placeholder="Enter deadline...">
              <Calendar
                mode="single"
                selected={payload.deadline}
                onSelect={onChangeDeadline}
              />
            </DatePicker>
          </div>
        </div>
        <div className="flex gap-x-[20px] items-center">
          <p className="shrink-0 w-[100px]">Done</p>
          <Checkbox checked={payload.done} onClick={onChangeDone} />
        </div>
      </div>

      <DialogFooter>
        <Button
          type="submit"
          className="bg-blue-700 text-lg hover:bg-blue-700/90"
          size="lg"
        >
          Edit
        </Button>
      </DialogFooter>
    </form>
  )
}
