import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { authApi } from '@apis/auth.api'
import { QueryKeys } from '@constants/queryKeys'
import { CurrentUser } from '@interfaces/user.interface'
import { useStore } from '@stores'
import { getLocalStorage } from '@utils'
import { useEffect } from 'react'

type UseGetCurrentUser = Omit<UseQueryOptions<CurrentUser>, 'queryKey' | 'queryFn'>

const useGetCurrentUser = (options?: UseGetCurrentUser) => {
  const { setCurrentUser } = useStore((state) => state)

  const token = getLocalStorage('token')
  const queryResult = useQuery({
    queryKey: [QueryKeys.CURRENT_USER],
    queryFn: () => authApi.getCurrentUserInfo(),
    enabled: !!token,
    ...options
  })

  useEffect(() => {
    if (queryResult.data) {
      setCurrentUser(queryResult.data)
    }
  }, [queryResult.data])
}

export default useGetCurrentUser
