import { BottomNavigationBar, Header } from '@components'
import { cn } from '@lib/utils'
import React, { memo } from 'react'

interface MainLayoutProps {
  children: React.ReactNode
  isShowHeader?: boolean
  disabledScroll?: boolean
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, isShowHeader, disabledScroll }) => {
  return (
    <div className='w-full bg-black text-white h-screen overflow-hidden font-bold max-w-xl mx-auto'>
      <div
        className={cn('flex flex-col h-full overflow-y-auto', {
          'overflow-hidden': disabledScroll
        })}
      >
        {isShowHeader && <Header />}
        {children}
        <BottomNavigationBar />
      </div>
    </div>
  )
}

export default memo(MainLayout)
