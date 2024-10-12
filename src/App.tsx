import WebApp from '@twa-dev/sdk'
import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'

import useRouterElements from '@routes/useRouterElement'

import { GlobalLoading, PointsIncrement, SheetSyncPoints } from '@components'
import { useConfig, useGetToken, usePostSyncPoints } from '@hooks'
import { useStore } from '@stores'
import { TonConnectUIProvider } from '@tonconnect/ui-react'

import { StepByStep } from '@components/StepByStep'
import './App.css'

function App() {
  useEffect(() => {
    console.log('App mounted')
  }, [])

  const { data, isPending } = useGetToken()
  const { isFetching } = useConfig(data?.token || null)
  const { isGlobalLoading } = useStore((state) => state)
  const { isVisible } = useStore((state) => state)

  useEffect(() => {
    const initWebApp = async () => {
      WebApp.ready()

      console.log('WebApp.initData', WebApp.initData)
      console.log('WebApp.initData isPremium', WebApp.initDataUnsafe.user?.is_premium)
      console.log('WebApp.initData ', WebApp.initDataUnsafe.user)
    }

    initWebApp()
  }, [])

  usePostSyncPoints(isFetching && !!data && !data?.is_new_user)

  const routeElements = useRouterElements()
  return (
    <TonConnectUIProvider
      manifestUrl='https://7abd-118-69-63-106.ngrok-free.app/tonconnect-manifest.json'
      actionsConfiguration={{
        twaReturnUrl: 'https://t.me/Snowmanbottest_Name_bot'
      }}
    >
      {routeElements}
      {(isFetching || isPending) && !isVisible && isGlobalLoading && <GlobalLoading />}
      {isVisible && <StepByStep />}
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
