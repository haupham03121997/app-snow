import { hamsterCoin } from '@assets/images'
import { Task } from '@interfaces/invite.interface'
import { formatProfitPerHour } from '@utils'
import { Gem } from 'lucide-react'
import React from 'react'
import { FriendSkeleton } from '../FriendSkeleton'

interface ListTaskProps {
  data: Task[]
  isLoading: boolean
}

const ListTask: React.FC<ListTaskProps> = ({ data, isLoading }) => {
  return (
    <div className='my-8 space-y-2'>
      {isLoading && <FriendSkeleton keyName='list-task' size={2} />}

      {!isLoading &&
        data.map((item) => {
          return (
            <div key={item.id} className='bg-[#272a2fcb]  rounded-2xl p-5 leading-7 flex items-center space-x-4 px-4'>
              <div>
                <Gem size={42} />
              </div>
              <div className=''>
                <p className='text-xl'>{item.name}</p>
                <p className='flex gap-2 items-center pt-2'>
                  <span className='w-2 h-2 bg-[#7dc5db] rounded-full animate-blink'></span>
                  <img src={hamsterCoin} alt='airdrop' className='h-5' />
                  <span className='text-[#7dc5db] text-sm'>{formatProfitPerHour(Number(item.coins))} </span>
                  <span className='font-normal'>for you and your friend</span>
                </p>
              </div>
            </div>
          )
        })}
    </div>
  )
}

export default ListTask
