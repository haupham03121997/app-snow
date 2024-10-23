import { ArrowRightLeft, ChevronsRight, Copy } from 'lucide-react'
import { useState } from 'react'

import { hamsterCoin, mainCharacter } from '@assets/images'
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react'
import { formatProfitPerHour, isConnectUIError, isUserRejectAction, transactionComment } from '@utils'

import { useToast } from '@/hooks/use-toast'
import { authApi } from '@apis/auth.api'
import { syncApi } from '@apis/sync.api'
import { walletApi } from '@apis/wallet.api'
import { PointsSheet } from '@components'
import { ToastAction, ToastActionElement } from '@components/ui/toast'
import { Toaster } from '@components/ui/toaster'
import { TON_ADDRESS, TON_AMOUNT } from '@constants/config'
import { toNano } from '@ton/ton'
import { toast as toastHot } from 'react-hot-toast'
import TransactionButton from './TransactionButton'

const POINTS = 100000

export default function CreateTransaction() {
  const { toast } = useToast()
  const [tonConnectUI] = useTonConnectUI()
  const userFriendlyAddress = useTonAddress()
  const [isSending, setIsSending] = useState(false)
  const [isDisplaySheet, setIsDisplaySheet] = useState(false)

  const handleCopyTransaction = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toastHot.success('Transaction hash copied to clipboard', {
        duration: 5000,
        position: 'bottom-center',
        className: 'bg-gradient-to-r from-[#749099] to-[#7dc5db] text-white'
      })
    } catch (err) {
      console.error('Failed to copy address!', err)
    }
  }

  const showToast = (
    title: string,
    description: string,
    variant: 'default' | 'destructive' | null | undefined,
    action: ToastActionElement | undefined = undefined
  ) => {
    toast({
      title,
      description,
      action,
      duration: 3000,
      variant
    })
  }

  const handleError = (error: any) => {
    if (isUserRejectAction(error)) {
      showToast(
        'User reject action',
        'User rejects the action in the wallet. Wallet declined the request',
        'destructive'
      )
    } else if (isConnectUIError(error)) {
      showToast('Connect UI error', 'An error occurred while connecting to the wallet.', 'destructive')
    } else {
      showToast('Error', error?.message, 'destructive')
    }
  }

  const handleSendTON = async () => {
    setIsSending(true)

    try {
      const result = await tonConnectUI.sendTransaction({
        validUntil: Math.floor(Date.now() / 1000) + 120,
        messages: [
          {
            address: TON_ADDRESS,
            amount: toNano(TON_AMOUNT).toString(), // 0.1 TON
            payload: transactionComment('Hello, TON!')
          }
        ]
      })

      const someTxData = result.boc
      await walletApi.saveTransaction({
        wallet_address: userFriendlyAddress,
        amount: TON_AMOUNT,
        transaction_id: someTxData
      })

      await syncApi.postSync({ points: POINTS, energy: 0 })
      await authApi.getMining()
      setIsDisplaySheet(true)

      if (someTxData) {
        showToast(
          'Transaction sent',
          'Transaction has been sent successfully',
          'default',
          <ToastAction
            className='px-4 py-5 border border-green-500'
            altText='Copy transaction'
            onClick={() => handleCopyTransaction(someTxData)}
          >
            <Copy size={14} />
          </ToastAction>
        )
      }
    } catch (error: any) {
      handleError(error)
    } finally {
      setIsSending(false)
    }
  }

  return (
    <>
      <div className='pb-20 mt-8'>
        <div className='relative z-20 my-8 pb-10'>
          <div className='grid grid-cols-1'>
            <div className='bg-[#272a2f] w-full rounded-3xl  flex items-center flex-col relative'>
              <div className='absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-black rounded-full p-2'>
                <div className='bg-[#272a2f] rounded-full w-full h-full flex items-center justify-center'>
                  <ArrowRightLeft />
                </div>
              </div>
              <div className='w-full flex items-center justify-between mt-6 p-5 border border-t-0  border-l-0 border-r-0 border-b-gray-700 relative'>
                <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2flex items-center justify-center'>
                  <ChevronsRight size={15} />
                </div>
                <div className='flex items-center gap-2 '>
                  <div className='w-16 h-16 bg-black  rounded-full flex items-center justify-center'>
                    <img src='https://ton.app/favicon.png' className='w-8 h-8 object-cover' />
                  </div>
                  <div>
                    <p className='font-medium text-xs text-gray-400'>TON</p>
                    <span className='text-inherit text-lg  font-bold text-gradient font-jetbrains'>{TON_AMOUNT}</span>
                  </div>
                </div>

                <div className='flex items-center justify-end gap-2 '>
                  <div className='w-16 h-16 bg-black  rounded-full flex items-center justify-center'>
                    <img src={mainCharacter} className='w-8 h-8 object-cover' />
                  </div>
                  <div>
                    <p className='font-medium text-xs text-gray-400'>Coins</p>
                    <span className='text-inherit text-lg font-jetbrains font-bold text-gradient'>
                      {formatProfitPerHour(POINTS, true)}{' '}
                    </span>
                  </div>
                </div>
              </div>
              <TransactionButton isSending={isSending} onClick={handleSendTON} amount={POINTS} />
            </div>
          </div>
        </div>
      </div>

      <PointsSheet
        open={isDisplaySheet}
        onClose={() => setIsDisplaySheet(false)}
        title={`${formatProfitPerHour(POINTS)}`}
        description={
          <div>
            You received <span className='text-gradient font-extrabold'>{formatProfitPerHour(POINTS)}</span> points.
          </div>
        }
        mainImage={hamsterCoin}
        mainImageAlt='coin'
        mainImageClass='w-14 h-14'
        content={
          <div className='absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-black rounded-full p-2'>
            <div className='bg-[#272a2f] rounded-full w-full h-full flex items-center justify-center'>
              <img src={mainCharacter} alt='Main Character' className='w-[80%] h-[80%]' />
            </div>
          </div>
        }
        buttonText='Receive points'
        buttonAction={() => setIsDisplaySheet(false)}
      />
      <Toaster />
    </>
  )
}
