import { syncApi } from '@apis/sync.api'
import { QueryKeys } from '@constants/queryKeys'
import { useStore } from '@stores'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

const usePostSyncPoints = (isFetching: boolean) => {
  const { mining } = useStore((state) => state)
  const queryClient = useQueryClient()
  const mutate = useMutation({
    mutationFn: (points: number) => syncApi.postSync({ points, energy: 0 }),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: [QueryKeys.AUTH_MINING],
        type: 'active'
      })
    }
  })

  useEffect(() => {
    if (!mining || isFetching) return

    const profitPerHour = Number(mining.profit_per_hour || 0)
    const pointsPerSecond = Math.floor(profitPerHour / 3600)
    const points = Number(mining.points || 0) + pointsPerSecond
    mutate.mutate(points)
  }, [])
}

export default usePostSyncPoints
