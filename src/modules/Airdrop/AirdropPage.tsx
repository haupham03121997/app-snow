import React, { useState } from 'react'

import { Coins } from '@assets/icons'
import { binanceLogo, hamsterCoin } from '@assets/images'

const AlliesPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false)

  const textToCopy = 'Đây là văn bản cần sao chép'

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy)
      setShowModal(true)
      setTimeout(() => {
        setShowModal(false)
      }, 500) // Ẩn modal sau 2 giây
    } catch (err) {
      console.error('Lỗi khi sao chép!', err)
    }
  }
  return (
    <div className='w-full bg-black text-white h-screen font-bold flex flex-col max-w-xl bg-[#1d2025] px-4'>
      <div className='text-center mx-8 mt-8 leading-[4]'>
        <h1 className='text-4xl'>Invite Friends!</h1>
        <p>You and your friend will receive bonuses</p>
      </div>
      <div className='bg-gradient-to-b from-[#676767] to-[#010101] border border-[#676767] rounded-lg p-[10px] leading-7 flex items-center space-x-4'>
        <div className='text-[#F4E493]'>
          <Coins className='w-8 h-8 mx-auto' />
        </div>
        <div className=''>
          <p>Invite a friend</p>
          <p className='flex items-center text-[#F4E493]'>
            {' '}
            <img src={hamsterCoin} alt='airdrop' className='h-5 mx-auto pr-1' /> +1,000 / Hour{' '}
          </p>
        </div>
      </div>
      <div className='bg-gradient-to-b from-[#676767] to-[#010101] border border-[#676767] rounded-lg p-[10px] leading-7 flex items-center space-x-4 my-4'>
        <div className='text-[#F4E493]'>
          <Coins className='w-8 h-8 mx-auto' />
        </div>
        <div className=''>
          <p>Invite a friend with Telegram premium</p>
          <p className='flex items-center text-[#F4E493]'>
            {' '}
            <img src={binanceLogo} alt='binanceLogo' className='h-5 pr-1' /> +5,000 / Hour{' '}
          </p>
        </div>
      </div>
      <p>List of your Friends</p>

      <div className='bg-gradient-to-b from-[#676767] to-[#010101] border border-[#676767] rounded-lg p-[10px] leading-7 flex items-center space-x-4 my-4 h-[76px] justify-center'>
        <p className='items-center'>You haven't invited anyone yet..</p>
      </div>

      <div className='mt-auto  rounded-lg p-[10px] leading-7 mb-20 flex w-full justify-center items-center'>
        <div className='bg-gradient-to-b from-[#D3BA40] to-[#C79B00] to-[#F9A208] h-[66px] w-full flex justify-center rounded-lg'>
          <p className='flex items-center justify-center'>
            invite a friend <img src={hamsterCoin} alt='airdrop' className='h-5 mx-auto pl-2' />
          </p>
        </div>
        <div
          className='bg-gradient-to-b from-[#D3BA40] to-[#C79B00] to-[#F9A208] h-[66px] ml-2 rounded-lg'
          onClick={handleCopy}
        >
          <Coins className='w-16 h-16 mx-auto p-4' />
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
