import React, { useState } from 'react'

import { Coins } from '@assets/icons'
import { airdropBgrBottom, binanceLogo, hamsterCoin } from '@assets/images'
import { TonConnectButton, useTonAddress, useTonConnectUI } from '@tonconnect/ui-react'
import { Copy } from 'lucide-react'

const AlliesPage: React.FC = () => {
  const [tonConnectUI, setOptions] = useTonConnectUI()
  const [showModal, setShowModal] = useState(false)

  const disconnect = async () => {
    await tonConnectUI.disconnect()
  }

  const userFriendlyAddress = useTonAddress()
  const rawAddress = useTonAddress(false)
  const shortAddress = userFriendlyAddress.slice(0, 6) + '...' + userFriendlyAddress.slice(-4)
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(userFriendlyAddress)
      setShowModal(true)
      setTimeout(() => {
        setShowModal(false)
      }, 500) // Ẩn modal sau 2 giây
    } catch (err) {
      console.error('Lỗi khi sao chép!', err)
    }
  }
  return (
    <div className='text-white font-bold flex flex-col max-w-xl bg-[#1d2025] px-4 h-full overflow-y-auto'>
      <div className='h-full flex flex-col justify-center'>
        <div className='px-4 mt-4 flex justify-center'>
          <div className='w-80 h-80 p-4 rounded-full circle-outer relative'>
            <div className='w-full h-full rounded-full circle-inner flex items-center'>
              <img src={hamsterCoin} alt='Main Character' />
            </div>
          </div>
        </div>
        <p className='text-center py-5'>
          Listing is on it's way. Tasks will appear below. Complete them to participate in the Airdrop
        </p>
        <p className='pb-3'>Task list:</p>
        {!rawAddress ? (
          <div
            className=' bg-gradient-to-b from-[#749099]  to-[#7dc5db] h-[66px] w-full flex justify-start rounded-2xl'
            // onClick={handleInviteFriend}
            onClick={() => tonConnectUI.openModal()}
          >
            <p className='flex items-center justify-center'>
              <img src={hamsterCoin} alt='airdrop' className='h-5 mx-auto pl-2 pr-5' />
              Connect your TON Wallet
            </p>
          </div>
        ) : (
          userFriendlyAddress && (
            <div className=' rounded-2xl  flex w-full justify-center items-center'>
              <div className='flex-1 bg-gradient-to-b from-[#749099]  to-[#7dc5db] h-[66px] w-full flex justify-center rounded-2xl'>
                <p className='flex items-center justify-center' onClick={disconnect}>
                  {shortAddress}
                </p>
              </div>
              <div
                className='bg-gradient-to-b from-[#749099] to-[#7dc5db]  w-[66px] h-[66px] ml-2 rounded-2xl flex items-center justify-center cursor-pointer'
                onClick={handleCopyLink}
              >
                <Copy size={28} />
              </div>
            </div>
          )
        )}
      </div>
      <div className=''>
        <img src={airdropBgrBottom} alt='airdrop-bottom' />
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
