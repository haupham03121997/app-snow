import { hamsterCoin } from '@assets/images'
import { ListTask } from './_components/ListTask'
import { useListTask } from '@hooks'
import { memo } from 'react'
import { DailyTask } from './_components/DailyTask'

const QuestsPage = () => {
  const queryResult = useListTask()
  const dataTasks = queryResult.data
  const isLoading = queryResult.isLoading
  return (
    <div className='text-white font-bold flex flex-col max-w-xl bg-[#1d2025] px-4'>
      <div className='px-4 mt-4 flex justify-center'>
        <div className='w-80 h-80 p-4 rounded-full circle-outer relative'>
          <div className='w-full h-full rounded-full circle-inner flex items-center'>
            <img src={hamsterCoin} alt='Main Character' />
          </div>
          <div className='absolute bottom-10'>
            <p className='text-[24px] text-center'>Complete tasks to earn Coins</p>
          </div>
        </div>
      </div>
      <div className='mb-20'>
        <p>Daily tasks:</p>
        <DailyTask />
        <p>Social tasks:</p>
        <ListTask data={dataTasks?.data || []} isLoading={isLoading} />
      </div>
    </div>
  )
}

export default memo(QuestsPage)
