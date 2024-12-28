import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'js'}`
    },
    rollupOptions: {
      external: [
        'react',
        'vue',
        'lodash-es',
        'dayjs',
        'ahooks',
        'ramda',
        'axios',
        '@vueuse/core',
        'qs',
        'pinyin-pro',
        'big.js',
        'classnames',
        'query-string'
      ]
    }
  },
  plugins: [dts()]
}); 