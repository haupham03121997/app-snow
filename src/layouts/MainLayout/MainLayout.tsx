import { BottomNavigationBar, Header } from '@components'
import React, { memo } from 'react'

interface MainLayoutProps {
  children: React.ReactNode
  isShowHeader?: boolean
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, isShowHeader }) => {
  return (
    <div className='w-full bg-black text-white h-screen overflow-hidden font-bold max-w-xl mx-auto'>
      <div className='flex flex-col h-full overflow-y-auto'>
        {isShowHeader && <Header />}
        {children}
        <BottomNavigationBar />
      </div>
    </div>
  )
}

export default memo(MainLayout)
