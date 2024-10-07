import { StepChecking } from '@constants/stepChecking'
import { cn } from '@lib/utils'
import { useStore } from '@stores'
import { randomTime } from '@utils'
import React, { memo, useEffect, useState } from 'react'
import { CheckingYourAccount } from './CheckingAccount'
import { ClaimCoin } from './ClaimCoin'
import './index.css'
import { JoinedTelegram } from './JoinedTelegram'

const StepByStep: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingPremium, setIsLoadingPremium] = useState(true)
  useEffect(() => {
    setTimeout(
      () => {
        setIsLoading(false)
      },
      randomTime(1000, 2000)
    )
  }, [])

  useEffect(() => {
    setTimeout(
      () => {
        setIsLoadingPremium(false)
      },
      randomTime(500, 1000)
    )
  }, [])

  const [state, setState] = React.useState<any>(StepChecking.CHECKING)
  const { setIsVisible } = useStore((state) => state)

  const nextStep = (step: StepChecking) => {
    setState(step)
  }
  const getStep = () => {
    switch (state) {
      case StepChecking.CHECKING:
        return <CheckingYourAccount isLoading={isLoading} isLoadingPremium={isLoadingPremium} />
      case StepChecking.JOINED_TELEGRAM:
        return <JoinedTelegram />
      case StepChecking.CLAIM_COIN:
        return <ClaimCoin />
      default:
        setIsVisible(false)
        return
    }
  }
  return (
    <div className='splash-container !text-white'>
      <div className='w-full h-1  absolute top-[5%] -translate-y-1/2 grid grid-cols-2 gap-2 justify-center px-2'>
        <p
          className="bg-slate-200 h-[5px] rounded-lg relative 
        after:h-[5px] after:bg-green-300 after:animate-[expand_2s_forwards] 
        after:content[''] after:absolute after:left-0  after:w-[0] after:rounded-lg "
        ></p>

        <p
          className={cn(
            'h-[5px] rounded-lg relative',
            state == StepChecking.CLAIM_COIN
              ? "bg-slate-200 h-[5px] rounded-lg relative after:h-[5px] after:bg-green-300 after:animate-[expand_2s_forwards] after:content[''] after:absolute after:left-0  after:w-[0] after:rounded-lg"
              : 'bg-slate-200'
          )}
        ></p>
      </div>
      {getStep()}
      <div className='text-white absolute z-[9999] bottom-0 -translate-y-1/2 w-full inline-flex justify-center'>
        <button
          className=' bg-gradient-to-b from-[#749099]  to-[#7dc5db]  h-[56px] w-[90%]  rounded-2xl'
          onClick={() => nextStep(state + 1)}
          disabled={state === 4 || isLoading || isLoadingPremium}
        >
          <p className='flex items-center justify-center w-full'>Continue</p>
        </button>
      </div>
    </div>
  )
}
export default memo(StepByStep)
