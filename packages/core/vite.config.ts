import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        'lang/index': resolve(__dirname, 'src/lang/index.ts'),
        'storage/index': resolve(__dirname, 'src/storage/index.ts'),
        'net/index': resolve(__dirname, 'src/net/index.ts')
      },
      formats: ['es'],
      fileName: (format, entryName) => `${entryName}.js`
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
        exports: 'named',
        interop: 'auto',
        generatedCode: {
          constBindings: true
        }
      }
    },
    minify: 'terser',
    sourcemap: true,
    target: 'esnext',
    terserOptions: {
      compress: true,
      mangle: true
    }
  }
}); 