import { useLottie } from 'lottie-react'
import React, { memo } from 'react'
import coinsData from '../../lotties/coins.json'

import { mainCharacter } from '@assets/images'
import './index.css'

const DURATION = 5000 // 5s

const GlobalLoading: React.FC = () => {
  const [processValue, setProcessValue] = React.useState(0)
  React.useEffect(() => {
    const targetValue = 98
    const increment = (targetValue - processValue) / (DURATION / 100) // increment per 100ms

    const interval = setInterval(() => {
      setProcessValue((prev) => {
        if (prev >= targetValue) {
          clearInterval(interval)
          return targetValue
        }
        return prev + increment
      })
    }, 100)

    return () => clearInterval(interval)
  }, [processValue])
  const options = {
    animationData: coinsData,
    loop: true,
    heigh: 200
  }

  const { View } = useLottie(options)

  return (
    <div className='splash-container'>
      <div className='absolute  top-3/2 -translate-y-1/2'>{View}</div>
      <div className='absolute w-full top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-[9999] flex items-center flex-col'>
        <img src={mainCharacter} className='w-3/5' />
        <div className='w-1/2 h-2 bg-[#43433b]/[0.6] rounded-full mt-8'>
          <div className='progress-gradient h-2 rounded-full' style={{ width: `${processValue}%` }}></div>
        </div>
        <div className='mt-10 text-center text-white '>
          <p className='font-bold  text-base'>Save the date for</p>
          <p className='font-bold text-[18px]'>Snow Man's Listing</p>
          <p className='text-4xl font-extrabold text-[#C79B00] my-4'>December 24th!</p>
          <div>
            <p className='text-sm text-slate-500'>Stay tuned</p>
            <p>More info in official channels</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(GlobalLoading)
