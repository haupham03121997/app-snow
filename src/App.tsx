import { useEffect } from 'react'

import useRouterElements from '@routes/useRouterElement'

import axios from 'axios'
import { Toaster } from 'react-hot-toast'
import './App.css'

function App() {
  useEffect(() => {
    console.log('App mounted')
    axios.get('https://api.restful-api.dev/objects').then((res) => {})
  }, [])

  // useGetToken()
  // useGetCurrentUser({ enabled: !!data?.token })
  // useGetMining({ enabled: !!data?.token })
  // useSyncData({ enabled: !!data?.token })
  // usePostSyncPoints()

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
      {/* <SheetSyncPoints />
      <PointsIncrement /> */}
    </>
  )
}

export default App
