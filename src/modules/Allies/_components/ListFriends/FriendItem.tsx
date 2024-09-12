import { Handshake } from 'lucide-react'
import React from 'react'

import { hamsterCoin } from '@assets/images'
import { FriendElement } from '@interfaces/invite.interface'
import { formatProfitPerHour } from '@utils'

interface FriendItemProps {
  friend: FriendElement
}

const FriendItem: React.FC<FriendItemProps> = ({ friend }) => (
  <div className='bg-[#272a2fcb] rounded-2xl p-5 leading-7 flex h-[76px] justify-between items-center'>
    <div className='flex space-x-4 items-center'>
      <Handshake size={32} />
      <div>
        <p className='text-base'>{friend.friend.telegram_firstname}</p>
        <p className='flex gap-1 items-center pt-2'>
          <img src={hamsterCoin} alt='airdrop' className='h-3' />
          <span className='text-[#f3ba2f] text-xs'>{formatProfitPerHour(Number(friend.friend.profit_per_hour))} </span>
        </p>
      </div>
    </div>
    <div className='flex items-center gap-2'>
      <img src={hamsterCoin} alt='airdrop' className='h-6' />
      <p className='text-[#f3ba2f]'>{formatProfitPerHour(Number(friend.friend.points))}</p>
    </div>
  </div>
)

export default FriendItem
