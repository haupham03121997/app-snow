import React from 'react'

interface DailyRewardCardProps {
  imageSrc: string
  title: string
  timeLeft: string
}

const DailyRewardCard: React.FC<DailyRewardCardProps> = ({ imageSrc, title, timeLeft }) => {
  return (
    <div className='bg-[#272a2f] rounded-lg px-4 py-2 w-full relative'>
      <div className='dot'></div>
      <img src={imageSrc} alt={title} className='mx-auto w-12 h-12' />
      <p className='text-[10px] text-center text-white mt-1'>{title}</p>
      <p className='text-[10px] font-medium text-center text-gray-400 mt-2'>{timeLeft}</p>
    </div>
  )
}

export default DailyRewardCard
