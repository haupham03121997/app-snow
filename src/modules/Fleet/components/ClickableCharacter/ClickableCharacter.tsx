// src/components/ClickableCharacter.tsx

import { snowManTap } from '@assets/images'
import React from 'react'

interface ClickableCharacterProps {
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void
}

const ClickableCharacter: React.FC<ClickableCharacterProps> = ({ onClick }) => {
  // const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
  //   const touchCount = e.touches.length
  //   console.log({touchCount})
  //   for (let i = 0; i < touchCount; i++) {
  //     console.log("card touched", e.touches[i])

  //   }
  // }

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const count = e.touches.length

    console.log({ count })
  }

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log('card touched', e)
  }

  return (
    <div
      className='w-80 h-80 p-4 rounded-full circle-outer'
      onClick={onClick}
      onTouchStart={handleTouchStart}
      onMouseUp={handleMouseUp}
    >
      <div className='w-full h-full rounded-full circle-inner'>
        <img src={snowManTap} alt='Main Character' className='w-[90%] h-[90%] rounded-full' />
      </div>
    </div>
  )
}

export default ClickableCharacter
