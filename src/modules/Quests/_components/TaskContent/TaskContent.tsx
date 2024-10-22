import { taskApi } from '@apis/task.api'
import { hamsterCoin, questionCoin } from '@assets/images'
import { TaskItem } from '@interfaces/task.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import numeral from 'numeral'
import React, { memo, useMemo, useState } from 'react'
import { DialogConfirm } from '../DialogConfirm'
import { useGetClaim } from '@hooks'
import { QueryKeys } from '@constants/queryKeys'

interface TaskContentProps {
  task: TaskItem
  // clickShowDialog: (value: boolean) => void
  // checkClaim: (id: string) => void
  // getClaimIsLoading: boolean
  // isShow: boolean
  // setIsShow: any
}

const TaskContent: React.FC<TaskContentProps> = ({ task }) => {
  // const { toast } = useToast()
  const queryClient = useQueryClient()

  const [status, setIsStatus] = useState(false)
  const [isShowDialog, setIsShowDialog] = useState(false)
  const { mutateAsync } = useMutation({
    mutationFn: (id: string) => taskApi.postStartTask(id),
    onSuccess: () => {
      setTimeout(() => {
        queryClient.refetchQueries({
          queryKey: [QueryKeys.TASKS],
          type: 'active'
        })
      }, 800)
    }
  })

  const queryResult = useGetClaim(task.id, {
    enabled: status
  })

  // const dataTask = useMemo(() => queryResult.data, [queryResult])
  // const dataError = useMemo(() => queryResult.error, [queryResult])
  // const isPending = useMemo(() => queryResult.isPending, [queryResult])
  const getClaimIsLoading = useMemo(() => queryResult.isLoading, [queryResult])
  // useEffect(() => {
  //   if (queryResult && queryResult.data) {
  //     toast({
  //       title: 'Success',
  //       description: 'Claim Success',
  //       duration: 3000,
  //       variant: 'default'
  //     })
  //   }
  //   if (queryResult.error) {
  //     toast({
  //       title: 'Error',
  //       description: dataError.message,
  //       duration: 3000,
  //       variant: 'destructive'
  //     })
  //   }
  // }, [])
  // useEffect(() => {
  //   console.log({ queryResult })
  //   if (queryResult && queryResult.data) {
  //     toast({
  //       title: 'Success',
  //       description: 'Claim Success',
  //       duration: 3000,
  //       variant: 'default'
  //     })
  //   }
  //   if (queryResult && !isPending && dataError) {
  //     toast({
  //       title: 'Error',
  //       description: dataError.message,
  //       duration: 3000,
  //       variant: 'destructive'
  //     })
  //   }
  // }, [dataError])

  const checkClaim = () => {
    setIsStatus(true)
    // console.log({ dataError, dataTask })
    // if (dataError) {
    //   toast({
    //     title: 'Error',
    //     description: dataError.message,
    //     duration: 3000,
    //     variant: 'destructive'
    //   })
    // }
    // if (dataTask?.data) {
    //   toast({
    //     title: 'Success',
    //     description: 'Claim Success',
    //     duration: 3000,
    //     variant: 'default'
    //   })
    // }
  }
  const postStartTask = async (id: string) => {
    try {
      mutateAsync(id)
    } catch (error) {}
  }
  const clickAction = async (task: TaskItem, url: string) => {
    window.location.href = url
    await postStartTask(task.id)
  }
  return (
    <>
      <div className='bg-[black] h-full w-full rounded-t-[38px] mt-[2px] py-6 px-4'>
        <div className='bg-[#272a2f] rounded-2xl p-4 grid gap-3 mt-1'>
          <div className='flex justify-center'>
            <img src={hamsterCoin} alt='binanceLogo' className='h-16 w-16' />
          </div>
          <p className='text-xl text-center'>{task.name}</p>
          <div className='flex justify-center'>
            {task.started ? (
              <button className='text-lg bg-gray-400 justify-center rounded-lg w-[100px]'>Join</button>
            ) : (
              <button
                className='text-lg bg-[#65C0E4] justify-center rounded-lg w-[100px]'
                onClick={() => setIsShowDialog(true)}
              >
                Join
              </button>
            )}
          </div>
          <div className='flex items-center justify-center gap-2 text-2xl'>
            <img src={questionCoin} alt='binanceLogo' className='h-8' /> {numeral(task.coins).format('0,0')}
          </div>
        </div>
        <div className='mt-3'>
          {!task.claimed && task.started ? (
            <div
              onClick={() => checkClaim()}
              className='flex-1 bg-gradient-to-b from-[#D3BA40]  to-[#F9A208] h-[66px] w-full flex justify-center rounded-2xl'
            >
              <button className='flex items-center justify-center font-bold text-base text-white'>
                {getClaimIsLoading && (
                  <svg className='animate-spin h-5 w-5 mr-3 stroke-white' viewBox='0 0 24 24'>
                    <circle
                      className='opacity-25'
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      strokeWidth='4'
                    ></circle>
                    <path
                      className='opacity-75'
                      fill='currentColor'
                      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                    ></path>
                  </svg>
                )}
                {getClaimIsLoading ? 'Receiving...' : 'Check'}
              </button>
            </div>
          ) : (
            <div className='flex-1 bg-gradient-to-b bg-gray-400 h-[66px] w-full flex justify-center rounded-2xl'>
              <button className='flex items-center justify-center font-bold text-base text-white'>Check</button>
            </div>
          )}
        </div>
      </div>
      <DialogConfirm task={task} isShow={isShowDialog} setIsShow={setIsShowDialog} onClickAction={clickAction} />
    </>
  )
}

export default memo(TaskContent)
