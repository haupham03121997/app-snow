import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { taskApi } from '@apis/task.api'
import { QueryKeys } from '@constants/queryKeys'
import { DataTask } from '@interfaces/task.interface'
import { useStore } from '@stores'

type UseGetClaim = Omit<UseQueryOptions<DataTask>, 'queryKey' | 'queryFn'>

const useGetClaim = (id: string, options?: UseGetClaim) => {
  const { token } = useStore((state) => state)
  const queryResult = useQuery({
    queryKey: [QueryKeys.CLAIM, id],
    queryFn: () => taskApi.getClaim(id),
    enabled: !!token,
    ...options
  })
  return queryResult
}

export default useGetClaim
