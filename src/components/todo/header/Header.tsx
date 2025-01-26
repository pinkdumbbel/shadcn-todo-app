import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { AddTodoDialog } from './AddTodoDialog'
import { Button } from '@/components/ui/button'
import { useTodoRowCheckActionContext, useTodoRowCheckContext } from '@/context'

export const Header = () => (
  <header className="flex justify-between">
    <h1 className="text-3xl font-bold">Todo List</h1>
    <div className="flex gap-x-[8px]">
      <MultiTodoDeleteButton />
      <AddTodoDialog />
    </div>
  </header>
)

const MultiTodoDeleteButton = () => {
  const todoIds = useTodoRowCheckContext()
  const { deleteTodos } = useTodoRowCheckActionContext()

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size="lg"
          className="bg-red-700 hover:bg-red-700/90 disabled:bg-gray-500"
          disabled={!todoIds.length}
        >
          <p className="text-[20px]">Delete Todos</p>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogDescription className="whitespace-break-spaces text-center text-2xl font-bold text-gray-700">
            {`선택한 ${todoIds.length}개의 할일을 삭제 하시겠습니까?\n삭제후 복구할 수 없습니다.`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction onClick={deleteTodos}>삭제</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
