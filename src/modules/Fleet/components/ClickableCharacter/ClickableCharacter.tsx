// src/components/ClickableCharacter.tsx

import { mainCharacter } from '@assets/images'
import React from 'react'

interface ClickableCharacterProps {
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void
}

const ClickableCharacter: React.FC<ClickableCharacterProps> = ({ onClick }) => {
  return (
    <div className='w-80 h-80 p-4 rounded-full circle-outer' onClick={onClick}>
      <div className='w-full h-full rounded-full circle-inner'>
        <img src={mainCharacter} alt='Main Character' className='w-full h-full' />
      </div>
    </div>
  )
}

export default ClickableCharacter
