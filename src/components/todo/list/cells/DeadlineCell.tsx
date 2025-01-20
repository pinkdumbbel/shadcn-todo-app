import { TableCell } from '@/components/ui/table'
import {
  getDaysUntilDeadline,
  isDeadlineApproaching,
  yyyymmddMs,
} from '@/lib/utils'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Info as InfoIcon } from 'lucide-react'

interface DeadlineCellProps {
  deadline: number
}

export const DeadlineCell = ({ deadline }: DeadlineCellProps) => {
  return isDeadlineApproaching(deadline) ? (
    <DeadlineApproachCell deadline={deadline} />
  ) : (
    <NoDeadlineApproachCell deadline={deadline} />
  )
}

const DeadlineApproachCell = ({ deadline }: DeadlineCellProps) => {
  const untilDay = getDaysUntilDeadline(deadline)

  return (
    <TableCell className="w-[20%] text-[16px] font-medium text-red-700">
      <div className="flex gap-x-[8px] items-center">
        <TooltipProvider delayDuration={50}>
          <Tooltip>
            <TooltipTrigger>
              <InfoIcon width={20} height={20} className=" stroke-red-700" />
            </TooltipTrigger>
            <TooltipContent
              className="bg-black text-white text-[16px]"
              side="bottom"
            >
              <p>
                {untilDay >= 0
                  ? `마감 기한이 ${untilDay}일 남았습니다.`
                  : '마감 기한이 지났습니다.'}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <p>{yyyymmddMs(deadline)}</p>
      </div>
    </TableCell>
  )
}

const NoDeadlineApproachCell = ({ deadline }: DeadlineCellProps) => (
  <TableCell className="w-[20%] text-[16px] font-medium text-gray-700">
    {yyyymmddMs(deadline)}
  </TableCell>
)
