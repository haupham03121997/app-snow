import axios from 'axios'
import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'

import useRouterElements from '@routes/useRouterElement'

import { GlobalLoading, PointsIncrement, SheetSyncPoints } from '@components'
import { useConfig, useGetToken, usePostSyncPoints } from '@hooks'
import './App.css'

function App() {
  useEffect(() => {
    console.log('App mounted')
    axios.get('https://api.restful-api.dev/objects').then((res) => {
      console.log(res.data)
    })
  }, [])

  const { data, isPending } = useGetToken()
  const { isFetching } = useConfig(data?.token || null)
  usePostSyncPoints(isFetching)

  const routeElements = useRouterElements()
  return (
    <>
      {routeElements}
      {(isFetching || isPending) && <GlobalLoading />}
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
