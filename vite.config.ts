import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'



// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      // Chuyển hướng các yêu cầu đến API
      '/api': {
        target: 'https://smc.dt.ciis.canon.com',
        changeOrigin: true,
        secure: false // Tắt kiểm tra SSL trong môi trường phát triển
      }
    }
  },

  resolve: {
    alias: [
      { find: '@', replacement: '/src' },
      { find: '@components', replacement: '/src/components' },
      { find: '@modules', replacement: '/src/modules' },
      { find: '@routes', replacement: '/src/routes' },
      { find: '@utils', replacement: '/src/utils' },
      { find: '@layouts', replacement: '/src/layouts' },
      { find: '@context', replacement: '/src/context' },
      { find: '@hooks', replacement: '/src/hooks' },
      { find: '@assets', replacement: '/src/assets' },
      { find: '@styles', replacement: '/src/styles' },
      { find: '@interfaces', replacement: '/src/interfaces' },
      { find: '@constants', replacement: '/src/constants' },
      { find: '@stores', replacement: '/src/stores' },
      { find: '@constants', replacement: '/src/constants' },
      { find: '@lib', replacement: '/src/lib' },
      { find: '@apis', replacement: '/src/apis' },
      { find: '@lotties', replacement: '/src/lotties' }
    ]
  }
})
