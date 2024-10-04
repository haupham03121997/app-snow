import React from 'react'

import { CountDown, UserMining } from '@components'

import { ComboSection } from './_components/ComboSection'
import { ListCard } from './_components/ListCard'

const TreasurePage: React.FC = () => {
  return (
    <>
      <div className='flex-grow mt-8 bg-[#7dc5db] rounded-t-[48px] relative top-glow z-0'>
        <div className='bg-[#1d2025] h-full w-full rounded-t-[46px] mt-[2px] pt-6 px-4 flex flex-col gap-8'>
          <UserMining />

          <div className='space-y-4'>
            <div className='text-end'>
              <CountDown className='text-gray-400 text-lg' />
            </div>
            <ComboSection />
            <ListCard />
          </div>
        </div>
      </div>
    </>
  )
}

export default TreasurePage
