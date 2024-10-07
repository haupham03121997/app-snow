import WebApp from '@twa-dev/sdk'
import { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'

import useRouterElements from '@routes/useRouterElement'

import { GlobalLoading, PointsIncrement, SheetSyncPoints } from '@components'
import { useConfig, useGetToken, usePostSyncPoints } from '@hooks'
import { useStore } from '@stores'
import { TonConnectUIProvider } from '@tonconnect/ui-react'

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
    <TonConnectUIProvider
      manifestUrl='https://2704-171-233-30-204.ngrok-free.app/tonconnect-manifest.json'
      actionsConfiguration={{
        twaReturnUrl: 'https://t.me/Snowmanbottest_Name_bot'
      }}
    >
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
    </TonConnectUIProvider>
  )
}

export default App
