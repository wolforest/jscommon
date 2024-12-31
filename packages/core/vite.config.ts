import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'jscommon',
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'js'}`,
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      external: [
        'big.js',
        'dayjs',
        'js-cookie',
        'localforage',
        'lodash-es',
        'qs',
        'validator'
      ],
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src'
      }
    },
    minify: 'esbuild',
    sourcemap: true,
    target: 'esnext'
  },
  plugins: [
    dts({
      insertTypesEntry: true,
      include: ['src']
    })
  ],
  optimizeDeps: {
    include: ['big.js', 'dayjs', 'lodash-es']
  }
}); 