import { useMutation } from '@tanstack/react-query'
import { CircleCheck } from 'lucide-react'
import numeral from 'numeral'
import React from 'react'

import { taskApi } from '@apis/task.api'
import { hamsterCoin } from '@assets/images'
import { ScheduleItem } from '@interfaces/schedule.interface'
import { cn } from '@lib/utils'

interface DayCheckInProps {
  day: ScheduleItem
}

const DayCheckIn: React.FC<DayCheckInProps> = ({ day }) => {
  const [isClicked, setIsClicked] = React.useState(false)
  const [isChecked, setIsChecked] = React.useState(false)

  const { mutateAsync } = useMutation({
    mutationFn: () => taskApi.postCheckIn()
  })

  const postStartTask = async () => {
    try {
      mutateAsync()
    } catch (error) {}
  }

  const handleClick = (item: ScheduleItem) => {
    setIsClicked(true)
    setTimeout(() => {
      setIsClicked(false)
    }, 200) // Duration of the scale effect
    if (!item.checked && !isChecked && item.today) {
      postStartTask()
      setIsChecked(true)
    }
  }

  const handleMouseDown = () => {
    setIsClicked(true)
  }

  const handleMouseUp = () => {
    setIsClicked(false)
  }

  return (
    <div
      onClick={() => handleClick(day)}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className={cn(
        'relative w-full overflow-hidden  rounded-lg transition-transform duration-200 bg-gradient-to-r  p-[0.5px]',
        isClicked && day.today && !day.checked && !isChecked ? 'scale-75' : 'transform scale'
      )}
    >
      <div
        className={cn(
          'grid justify-center items-center rounded-lg px-3 py-1',
          day.today || day.checked ? 'bg-gradient-to-b from-[#00334E] to-[#001F33]' : 'bg-gray-500'
        )}
      >
        <p className='text-center'>Day {day.day_id}</p>
        <div className='flex justify-center'>
          {day.checked || isChecked ? (
            <CircleCheck
              className='bg-[#2ECC71] rounded-full w-8 h-8 mx-auto'
              style={{
                boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
              }}
            />
          ) : (
            <img src={hamsterCoin} alt='Airdrop' className='w-8 h-8 mx-auto' />
          )}
        </div>
        <p className='text-center'>{numeral(day.rewards).format('0a')}</p>
      </div>
    </div>
  )
}
export default DayCheckIn
