import fireData from '@lotties/fire.json'
import { useLottie } from 'lottie-react'
const JoinedTelegram: React.FC = () => {
  const options = {
    animationData: fireData,
    loop: true,
    heigh: 500
  }
  const { View } = useLottie(options)

  return (
    <>
      <div className='!text-white absolute  top-[12%] -translate-y-1/2'>
        <h1 className='text-center text-[24px] font-semibold'>Expert</h1>
        <p className='text-[24px] mt-4'>You've joined Telegram</p>
      </div>
      <div className=''>
        <p className='text-[200px] font-semibold relative z-10'>7</p>
        <div className='absolute w-full top-[45%] left-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center flex-col  '>
          {View}
        </div>
        <p className='text-center text-[24px] font-semibold'>years ago</p>
      </div>
      <div className='absolute w-full top-[85%] left-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center flex-col '>
        <p>Your account number is #99000000.</p>
        <p>You’re in the top 80% Telegram users </p>
      </div>
    </>
  )
}

export default JoinedTelegram
