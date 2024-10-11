import WebApp from '@twa-dev/sdk'
import { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'

import useRouterElements from '@routes/useRouterElement'

import { GlobalLoading, PointsIncrement, SheetSyncPoints } from '@components'
import { useConfig, useGetToken, usePostSyncPoints } from '@hooks'
import { useStore } from '@stores'
import './App.css'

function App() {
  useEffect(() => {
    console.log('App mounted')
  }, [])

  const { data, isPending } = useGetToken()
  const { isFetching } = useConfig(data?.token || null)
  const { isGlobalLoading } = useStore((state) => state)

  const [initData, setInitData] = useState('')
  const [userId, setUserId] = useState('')
  const [startParam, setStartParam] = useState('')

  usePostSyncPoints(isFetching && !!data && !data?.is_new_user)

  useEffect(() => {
    const initWebApp = async () => {
      WebApp.ready()
      setInitData(WebApp.initData)
      setUserId(WebApp.initDataUnsafe.user?.id.toString() || '')
      setStartParam(WebApp.initDataUnsafe.start_param || '')
      console.log('WebApp.initData isPremium', WebApp.initDataUnsafe.user?.is_premium)
      console.log('WebApp.initData ', WebApp.initDataUnsafe.user)
    }

    initWebApp()
  }, [])

  console.log({
    initData,
    userId,
    startParam
  })
  const routeElements = useRouterElements()
  return (
    <>
      {routeElements}
      {(isFetching || isPending) && isGlobalLoading && <GlobalLoading />}
      <Toaster
        containerStyle={{
          top: '10%'
        }}
        position='top-right'
        toastOptions={{
          className: 'custom-toast',
          duration: 3000
        }}
      />
      <SheetSyncPoints />
      <PointsIncrement />
    </>
  )
}

export default App
