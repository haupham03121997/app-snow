import React from 'react'

import { dollarCoin } from '@assets/images'

interface PointsDisplayProps {
  points: string
}

const PointsDisplay: React.FC<PointsDisplayProps> = ({ points }) => {
  return (
    <div className='px-4 py-2 flex items-center space-x-2'>
      <img src={dollarCoin} alt='Dollar Coin' className='w-10 h-10' />
      <p className='text-4xl text-white'>{points.toLocaleString()}</p>
    </div>
  )
}

export default PointsDisplay
