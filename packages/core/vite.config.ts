import { defineConfig } from 'vite';
import { resolve } from 'path';
// import dts from 'vite-plugin-dts';

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

// ES 和 CJS 格式的配置
const esAndCjsConfig = defineConfig({
  build: {
    lib: {
      entry: entries,
      name: 'JSCommon',
      fileName: (format, entryName) => {
        const ext = format === 'es' ? 'mjs' : 'cjs';
        return `${entryName}.${ext}`;
      },
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      external: (id) => {
        // 对于 CommonJS 构建，不外部化 lodash-es，让它被打包进去
        if (id === 'lodash-es') {
          return false; // 不外部化，打包进去
        }
        // 其他依赖正常外部化
        return external.includes(id);
      },
      output: [
        {
          format: 'es',
          exports: 'named',
          preserveModules: false,
          globals
        },
        {
          format: 'cjs',
          exports: 'named',
          preserveModules: false,
          globals,
          // 为 CommonJS 格式添加 interop 选项
          interop: 'auto'
        }
      ]
    },
    minify: 'terser',
    sourcemap: true,
    target: ['es2015', 'chrome87', 'safari13']
  },
  plugins: [
    // 暂时禁用 dts 插件
    // dts({
    //   include: ['src'],
    //   exclude: ['**/*.test.ts', '**/*.spec.ts'],
    //   rollupTypes: true,
    //   staticImport: true,
    //   insertTypesEntry: true,
    //   copyDtsFiles: true
    // })
  ]
});

// UMD 格式的配置
const umdConfig = defineConfig({
  build: {
    emptyOutDir: false, // 不清空输出目录
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'JSCommon',
      fileName: 'index',
      formats: ['umd']
    },
    rollupOptions: {
      // UMD 格式不使用外部依赖，全部打包进去
      external: [],
      output: {
        format: 'umd',
        name: 'JSCommon',
        exports: 'named',
        globals: {},
        entryFileNames: 'index.umd.cjs'
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