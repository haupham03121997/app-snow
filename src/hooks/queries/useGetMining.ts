import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { authApi } from '@apis/auth.api'
import { QueryKeys } from '@constants/queryKeys'
import { DataMining } from '@interfaces/mining.interface'
import { useStore } from '@stores'
import { useEffect, useMemo } from 'react'

type UseGetMining = Omit<UseQueryOptions<DataMining>, 'queryKey' | 'queryFn'>

const useGetMining = (options?: UseGetMining) => {
  const queryResult = useQuery({
    queryKey: [QueryKeys.AUTH_MINING],
    queryFn: () => authApi.getMining(),
    gcTime: 0,
    ...options
  })

  const { setMining, setCombo, setDisabledPoints } = useStore((state) => state)

  const miningData = useMemo(() => queryResult?.data?.mining, [queryResult])
  const comboData = useMemo(() => queryResult?.data?.combo, [queryResult])
  const isFetching = useMemo(() => queryResult.isFetching, [queryResult])

  useEffect(() => {
    if (isFetching) {
      setDisabledPoints(true)
    } else {
      setDisabledPoints(false)
      if (miningData) setMining(miningData)
      if (comboData) setCombo(comboData)
    }
  }, [miningData, isFetching])

  return queryResult
}

export default useGetMining
