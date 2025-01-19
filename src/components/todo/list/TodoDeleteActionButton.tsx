import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { useTodoActionContext } from '@/server/context'

interface TodoDeleteActionButtonProps {
  id: number
}

export const TodoDeleteActionButton = ({ id }: TodoDeleteActionButtonProps) => {
  const { deleteTodo } = useTodoActionContext()

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="w-[200px] h-[40px] text-left px-[12px] hover:bg-gray-50">
          삭제
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">
            정말 삭제하시겠습니까?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-lg">
            삭제 된 할일은 복구할 수 없습니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 hover:bg-red-500/90"
            onClick={() => deleteTodo(id)}
          >
            삭제
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
