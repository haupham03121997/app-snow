import { CheckCheck } from 'lucide-react'
import React from 'react'

import { formatProfitPerHour } from '@utils'

interface TransactionButtonProps {
  isSending: boolean
  isSuccess?: boolean
  onClick: () => void
  amount: number
}

const TransactionButton: React.FC<TransactionButtonProps> = ({ isSending, isSuccess, amount, onClick }) => (
  <div className='flex items-center justify-between w-full p-6 '>
    <p>
      <span className='text-xl font-jetbrains font-extrabold text-gradient'>{formatProfitPerHour(amount)} </span>
    </p>
    {!isSending && isSuccess && (
      <div className='w-8 h-8 rounded-full flex items-center justify-center bg-green-600'>
        <CheckCheck size={14} />
      </div>
    )}
    {!isSuccess && (
      <button
        disabled={isSending}
        onClick={onClick}
        className='relative bg-gradient-to-b from-[#749099] p-3 w-content text-xs rounded-xl to-[#7dc5db]'
      >
        {isSending ? 'Sending...' : 'Create Transaction'}
        <span className='absolute top-[-3px] right-0 flex h-3 w-3'>
          <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75'></span>
          <span className='relative inline-flex rounded-full h-3 w-3 bg-cyan-500'></span>
        </span>
      </button>
    )}
  </div>
)

export default TransactionButton
