import numeral from 'numeral'
import React, { memo } from 'react'

import { hamsterCoin } from '@assets/images'
import { formatProfitPerHour } from '@utils'

import { useStore } from '@stores'
import CoinCard from './CoinCard'

const UserMining: React.FC = () => {
  const { mining } = useStore((state) => state)

  return (
    <>
      <div className='grid grid-cols-3 gap-2'>
        <CoinCard
          title='Coin per tap'
          value={`+${mining?.coins_per_tap || 0}`}
          color='text-[#f3ba2f]'
          imgSrc={hamsterCoin}
        />
        <CoinCard
          title='Coin to level up'
          value={formatProfitPerHour(Number(mining?.coins_to_level_up || 0))}
          color='text-blue-400'
          imgSrc={hamsterCoin}
        />
        <CoinCard
          title='Profit per hour'
          value={formatProfitPerHour(Number(mining?.profit_per_hour || 0))}
          color='text-green-400'
          imgSrc={hamsterCoin}
        />
      </div>

      <div className='flex items-center justify-center'>
        <div className='flex items-center gap-2'>
          <img src={hamsterCoin} alt='Exchange' className='w-16 h-16 mx-auto' />
          <p className='text-3xl font-bold flex'>{numeral(mining?.points || 0).format('0,0')}</p>
        </div>
      </div>
    </>
  )
}

export default memo(UserMining)
