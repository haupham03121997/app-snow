import { Gem } from 'lucide-react'
import React from 'react'

import { hamsterCoin } from '@assets/images'
import { Sheet, SheetContent, SheetTitle } from '@components/ui/sheet'
import { TaskItem } from '@interfaces/task.interface'
import { formatProfitPerHour } from '@utils'
import { TaskContent } from '../TaskContent'

interface TaskItemListProps {
  task: TaskItem
}
const TaskItemList: React.FC<TaskItemListProps> = ({ task }) => {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        key={task.id}
        className='bg-[#272a2fcb]  rounded-2xl p-5 leading-7 flex items-center space-x-4 px-4 mb-5'
      >
        <div>
          <Gem size={42} />
        </div>
        <div className=''>
          <p className='text-lg'>{task.name}</p>
          <p className='flex gap-2 items-center pt-2'>
            <span className='w-2 h-2 bg-[#7dc5db] rounded-full animate-blink'></span>
            <img src={hamsterCoin} alt='airdrop' className='h-5' />
            <span className='text-[#7dc5db] text-sm'>{formatProfitPerHour(Number(task.coins))} </span>
          </p>
        </div>
      </div>

      <Sheet open={isOpen} onOpenChange={(open: boolean) => setIsOpen(open)}>
        <SheetContent
          aria-describedby=''
          onInteractOutside={(e) => e.preventDefault()}
          side={'bottom'}
          className='rounded-t-[38px] border-t-0 bg-[#7dc5db] top-glow p-0 text-white'
          classNameIcon='right-4 top-5 focus:ring-0 '
        >
          <SheetTitle></SheetTitle>
          {isOpen && <TaskContent task={task} isOpen={isOpen} />}
        </SheetContent>
      </Sheet>
    </>
  )
}
export default TaskItemList
