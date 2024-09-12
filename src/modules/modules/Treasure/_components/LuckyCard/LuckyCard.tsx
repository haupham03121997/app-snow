import { hamsterCoin, questionCoin, whalePirate } from '@assets/images'
import { Card } from '@interfaces/combo.interface'

import { cn } from '@lib/utils'
import React from 'react'

interface LuckyCardProps {
  isShow: boolean
  card: Card
}

const LuckyCard: React.FC<LuckyCardProps> = ({ isShow, card }) => {
  const [isClicked, setIsClicked] = React.useState(false)

  const handleClick = () => {
    setIsClicked(true)
    setTimeout(() => {
      setIsClicked(false)
    }, 200) // Duration of the scale effect
  }

  const handleMouseDown = () => {
    setIsClicked(true)
  }

  const handleMouseUp = () => {
    setIsClicked(false)
  }
  return (
    <div
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className={cn(
        'relative w-full overflow-hidden  rounded-lg transition-transform duration-200 bg-gradient-to-r   p-[0.5px]',
        isClicked ? 'scale-75' : 'transform scale',
        isShow ? 'from-pink-500 via-red-500 to-yellow-500' : 'bg-[#272a2f]'
      )}
    >
      <div className='bg-[#272a2f] h-full rounded-lg py-3'>
        <div className='flex items-center justify-center gap-1 w-full h-full'>
          {!isShow ? (
            <img src={hamsterCoin} alt='airdrop' className='w-20 h-20' />
          ) : (
            <div className='flex items-center flex-col px-3 gap-2'>
              <img src={whalePirate} className='w-12 h-12 ' alt='whale' />
              <p className='text-xs w-full truncate'>{card.name}</p>
            </div>
          )}
        </div>

        {!isShow && (
          <>
            <div className='absolute top-0 left-0 w-full h-full bg-[#272a2f96] z-[1]'></div>
            <div className='absolute top-0 left-0 w-full h-full z-[2] flex items-center justify-center'>
              <img src={questionCoin} alt='question' className='w-10 h-10' />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default LuckyCard
