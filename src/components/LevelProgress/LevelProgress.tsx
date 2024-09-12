import { Skeleton } from '@components/ui/skeleton'
import { LEVEL_NAMES } from '@constants'
import { useStore } from '@stores'
import React from 'react'
interface LevelProgressProps {
  levelIndex: number
  processValue: number
  levelNames?: string[]
}

const LevelProgress: React.FC<LevelProgressProps> = ({ levelIndex, processValue }) => {
  const currentUser = useStore((state) => state.currentUser)

  return (
    <div className='flex items-center '>
      <div className='w-full'>
        <div className='flex justify-between'>
          {!currentUser && <Skeleton className='w-[150px] h-4' />}
          {currentUser && <p className='text-sm truncate w-[150px]'>{currentUser?.ceo_level?.name}</p>}
          <p className='text-sm w-[40px]'>
            {levelIndex + 1} <span className='text-[#95908a]'>/ {LEVEL_NAMES.length}</span>
          </p>
        </div>
        <div className='flex items-center mt-1 border-2 border-[#43433b] rounded-full'>
          <div className='w-full h-2 bg-[#43433b]/[0.6] rounded-full'>
            <div className='progress-gradient h-2 rounded-full' style={{ width: `${processValue}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LevelProgress
