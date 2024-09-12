import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { authApi } from '@apis/auth.api'
import { QueryKeys } from '@constants/queryKeys'
import { DataCardAuth } from '@interfaces/user.interface'

type UseGetCard = Omit<UseQueryOptions<DataCardAuth>, 'queryKey' | 'queryFn'>

const useGetAuthCards = (options?: UseGetCard) => {
  const queryResult = useQuery({
    queryKey: [QueryKeys.AUTH_CARD],
    queryFn: () => authApi.getCard(),
    ...options
  })
  return queryResult
}

export default useGetAuthCards
