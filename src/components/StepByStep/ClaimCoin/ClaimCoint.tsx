import { mainCharacter } from '@assets/images'
import { useStore } from '@stores'
import { convertAgeToPoints } from '@utils'
import numeral from 'numeral'

const ClaimCoin: React.FC = () => {
  const { ageAccount, isPremiumAccount } = useStore((state) => state)

  return (
    <>
      <div className='!text-white absolute  top-[14%] -translate-y-1/2'>
        <h1 className='text-center text-[24px] font-semibold mt-4'>Your are amazing</h1>
        <p className='text-[24px] mt-4'>Here's Your Reward</p>
      </div>
      <div className='grid justify-center items-center'>
        <img src={mainCharacter} alt='Main Character' className='w-full flex justify-center h-[80%] ' />
        <p className='text-center text-[64px] font-bold font-jetbrains  text-gradient'>
          {numeral(convertAgeToPoints(ageAccount || 0) + (isPremiumAccount ? 1000 : 0)).format('0,0')}
        </p>
      </div>
      <div className='absolute w-full bottom-[12%] left-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center flex-col '>
        <p>Thanks for your time on Telegram</p>
      </div>
    </>
  )
}
export default ClaimCoin
