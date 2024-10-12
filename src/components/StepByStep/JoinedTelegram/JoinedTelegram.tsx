import { cn } from '@lib/utils'
import fireData from '@lotties/fire.json'
import { useStore } from '@stores'
import { useLottie } from 'lottie-react'
const JoinedTelegram: React.FC = () => {
  const options = {
    animationData: fireData,
    loop: true,
    heigh: 500,
    style: {
      transform: 'translate3d(-10px, 0px, 0px)'
    }
  }
  const { View } = useLottie(options)

  const { ageAccount, currentUser } = useStore((state) => state)

  return (
    <>
      <div className='!text-white absolute  top-[14%] -translate-y-1/2'>
        <h1 className='text-center text-[24px] font-semibold'>Expert</h1>
        <p className='text-[24px] mt-4'>You've joined Telegram</p>
      </div>
      <div
        className={cn({
          '': Number(ageAccount) < 1
        })}
      >
        <p
          className={cn('text-[150px] pb-20 relative z-10 font-jetbrains font-extrabold', {
            'text-[90px] pb-[80px]': Number(ageAccount) < 1
          })}
        >
          {Number(ageAccount) < 1 ? '< 1' : ageAccount}
        </p>
        <div className='absolute w-full top-[45%] left-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center flex-col  '>
          {View}
        </div>
        <p className='text-center text-[24px] font-semibold absolute top-[65%] w-full left-0'>
          {Number(ageAccount) <= 1 ? 'year' : 'years'} ago
        </p>
      </div>
      <div className='absolute w-full bottom-[10%] left-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center flex-col '>
        <p>Your account number is #{currentUser?.telegram_id}.</p>
        <p>You’re in the top 80% Telegram users </p>
      </div>
    </>
  )
}

export default JoinedTelegram
