import React from 'react'

import { hamsterCoin } from '@assets/images'

interface ComboCardProps {
  title: string
  value: string
  imgSrc?: string
}

const ComboCard: React.FC<ComboCardProps> = ({ title, value, imgSrc = hamsterCoin }) => {
  return (
    <div className='flex items-center justify-between bg-[#272a2f] rounded-lg pl-3 pr-1 py-1 mt-2'>
      <div className='flex items-center gap-2'>
        <p className='text-sm'>{title}</p>
        <div className='relative flex items-center gap-2'>
          <div className='w-2 h-2 rounded-full bg-gray-300 '></div>
          <div className='w-2 h-2 rounded-full bg-gray-300 '></div>
          <div className='w-2 h-2 rounded-full bg-gray-300 '></div>
        </div>
      </div>

      <div className='flex items-center gap-1 bg-[#826314] border-[#43433b] p-1 rounded-md'>
        <img src={imgSrc} alt='Exchange' className='w-5 h-5 ' />
        <p className='flex'>
          <span className='text-gray-400 text-xs'>{value}</span>
        </p>
      </div>
    </div>
  )
}

export default ComboCard
