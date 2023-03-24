import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'
// const path = require('path')
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    port: 3000,
    host:'0.0.0.0',
    proxy: {
      '/LargeScreenDisplay': {
        // target: 'http://118.31.77.122:8704',
        target: 'http://192.168.38.134:8704',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
