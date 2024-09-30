import { initUtils } from '@telegram-apps/sdk'
import { Copy } from 'lucide-react'
import React, { useState } from 'react'

import { hamsterCoin } from '@assets/images'
import { useGetInviteFriends } from '@hooks'

import { TELEGRAM_BOT_URL } from '@constants/config'
import { useStore } from '@stores'
import { ListFriends } from './_components/ListFriends'
import { ListTask } from './_components/ListTask'

const AlliesPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false)

  const queryResult = useGetInviteFriends()
  const {currentUser} = useStore((state) => state)

  const friendsData = queryResult.data?.friends || []
  const tasksData = queryResult.data?.tasks || []
  const isLoading = queryResult.isLoading

  const handleCopyLink = async () => {
    try {
      const inviteLink = `${TELEGRAM_BOT_URL}?start=${currentUser?.id}`
      await navigator.clipboard.writeText(inviteLink)
      setShowModal(true)
      setTimeout(() => {
        setShowModal(false)
      }, 500) // Ẩn modal sau 2 giây
    } catch (err) {
      console.error('Lỗi khi sao chép!', err)
    }
  }

  // https://t.me/hamtaro_coins_bot?startapp=AARkfNyqyBU=
  const handleInviteFriend = () => {
    const utils = initUtils()
    //     const referralCode = queryResult.data?.referral_code
    //     const inviteLink = `${TELEGRAM_BOT_URL}?startapp=${referralCode}`
    //     const shareText = `Aye, matey! Join me crew ☝️, become the Pirate King of the Crypto Seas, and claim yer treasure! 👇
    // 💰 +1,000 coins per hour as a first-time gift 🎁
    // 🔥 +5,000 coins per hour if you have Telegram Premium ⭐`
    //     const fullUrl = `https://t.me/share/url?url=${encodeURIComponent(inviteLink)}&text=${encodeURIComponent(shareText)}`
    const url = `${TELEGRAM_BOT_URL}?start=${Buffer.from('6387347744').toString('base64')}`
    const shareText = `Aye, matey! Join me crew ☝️, become the Pirate King of the Crypto Seas, and claim yer treasure! 👇
💰 +1,000 coins per hour as a first-time gift 🎁
🔥 +5,000 coins per hour if you have Telegram Premium ⭐`
    const linkRedirect = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(shareText)}`
    utils.openTelegramLink(linkRedirect)
  }

  return (
    <div className='w-full bg-black text-white h-screen font-bold flex flex-col max-w-xl px-4'>
      <div className='text-center mx-8 mt-8 space-y-4'>
        <h1 className='text-4xl'>Invite Friends!</h1>
        <p className='text-gray-400 text-sm'>You and your friend will receive bonuses</p>
      </div>
      <ListTask data={tasksData} isLoading={isLoading} />
      <ListFriends data={friendsData} isLoading={isLoading} />

      <div className='mt-auto pb-4 rounded-2xl  p-y[10px] leading-7 mb-20 flex w-full justify-center items-center'>
        <div
          className='flex-1 bg-gradient-to-b from-[#D3BA40]  to-[#F9A208] h-[66px] w-full flex justify-center rounded-2xl'
          onClick={handleInviteFriend}
        >
          <p className='flex items-center justify-center'>
            invite a friend <img src={hamsterCoin} alt='airdrop' className='h-5 mx-auto pl-2' />
          </p>
        </div>
        <div
          className='bg-gradient-to-b from-[#D3BA40] to-[#F9A208]  w-[66px] h-[66px] ml-2 rounded-2xl flex items-center justify-center cursor-pointer'
          onClick={!isLoading ? handleCopyLink : undefined}
        >
          <Copy size={28} />
        </div>
      </div>

      {showModal && (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
          <div className='bg-black bg-opacity-50 absolute inset-0'></div>
          <div className='bg-white p-6 rounded-lg shadow-lg z-10'>
            <p className='text-black'>Đã sao chép vào clipboard!</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default AlliesPage
