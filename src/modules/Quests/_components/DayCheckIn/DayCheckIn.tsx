import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@hooks/use-toast'
import { ToastActionElement } from '@components/ui/toast'
import { Loader2 } from 'lucide-react'

import { CircleCheck } from 'lucide-react'
import numeral from 'numeral'
import React from 'react'

import { taskApi } from '@apis/task.api'
import { hamsterCoin } from '@assets/images'
import { ScheduleItem } from '@interfaces/schedule.interface'
import { cn } from '@lib/utils'
import { QueryKeys } from '@constants/queryKeys'

interface DayCheckInProps {
  day: ScheduleItem
}

const DayCheckIn: React.FC<DayCheckInProps> = ({ day }) => {
  // const [isClicked, setIsClicked] = React.useState(false)
  const [isChecked, setIsChecked] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const queryClient = useQueryClient()
  const { toast } = useToast()
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
    showToast('Error', error?.message, 'destructive')
  }
  const { mutateAsync } = useMutation({
    mutationFn: () => taskApi.postCheckIn(),
    onSuccess: () => {
      setIsLoading(false)
      setIsChecked(true)
      queryClient.refetchQueries({
        queryKey: [QueryKeys.SCHEDULE_TASK],
        type: 'active'
      })
    },
    onError: (error) => {
      console.log('check on error: ', error)
      setIsLoading(false)
      setIsChecked(false)
      handleError(error)
    }
  })

  const postStartTask = async () => {
    try {
      mutateAsync()
    } catch (error) {}
  }

  const handleClick = (item: ScheduleItem) => {
    if (!item.checked && !isChecked && item.today) {
      setIsLoading(true)
      postStartTask()
    }
  }

  return (
    <div
      onClick={() => handleClick(day)}
      className={cn(
        'relative w-full overflow-hidden  rounded-lg transition-transform duration-200 bg-gradient-to-r  p-[0.5px]'
      )}
    >
      <div
        className={cn(
          'grid justify-center items-center rounded-lg px-3 py-1',
          day.today || day.checked ? 'bg-gradient-to-b from-[#00334E] to-[#001F33]' : 'bg-gray-500'
        )}
      >
        <p className='text-center text-[14px]'>Day {day.day_id}</p>
        <div className='flex justify-center'>
          {day.checked || isChecked ? (
            <CircleCheck
              className='bg-[#2ECC71] rounded-full w-8 h-8 mx-auto'
              style={{
                boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
              }}
            />
          ) : !isLoading ? (
            <img src={hamsterCoin} alt='Airdrop' className='w-8 h-8 mx-auto' />
          ) : (
            <Loader2 className='w-8 h-8 mx-auto animate-spin' />
          )}
        </div>
        <p className='text-center text-[18px]'>{numeral(day.rewards).format('0a')}</p>
      </div>
    </div>
  )
}
export default DayCheckIn
