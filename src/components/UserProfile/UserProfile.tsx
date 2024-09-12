import { Hamster } from '@assets/icons'
import { Skeleton } from '@components/ui/skeleton'
import { useStore } from '@stores'
import React, { memo } from 'react'

const UserProfile: React.FC = () => {
  const currentUser = useStore((state) => state.currentUser)

  return (
    <div className='flex items-center space-x-2 pt-4'>
      <div className='p-1 rounded-lg bg-[#1d2025]'>
        <Hamster size={24} className='text-[#d4d4d4]' />
      </div>
      <div>
        {!currentUser && <Skeleton className='h-3 w-[40px]' />}
        {currentUser && (
          <p className='text-sm'>{`${currentUser?.telegram_firstname || ''} ${currentUser?.telegram_lastname || ''}`}</p>
        )}
      </div>
    </div>
  )
}

export default memo(UserProfile)
