import { UserProfile } from '@components/UserProfile'
import React from 'react'

const Header: React.FC = () => {
  return (
    <div className='px-4 z-10 flex justify-between items-center py-2'>
      <UserProfile />
    </div>
  )
}

export default Header
