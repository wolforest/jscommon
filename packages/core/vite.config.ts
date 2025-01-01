import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'jscommon',
      formats: ['es'],
      fileName: () => 'index.js'
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
        format: 'es',
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].js'
      }
    },
    minify: false,
    sourcemap: true
  },
  plugins: [
    dts({
      rollupTypes: true,
      include: ['src']
    })
  ]
}); 