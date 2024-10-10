import { mainCharacter } from '@assets/images'

const ClaimCoin: React.FC = () => {
  return (
    <>
      <div className='!text-white absolute  top-[12%] -translate-y-1/2'>
        <h1 className='text-center text-[24px] font-semibold'>Your are amazing</h1>
        <p className='text-[24px] mt-4'>Here is your GOATS reward</p>
      </div>
      <div className='grid justify-center'>
        <img src={mainCharacter} alt='Main Character' className='w-full flex justify-center h-[90%] ' />
        <p className='text-center text-[24px] font-semibold'>9,990 $GOATS</p>
      </div>
      <div className='absolute w-full top-[85%] left-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center flex-col '>
        <p>Your account number is #99000000.</p>
        <p>You’re in the top 80% Telegram users </p>
      </div>
    </>
  )
}
export default ClaimCoin
