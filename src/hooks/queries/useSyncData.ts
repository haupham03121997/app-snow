import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { syncApi } from '@apis/sync.api'
import { QueryKeys } from '@constants/queryKeys'
import { DataSync } from '@interfaces/sync.interface'
import { useStore } from '@stores'
import { useEffect, useMemo } from 'react'

type UseGetSyncData = Omit<UseQueryOptions<DataSync>, 'queryKey' | 'queryFn'>

const useSyncData = (options?: UseGetSyncData) => {
  const { setShowSheetSync, setSyncData } = useStore((state) => state)
  const queryResult = useQuery({
    queryKey: [QueryKeys.AUTH_SYNC],
    queryFn: () => syncApi.getSync(),
    ...options
  })

  const data = useMemo(() => queryResult?.data, [queryResult])

  useEffect(() => {
    if (data) {
      setSyncData({
        ...data,
        points: Number(data.points || 0)
      })
      setShowSheetSync(true)
    }
  }, [data])

  return queryResult
}

export default useSyncData
