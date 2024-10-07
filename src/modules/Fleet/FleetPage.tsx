import React from 'react'

import { useStore } from '@stores'
import { ClickableCharacter } from './components'

import coinsData from '@lotties/diamond.json'
import { useLottie } from 'lottie-react'
import numeral from 'numeral'

const FleetPage: React.FC = () => {
  const { mining } = useStore((state) => state)

  const options = {
    animationData: coinsData,
    loop: true,
    heigh: 20,
    style: {
      width: '64px',
      height: '100%'
    }
  }

  const { View } = useLottie(options)

  const points = Number(mining?.points || 0)

  // const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
  //   const card = e.currentTarget
  //   const rect = card.getBoundingClientRect()
  //   const x = e.clientX - rect.left - rect.width / 2
  //   const y = e.clientY - rect.top - rect.height / 2
  //   card.style.transform = `perspective(1000px) rotateX(${-y / 10}deg) rotateY(${x / 10}deg)`
  //   setTimeout(() => {
  //     card.style.transform = ''
  //   }, 100)
  //   setPoints(points + pointsToAdd)
  //   setClicks((prev) => {
  //     const id = Date.now() * Math.floor(Math.random() * (10000 - 1 + 1) + 1) // random id
  //     return [...prev, { id, x: e.clientX, y: e.clientY }]
  //   })
  // }

  return (
    <>
      <div className=' bg-[#030303] w-24 h-24 border border-[#7dc5db] rounded-full flex items-center justify-center absolute right-1/2 translate-x-1/2 top-24 z-[99]'>
        {View}
      </div>
      <div className='flex-grow mt-20 bg-[#7dc5db] rounded-t-[48px] relative top-glow z-0 '>
        <div className='bg-[#1d2025] h-full w-full rounded-t-[46px] mt-[2px] pt-6  flex flex-col gap-8'>
          <div className='px-4 flex flex-col justify-center items-center xxs:pb-24 pb-0 h-full -mt-6'>
            <div className='h-[150px] w-full space-y-4 p-5 rounded-2xl relative'>
              <p className='text-center'>Your coins </p>
              <p className='text-6xl text-center font-jetbrains text-gradient'>{numeral(points).format('0,0')}</p>
            </div>

            <ClickableCharacter />
          </div>
        </div>
      </div>
    </>
  )
}

export default FleetPage
