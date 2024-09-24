import { useEffect } from 'react'
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

  usePostSyncPoints(isFetching && !!data && !data?.is_new_user)

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
