import { syncApi } from '@apis/sync.api'
import { hamsterCoin, mainCharacter } from '@assets/images'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@components/ui/sheet'
import { QueryKeys } from '@constants/queryKeys'
import { useStore } from '@stores'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { formatProfitPerHour } from '@utils'
import React, { memo } from 'react'

const SheetSyncPoints: React.FC = () => {
  const queryClient = useQueryClient()

  const [isLoading, setIsLoading] = React.useState(false)
  const { dataSync, isShowSheetSync, setShowSheetSync } = useStore((state) => state)

  const { mutateAsync: receivePoints } = useMutation({
    mutationFn: (points: number) => syncApi.postSync({ points, energy: 0 }),
    onSettled: () => {
      queryClient.refetchQueries({
        queryKey: [QueryKeys.AUTH_MINING],
        type: 'active'
      })
      setTimeout(() => {
        setShowSheetSync(false)
        setIsLoading(false)
      }, 500)
    }
  })

  const handleReceivePoints = async () => {
    setIsLoading(true)
    try {
      await receivePoints(Number(dataSync?.points || 0))
    } catch (error: any) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Sheet open={isShowSheetSync}>
      <SheetContent
        side={'bottom'}
        className='rounded-t-[38px] border-t-0 bg-[#f3ba2f]  top-glow p-0 max-w-xl mx-auto'
        classNameIcon='right-4 top-5 focus:ring-0'
        isHiddenClose
        aria-describedby='sheet-sync-points'
      >
        <div className='bg-[black] h-full w-full rounded-t-[38px] mt-[2px] py-6 px-4'>
          <div className='bg-[#272a2f] py-8 px-6 rounded-3xl relative mt-8'>
            <SheetHeader className='mt-4'>
              <SheetTitle className='flex justify-center items-center gap-3 '>
                <img src={hamsterCoin} alt='coin' className='w-14 h-14' />
                <span className='text-[32px] text-white font-bold'>
                  {formatProfitPerHour(dataSync?.points || 0, true)}
                </span>
              </SheetTitle>
            </SheetHeader>

            <div className='absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-black  rounded-full p-2'>
              <div className='bg-[#272a2f] rounded-full w-full h-full flex items-center justify-center'>
                <img src={mainCharacter} alt='Main Character' className='w-[80%] h-[80%]' />
              </div>
            </div>
            <SheetDescription className='text-center text-white pt-6 font-semibold text-base'>
              The exchange has started working for you.
            </SheetDescription>
          </div>

          <div className='mt-3'>
            <button
              className='flex-1 bg-gradient-to-b from-[#D3BA40]  to-[#F9A208] h-[66px] w-full flex justify-center rounded-2xl focus:ring-0 border-none outline-none'
              onClick={handleReceivePoints}
              disabled={isLoading}
            >
              <p className='flex items-center justify-center font-bold text-base text-white leading-[66px]'>
                {isLoading && (
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
                {isLoading ? 'Receiving...' : 'Thank you, Sync Points'}
              </p>
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default memo(SheetSyncPoints)
