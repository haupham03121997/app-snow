import React from 'react'

interface CoinCardProps {
  title: string
  value: string
  color: string
  imgSrc: string
}

const CoinCard: React.FC<CoinCardProps> = ({ title, value, color, imgSrc }) => (
  <div className='bg-[#272a2f] rounded-lg space-y-2 py-3 w-full relative'>
    <div className='dot'></div>
    <p className={`text-xs text-center mt-1 ${color}`}>{title}</p>
    <div className='flex items-center flex-col justify-center gap-1'>
      <img src={imgSrc} alt={title} className='w-5 h-5' />
      <p className='text-xs text-white'>{value}</p>
    </div>
  </div>
)

export default CoinCard
