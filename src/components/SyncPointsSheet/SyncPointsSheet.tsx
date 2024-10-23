import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { memo } from 'react'

import { syncApi } from '@apis/sync.api'
import { hamsterCoin, mainCharacter } from '@assets/images'
import { PointsSheet } from '@components'
import { QueryKeys } from '@constants/queryKeys'
import { useStore } from '@stores'
import { formatProfitPerHour } from '@utils'

const SyncPointsSheet: React.FC = () => {
  const queryClient = useQueryClient()

  const [isLoading, setIsLoading] = React.useState(false)
  const { dataSync, setShowSheetSync } = useStore((state) => state)

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
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <PointsSheet
        open={true}
        onClose={() => setShowSheetSync(false)}
        title={formatProfitPerHour(dataSync?.points || 0, true)}
        description='The exchange has started working for you.'
        mainImage={hamsterCoin}
        mainImageAlt='coin'
        mainImageClass='w-14 h-14'
        content={
          <div className='absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-black rounded-full p-2'>
            <div className='bg-[#272a2f] rounded-full w-full h-full flex items-center justify-center'>
              <img src={mainCharacter} alt='Main Character' className='w-[80%] h-[80%]' />
            </div>
          </div>
        }
        buttonText='Thank you, Sync Points'
        buttonAction={handleReceivePoints}
        isLoading={isLoading}
      />
    </>
  )
}

export default memo(SyncPointsSheet)
