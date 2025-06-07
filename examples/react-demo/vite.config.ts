import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { readFileSync } from 'fs'

// 读取 jscommon 包的版本
const jscommonPkg = JSON.parse(
  readFileSync(resolve(__dirname, '../../packages/core/package.json'), 'utf-8')
)

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@wolforest/jscommon': resolve(__dirname, '../../packages/core/src/index.ts')
    }
  },
  define: {
    __JSCOMMON_VERSION__: JSON.stringify(jscommonPkg.version)
  }
}) 