// src/components/ClickableCharacter.tsx

import { mainCharacter } from '@assets/images'
import React from 'react'

interface ClickableCharacterProps {
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void
}

const ClickableCharacter: React.FC<ClickableCharacterProps> = ({ onClick }) => {
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touchCount = e.touches.length
    console.log({touchCount})
    for (let i = 0; i < touchCount; i++) {
      console.log({e})
      onClick(e.touches[i] as any)
    }
  }
  return (
    <div className='w-80 h-80 p-4 rounded-full circle-outer' onClick={(e)=>{
      console.log("click" , e)
    }} onTouchStart={handleTouchStart}>
      <div className='w-full h-full rounded-full circle-inner'>
        <img src={mainCharacter} alt='Main Character' className='w-full h-full' />
      </div>
    </div>
  )
}

export default ClickableCharacter
