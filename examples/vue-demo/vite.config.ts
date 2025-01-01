import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@wolforest/jscommon': resolve(__dirname, '../../packages/core/src/index.ts')
    }
  },
  optimizeDeps: {
    include: ['@wolforest/jscommon']
  }
}) 