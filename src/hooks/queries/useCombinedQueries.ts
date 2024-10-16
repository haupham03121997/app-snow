import { useEffect, useMemo } from 'react'

import { authApi } from '@apis/auth.api'
import { inviteApi } from '@apis/invite.api'
import { syncApi } from '@apis/sync.api'
import { QueryKeys } from '@constants/queryKeys'
import { useStore } from '@stores'
import { useQueries } from '@tanstack/react-query'

const useCombinedQueries = (token: string | null) => {
  const { setCurrentUser, setMining, setCombo, setDisabledPoints, setShowSheetSync, setSyncData } = useStore(
    (state) => state
  )

  const results = useQueries({
    queries: [
      {
        queryKey: [QueryKeys.CURRENT_USER],
        queryFn: () => authApi.getCurrentUserInfo(),
        enabled: !!token
      },
      {
        queryKey: [QueryKeys.AUTH_MINING],
        queryFn: () => authApi.getMining(),
        enabled: !!token,
        gcTime: 0
      },
      {
        queryKey: [QueryKeys.AUTH_SYNC],
        queryFn: () => syncApi.getSync(),
        enabled: !!token
      },
      {
        queryKey: [QueryKeys.AUTH_CARD],
        queryFn: () => authApi.getCard(),
        enabled: !!token
      },
      {
        queryKey: [QueryKeys.AUTH_INVITE_FRIENDS],
        queryFn: () => inviteApi.getInviteFriends(),
        enabled: !!token
      }
    ]
  })

  const [currentUserResult, miningResult, syncResult] = useMemo(() => results, [results])

  useEffect(() => {
    if (currentUserResult.data) {
      setCurrentUser(currentUserResult.data)
    }
  }, [currentUserResult.data])

  const miningData = useMemo(() => miningResult?.data?.mining, [miningResult])
  const comboData = useMemo(() => miningResult?.data?.combo, [miningResult])
  const isFetchingMining = useMemo(() => miningResult.isFetching, [miningResult])

  useEffect(() => {
    if (isFetchingMining) {
      setDisabledPoints(true)
    } else {
      setDisabledPoints(false)
      if (miningData) setMining(miningData)
      if (comboData) setCombo(comboData)
    }
  }, [miningData, isFetchingMining])

  const syncData = useMemo(() => syncResult?.data, [syncResult])

  useEffect(() => {
    if (syncData) {
      setSyncData({ ...syncData, points: Number(syncData.points) })
      setShowSheetSync(Number(syncData.points) > 0 ? true : true)
    }
  }, [syncData])

  return results
}

export default useCombinedQueries
