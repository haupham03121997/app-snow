import WebApp from '@twa-dev/sdk'
import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'

import useRouterElements from '@routes/useRouterElement'

import { useConfig, useGetToken, usePostSyncPoints } from '@hooks'
import { useStore } from '@stores'
import { TonConnectUIProvider } from '@tonconnect/ui-react'

import { StepByStep } from '@components/StepByStep'
import { PATH_TON_WALLET, TELEGRAM_BOT_URL } from '@constants/config'
import './App.css'

function App() {
  useEffect(() => {
    console.log('App mounted')
  }, [])

  const { data } = useGetToken()
  const { isFetching } = useConfig(data?.token || null)
  // const { isGlobalLoading } = useStore((state) => state)
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
      manifestUrl={PATH_TON_WALLET}
      actionsConfiguration={{
        twaReturnUrl: TELEGRAM_BOT_URL
      }}
    >
      {routeElements}

      {/* <CSSTransition in={!data || isPending} timeout={500} unmountOnExit>
        <div className={cn('fixed top-0 left-0 w-screen h-screen bg-black z-[9999] flex items-center justify-center')}>
          <img src={mainCharacter} className='w-3/4' />
          <p className='absolute bottom-5'>
            <span className='text-white font-semibold text-2xl text-gradient'>Let's start</span>
          </p>
        </div>
      </CSSTransition>

      <CSSTransition in={isFetching && !isVisible && isGlobalLoading} timeout={500} classNames='fade' unmountOnExit>
        <GlobalLoading />
      </CSSTransition> */}

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
      {/* <SheetSyncPoints />
      <PointsIncrement /> */}
    </TonConnectUIProvider>
  )
}

export default App
