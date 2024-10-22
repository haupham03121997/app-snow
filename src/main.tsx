import '@styles/index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import { Toaster } from '@/components/ui/toaster'
import App from './App.tsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <App />
      <Toaster />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </BrowserRouter>
)
