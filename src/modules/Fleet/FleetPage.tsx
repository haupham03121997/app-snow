import React, { useState } from 'react'

import { snowflake } from '@assets/images'
import coinsData from '@lotties/diamond.json'
import { useStore } from '@stores'
import { ClickableCharacter } from './components'

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
  const [clicks, setClicks] = useState<{ id: number; x: number; y: number }[]>([])

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    card.style.transform = `perspective(1000px) rotateX(${-y / 10}deg) rotateY(${x / 10}deg)`
    // add more snowflakes

    setTimeout(() => {
      card.style.transform = ''
    }, 100)

    setClicks((prev) => {
      const id = Date.now() * Math.floor(Math.random() * (10000 - 1 + 1) + 1) // random id
      return [...prev, { id, x: e.clientX, y: e.clientY }]
    })
  }

  const handleAnimationEnd = (id: number) => {
    setClicks((prevClicks) => prevClicks.filter((click) => click.id !== id))
  }

  return (
    <>
      {/* <div className='flex-grow mt-8 bg-[#7dc5db] rounded-t-[48px] relative top-glow z-0'>
        <div className='bg-[#1d2025] h-full w-full rounded-t-[46px] mt-[2px] pt-6 px-4 flex flex-col gap-8'>
          <UserMining />
          <div className='flex justify-center xxs:pb-24 pb-0'>
            <ClickableCharacter onClick={handleCardClick} />
          </div>
        </div>
      </div> */}

      <div className='flex-grow mt-20 bg-[#7dc5db] rounded-t-[48px] relative top-glow z-0 '>
        <div className=' bg-[#030303] w-24 h-24 border border-[#7dc5db] rounded-full flex items-center justify-center absolute right-1/2 translate-x-1/2 top-[-48px] z-[99]'>
          {View}
        </div>
        <div className='bg-[#1d2025] h-full w-full rounded-t-[46px] mt-[2px] pt-16  flex flex-col gap-8'>
          <div className='px-4 flex flex-col gap-6 justify-center items-center xxs:pb-24 pb-0 h-full -mt-6'>
            <div className='h-[150px] w-full space-y-4 p-5 rounded-2xl relative'>
              <p className='text-center'>Your coins </p>
              <p className='text-4xl font-extrabold text-center font-jetbrains text-gradient'>
                {numeral(points).format('0,0')}
              </p>
            </div>

            <ClickableCharacter onClick={handleCardClick} />
          </div>
        </div>
      </div>
      {clicks.map((click) => (
        <div key={click.id} onAnimationEnd={() => handleAnimationEnd(click.id)}>
          <div
            className='absolute text-5xl font-bold opacity-0 text-white pointer-events-none'
            style={{
              top: `${click.y}px`,
              left: `${click.x}px`,
              animation: `snowflake 2s ease-out`
            }}
          >
            <img src={snowflake} alt='Snow flake' className='w-[50%] h-[50%]' />
          </div>
          <div
            className='absolute text-5xl font-bold opacity-0 text-white pointer-events-none'
            style={{
              top: `${click.y + 50}px`,
              left: `${click.x + 50}px`,
              animation: `snowflake 2s ease-out`
            }}
          >
            <img src={snowflake} alt='Snow flake' className='w-[50%] h-[50%]' />
          </div>
          <div
            className='absolute text-5xl font-bold opacity-0 text-white pointer-events-none'
            style={{
              top: `${click.y - 10}px`,
              left: `${click.x - 40}px`,
              animation: `snowflake 2s ease-out`
            }}
          >
            <img src={snowflake} alt='Snow flake' className='w-[50%] h-[50%]' />
          </div>
        </div>
      ))}
    </>
  )
}

export default FleetPage
