import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { taskApi } from '@apis/task.api'
import { QueryKeys } from '@constants/queryKeys'
import { useToast } from '@hooks/use-toast'
import { DataTask } from '@interfaces/task.interface'
import { useStore } from '@stores'
import { useEffect } from 'react'

type UseGetClaim = Omit<UseQueryOptions<DataTask>, 'queryKey' | 'queryFn'>

const useGetClaim = (id: string, options?: UseGetClaim, signal?: any) => {
  const { toast } = useToast()
  const { token } = useStore((state) => state)
  const queryResult = useQuery({
    queryKey: [QueryKeys.CLAIM, id],
    queryFn: () => taskApi.getClaim(id, signal),
    enabled: !!token,

    ...options
  })

  useEffect(() => {
    if (queryResult.isFetched && queryResult.isSuccess && queryResult.data) {
      toast({
        title: 'Success',
        description: 'Claim Success',
        duration: 3000,
        variant: 'default'
      })
    }
  }, [queryResult.isFetched, queryResult.isSuccess, queryResult.data, toast])

  useEffect(() => {
    if (queryResult.isFetched && queryResult.isError && queryResult.error) {
      toast({
        title: 'Error',
        description: queryResult.error.message,
        duration: 3000,
        variant: 'destructive'
      })
    }
  }, [queryResult.isFetched, queryResult.isError, queryResult.error, toast])

  return queryResult
}

export default useGetClaim
