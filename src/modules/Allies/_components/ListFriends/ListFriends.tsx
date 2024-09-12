import React from 'react'

import { FriendElement } from '@interfaces/invite.interface'
import { FriendSkeleton } from '../FriendSkeleton'
import FriendItem from './FriendItem'

interface ListFriendsProps {
  data: FriendElement[]
  isLoading: boolean
}

const ListFriends: React.FC<ListFriendsProps> = ({ data, isLoading }) => {
  return (
    <>
      <p className='text-base'>List of your Friends ({data.length})</p>

      <div className='space-y-2 mt-4'>
        {isLoading && <FriendSkeleton keyName='list-friends' size={3} />}

        {!isLoading && data.length === 0 ? (
          <div className='bg-[#272a2fcb]  rounded-2xl p-3 leading-7 flex items-center space-x-4 my-4 h-[76px] justify-center'>
            <p className='items-center'>You haven't invited anyone yet..</p>
          </div>
        ) : (
          data.map((friend) => <FriendItem key={friend.id} friend={friend} />)
        )}
      </div>
    </>
  )
}

export default ListFriends
