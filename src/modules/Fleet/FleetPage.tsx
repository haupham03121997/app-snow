import React, { useState } from 'react'

import { UserMining } from '@components'
import { useStore } from '@stores'
import { ClickableCharacter } from './components'

const FleetPage: React.FC = () => {
  const { setPoints, mining } = useStore((state) => state)
  const [clicks, setClicks] = useState<{ id: number; x: number; y: number }[]>([])

  const pointsToAdd = Number(mining?.coins_per_tap || 0)

  const points = Number(mining?.points || 0)

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    card.style.transform = `perspective(1000px) rotateX(${-y / 10}deg) rotateY(${x / 10}deg)`
    setTimeout(() => {
      card.style.transform = ''
    }, 100)
    setPoints(points + pointsToAdd)
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
      <div className='flex-grow mt-8 bg-[#f3ba2f] rounded-t-[48px] relative top-glow z-0'>
        <div className='bg-[#1d2025] h-full w-full rounded-t-[46px] mt-[2px] pt-6 px-4 flex flex-col gap-8'>
          <UserMining />
          <div className='flex justify-center xxs:pb-24 pb-0'>
            <ClickableCharacter onClick={handleCardClick} />
          </div>
        </div>
      </div>

      {clicks.map((click) => (
        <div
          key={click.id}
          className='absolute text-5xl font-bold opacity-0 text-white pointer-events-none'
          style={{
            top: `${click.y - 42}px`,
            left: `${click.x - 28}px`,
            animation: `float 1s ease-out`
          }}
          onAnimationEnd={() => handleAnimationEnd(click.id)}
        >
          {pointsToAdd}
        </div>
      ))}
    </>
  )
}

export default FleetPage
