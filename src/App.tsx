import { useEffect } from 'react'

import { useGetCurrentUser, useGetMining, useGetToken, usePostSyncPoints, useSyncData } from '@hooks'
import useRouterElements from '@routes/useRouterElement'

import { PointsIncrement, SheetSyncPoints } from '@components'
import { Toaster } from 'react-hot-toast'
import './App.css'

function App() {
  useEffect(() => {
    console.log('App mounted')
  }, [])

  const { data } = useGetToken()
  useGetCurrentUser({ enabled: !!data?.token })
  useGetMining({ enabled: !!data?.token })
  useSyncData({ enabled: !!data?.token })
  usePostSyncPoints()

  const routeElements = useRouterElements()
  return (
    <>
      {routeElements}
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
