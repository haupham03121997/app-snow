import React from 'react'

import { hamsterCoin } from '@assets/images'
import { Sheet, SheetContent } from '@components/ui/sheet'
import useGetScheduleTask from '@hooks/queries/useGetScheduleTask'
import { ScheduleItem } from '@interfaces/schedule.interface'
import { TaskItem } from '@interfaces/task.interface'
import { DayCheckIn } from '../DayCheckIn'
import { formatProfitPerHour } from '@utils'
import { Gem } from 'lucide-react'

const DailyTask: React.FC = ({}) => {
  const { data: dataSchedule } = useGetScheduleTask()
  const [isOpen, setIsOpen] = React.useState(false)

  const task: TaskItem = {
    id: Math.floor(Math.random() * 100).toString(),
    name: 'Daily check-in',
    coins: '1000000',
    social_type_id: 2,
    social_info: '@cristiano',
    started: false,
    claimed: false
  }

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
          onInteractOutside={(e) => e.preventDefault()}
          side={'bottom'}
          className='rounded-t-[38px] border-t-0 bg-[#7dc5db] top-glow p-0 text-white'
          classNameIcon='right-4 top-5 focus:ring-0 '
        >
          <div className='bg-[black] h-full w-full rounded-t-[38px] mt-[2px] py-6 px-4 grid justify-center items-center'>
            <div className='flex justify-center'>
              <img src={hamsterCoin} alt='binanceLogo' className='h-16 w-16' />
            </div>
            <p className='text-center text-lg font-semibold'>Daily Rewards</p>
            <p className='text-center text-base font-medium'>Join everyday and claim your reward!</p>
            <div className='grid grid-cols-4 gap-4 justify-center'>
              {dataSchedule?.data.map((day: ScheduleItem) => <DayCheckIn key={day.day_id} day={day} />)}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}

export default DailyTask
