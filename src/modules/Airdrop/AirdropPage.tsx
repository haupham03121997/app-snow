import React, { useState } from 'react'

import { airdropBgrBottom, hamsterCoin } from '@assets/images'
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@components/ui/sheet'
import Checked from '@assets/icons/Checked'

const AlliesPage: React.FC = () => {
  const [tonConnectUI] = useTonConnectUI()
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
            onClick={() => tonConnectUI.openModal()}
          >
            <p className='flex items-center justify-center'>
              <img src={hamsterCoin} alt='airdrop' className='h-5 mx-auto pl-2 pr-5' />
              Connect your TON Wallet
            </p>
          </div>
        ) : (
          userFriendlyAddress && (
            <Sheet>
              <SheetTrigger>
                <div className=' bg-gradient-to-b from-[#749099]  to-[#7dc5db] h-[66px] w-full flex justify-start rounded-2xl'>
                  <p className='flex items-center justify-center'>
                    <img src={hamsterCoin} alt='airdrop' className='h-5 mx-auto pl-2 pr-5' />
                    {shortAddress}
                  </p>
                </div>
              </SheetTrigger>
              <SheetContent
                side={'bottom'}
                className='rounded-t-[38px] border-t-0 bg-[#7dc5db]  top-glow p-0'
                classNameIcon='right-4 top-5 focus:ring-0 '
                aria-describedby='sheet-wallet'
              >
                <div className='bg-[black] h-full w-full rounded-t-[38px] mt-[2px] py-6 px-4'>
                  <SheetHeader className='mt-4 '>
                    <SheetTitle className='flex justify-center items-center gap-3 !text-white'>
                      <p>Wallet</p>
                    </SheetTitle>
                  </SheetHeader>
                  <div className=' py-8 px-6 rounded-3xl relative mt-8'>
                    <SheetHeader className='text-center text-white font-semibold text-base' onClick={handleCopyLink}>
                      <div className=' rounded-2xl  flex w-full justify-center items-center'>
                        <div className='flex-1 p-5 bg-gradient-to-b from-[#749099]  to-[#7dc5db] h-[66px] w-full flex items-center justify-between rounded-2xl'>
                          <SheetTitle className=''>{shortAddress}</SheetTitle>
                          <SheetDescription className='text-green-400 flex items-center justify-center'>
                            <Checked className='w-8 h-8 mx-auto' />
                            Active
                          </SheetDescription>
                        </div>
                      </div>
                    </SheetHeader>
                  </div>
                  <div className='mt-3'>
                    <button className='flex-1  h-[66px] w-full flex justify-center rounded-2xl' onClick={disconnect}>
                      <p className='flex items-center justify-center font-bold text-base text-red-600 leading-[66px]'>
                        Disconnect
                      </p>
                    </button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          )
        )}
      </div>
      <div className=''>
        <img src={airdropBgrBottom} alt='airdrop-bottom' />
      </div>
      {showModal && (
        <div className='fixed inset-0 flex items-center justify-center z-[9999999999]'>
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
