import { LevelProgress } from '@components/LevelProgress'
import { UserProfile } from '@components/UserProfile'
import { LEVEL_MIN_POINTS, LEVEL_NAMES } from '@constants'
import { useLevelManagement } from '@hooks'
import { useStore } from '@stores'
import { calculateProgress } from '@utils'
import React from 'react'

const Header: React.FC = () => {
  const { mining } = useStore((state) => state)

  const points = Number(mining?.points || 0)
  const levelIndex = useLevelManagement(points, LEVEL_MIN_POINTS, LEVEL_NAMES)

  const processValue = calculateProgress(points, levelIndex, LEVEL_MIN_POINTS, LEVEL_NAMES)

  return (
    <div className='px-4 z-10 flex justify-between items-center py-2'>
      <UserProfile />
      <LevelProgress levelIndex={levelIndex} processValue={processValue} />
    </div>
  )
}

export default Header
