import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

// 入口文件配置
const entries = {
  index: resolve(__dirname, 'src/index.ts'),
  'lang/index': resolve(__dirname, 'src/lang/index.ts'),
  'storage/index': resolve(__dirname, 'src/storage/index.ts'),
  'net/index': resolve(__dirname, 'src/net/index.ts'),
  'style/index': resolve(__dirname, 'src/style/index.ts'),
  'debug/index': resolve(__dirname, 'src/debug/index.ts')
};

// 外部依赖配置
const external = [
  'big.js',
  'classnames',
  'dayjs',
  'js-cookie',
  'localforage',
  'lodash-es',
  'qs',
  'validator',
  'vconsole',
  'animate.css'
];

// 全局变量配置
const globals = {
  'big.js': 'Big',
  'classnames': 'classNames',
  'dayjs': 'dayjs',
  'js-cookie': 'Cookies',
  'localforage': 'localforage',
  'lodash-es': '_',
  'qs': 'Qs',
  'validator': 'validator',
  'vconsole': 'VConsole'
};

// 分别导出 ES 和 CJS 格式的配置
const esAndCjsConfig = defineConfig({
  build: {
    lib: {
      entry: entries,
      name: 'JSCommon',
      fileName: (_, entryName) => entryName
    },
    rollupOptions: {
      external,
      output: [
        {
          format: 'es',
          entryFileNames: '[name].mjs',
          exports: 'named',
          globals
        },
        {
          format: 'cjs',
          entryFileNames: '[name].cjs',
          exports: 'named',
          globals
        }
      ]
    },
    minify: 'terser',
    sourcemap: true,
    target: ['es2015', 'chrome87', 'safari13']
  },
  plugins: [
    dts({
      include: ['src'],
      exclude: ['**/*.test.ts', '**/*.spec.ts'],
      rollupTypes: true,
      staticImport: true,
      insertTypesEntry: true
    })
  ]
});

// 单独导出 UMD 格式的配置
const umdConfig = defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'JSCommon',
      fileName: () => 'index'
    },
    rollupOptions: {
      external,
      output: {
        format: 'umd',
        entryFileNames: '[name].umd.js',
        exports: 'named',
        globals,
        name: 'JSCommon'
      }
    },
    minify: 'terser',
    sourcemap: true,
    target: ['es2015', 'chrome87', 'safari13']
  }
});

// 根据命令行参数选择配置
export default defineConfig(({ mode }) => {
  return mode === 'umd' ? umdConfig : esAndCjsConfig;
});