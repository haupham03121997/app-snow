import { Coins } from '@assets/icons'
import { questionCoin } from '@assets/images'
import { SheetTitle, SheetTrigger } from '@components/ui/sheet'
import { TaskItem } from '@interfaces/task.interface'
import { cn } from '@lib/utils'
import numeral from 'numeral'
import React from 'react'

interface TaskItemListProps {
  isShow?: boolean
  task: TaskItem
}
const TaskItemList: React.FC<TaskItemListProps> = ({ task, isShow }) => {
  const [isClicked, setIsClicked] = React.useState(false)

  const handleClick = () => {
    setIsClicked(true)
    setTimeout(() => {
      setIsClicked(false)
    }, 200) // Duration of the scale effect
  }

  const handleMouseDown = () => {
    setIsClicked(true)
  }

  const handleMouseUp = () => {
    setIsClicked(false)
  }
  return (
    <SheetTrigger
      asChild
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className={cn(
        'relative w-full overflow-hidden  rounded-lg transition-transform duration-200 bg-gradient-to-r  p-[0.5px]',
        isClicked ? 'scale-75' : 'transform scale',
        isShow ? 'from-pink-500 via-red-500 to-yellow-500' : 'bg-[#272a2f]'
      )}
    >
      <SheetTitle
        className='h-[80px] leading-4 text-white font- bg-gradient-to-b from-[#676767] to-[#010101] border border-[#676767] rounded-lg p-[10px] flex items-center space-x-4 my-3'
        key={task.id}
      >
        <div className='text-[#F4E493]'>
          <Coins className='w-8 h-8 mx-auto' />
        </div>
        <div className='text-base'>
          <p>{task.name}</p>
          <p className='flex items-center text-[#F4E493]'>
            {' '}
            <img src={questionCoin} alt='binanceLogo' className='h-5 pr-1' /> +{numeral(task.coins).format('0,0')}{' '}
          </p>
        </div>
      </SheetTitle>
    </SheetTrigger>
  )
}
export default TaskItemList
