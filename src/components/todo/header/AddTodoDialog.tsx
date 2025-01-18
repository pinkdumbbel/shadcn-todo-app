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

export const AddTodoDialog = () => {
  return (
    <Dialog>
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

        <form
          onSubmit={(e) => {
            e.preventDefault()
            console.log('submit')
          }}
          className="space-y-[40px] mt-[40px]"
        >
          <div className="space-y-[24px]">
            <div className="flex gap-x-[20px] items-center">
              <p className="shrink-0 w-[100px]">Todo</p>
              <Input placeholder="Enter your todo..." className="h-[48px]" />
            </div>
            <div className="flex gap-x-[20px] items-center">
              <p className="shrink-0 w-[100px]">Deadline</p>
              <div className="w-[280px]">
                <DatePicker placeholder="Enter deadline...">
                  <Calendar mode="single" />
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
      </DialogContent>
    </Dialog>
  )
}
