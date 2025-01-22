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
import { FormEvent, useState } from 'react'
import { useFetchedTodoActionContext } from '@/server/context'

export const AddTodoDialog = () => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="bg-blue-700 hover:bg-blue-700/90"
          ref={(el) => el?.focus()}
        >
          <p className="text-[20px]">Add Todo</p>
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-[800px] ">
        <DialogHeader>
          <DialogTitle className="text-3xl">Add Todo</DialogTitle>
        </DialogHeader>

        <AddTodoForm closeDialog={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}

interface AddTodoFormProps {
  closeDialog: () => void
}

const AddTodoForm = ({ closeDialog }: AddTodoFormProps) => {
  const { addTodo } = useFetchedTodoActionContext()
  const [text, setText] = useState<string>('')
  const [deadline, setDeadline] = useState<Date>()

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!text || !deadline) return

    await addTodo({
      text,
      deadline: deadline.getTime(),
    })
    closeDialog()
  }

  return (
    <form onSubmit={onSubmit} className="space-y-[40px] mt-[40px]">
      <div className="space-y-[24px]">
        <div className="flex gap-x-[20px] items-center">
          <p className="shrink-0 w-[100px]">Todo</p>
          <Input
            value={text}
            placeholder="Enter your todo..."
            className="h-[48px]"
            onChange={(e) => {
              setText(e.target.value)
            }}
          />
        </div>
        <div className="flex gap-x-[20px] items-center">
          <p className="shrink-0 w-[100px]">Deadline</p>
          <div className="w-[280px]">
            <DatePicker date={deadline} placeholder="Enter deadline...">
              <Calendar
                mode="single"
                selected={deadline}
                onSelect={setDeadline}
              />
            </DatePicker>
          </div>
        </div>
      </div>

      <DialogFooter>
        <Button
          type="submit"
          className="bg-blue-700 text-lg hover:bg-blue-700/90"
          size="lg"
        >
          Add
        </Button>
      </DialogFooter>
    </form>
  )
}
