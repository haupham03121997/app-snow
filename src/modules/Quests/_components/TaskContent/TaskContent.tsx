import { taskApi } from '@apis/task.api'
import { hamsterCoin, mainCharacter } from '@assets/images'
import { Button } from '@components/ui/button'
import { QueryKeys } from '@constants/queryKeys'
import { useGetClaim } from '@hooks'
import { TaskItem } from '@interfaces/task.interface'
import { cn } from '@lib/utils'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { formatProfitPerHour } from '@utils'
import React, { useEffect, useMemo, useState } from 'react'
import { DialogConfirm } from '../DialogConfirm'
import { conditionSocial } from '@constants/conditionSocial'

interface TaskContentProps {
  task: TaskItem
  isOpen?: boolean
}

const TaskContent: React.FC<TaskContentProps> = ({ task, isOpen }) => {
  const queryClient = useQueryClient()

  const [isClaiming, setIsClaiming] = useState(false)
  const [isDialogVisible, setIsDialogVisible] = useState(false)

  const controller = new AbortController()
  const signal = controller.signal

  const { mutateAsync: startTask } = useMutation({
    mutationFn: (id: string) => taskApi.postStartTask(id),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: [QueryKeys.TASKS],
        type: 'active'
      })
      setIsClaiming(false)
    },
    onError: () => {
      setIsClaiming(false)
    },
    onSettled: () => {
      setIsClaiming(false)
    }
  })

  const claimQuery = useGetClaim(
    task.id,
    {
      enabled: isClaiming,
      gcTime: 0,
      staleTime: 0
    },
    signal
  )

  const isClaimLoading = useMemo(() => claimQuery.isLoading, [claimQuery])

  useEffect(() => {
    return () => {
      controller.abort()
    }
  }, [isOpen])

  const handleClaim = () => {
    setIsClaiming(true)
    claimQuery.refetch()
  }

  const handleStartTask = async (id: string) => {
    try {
      await startTask(id)
    } catch (error) {
      console.error(error)
    }
  }

  const handleClickAction = async (task: TaskItem, url: string) => {
    if (task.social_type_id == conditionSocial.TELEGRAM) {
      window.location.href = task.link || ''
    } else {
      window.location.href = url
    }

    await handleStartTask(task.id)
  }

  return (
    <>
      <div className='bg-[black] h-full w-full rounded-t-[38px] mt-[2px] py-6 px-4'>
        <div className='bg-[#272a2f] py-8 px-6 rounded-3xl relative mt-8'>
          <div className='absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-black rounded-full p-2'>
            <div className='bg-[#272a2f] rounded-full w-full h-full flex items-center justify-center'>
              <img src={mainCharacter} alt='Main Character' className='w-[80%] h-[80%]' />
            </div>
          </div>
          <div className='flex flex-col items-center gap-4 mt-4'>
            <div className='flex justify-center gap-3 '>
              <img src={hamsterCoin} alt='Task Icon' className='h-14 w-14' />
              <span className='text-[32px] text-white font-extrabold font-jetbrains text-gradient'>
                {formatProfitPerHour(Number(task.coins || 0))}
              </span>
            </div>

            <p className='text-base font-semibold text-center'>{task.name}</p>
            <div className='flex justify-center'>
              <button
                className={cn('py-2 bg-slate-400 justify-center rounded-lg w-[100px]', {
                  'bg-[#65C0E4]': !task.started
                })}
                onClick={() => !task.started && setIsDialogVisible(true)}
              >
                {task.started ? 'Joined' : 'Join'}
              </button>
            </div>
          </div>
        </div>

        <div className='mt-3'>
          <Button
            loading={!!isClaimLoading}
            onClick={handleClaim}
            disabled={(task.claimed && task.started) || isClaimLoading}
          >
            {isClaimLoading ? 'Receiving...' : 'Check'}
          </Button>
        </div>
      </div>
      <DialogConfirm
        task={task}
        isShow={isDialogVisible}
        setIsShow={setIsDialogVisible}
        onClickAction={handleClickAction}
      />
    </>
  )
}

export default TaskContent
