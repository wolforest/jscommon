import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

// 外部依赖列表 - 这些依赖不会被打包进去
const external = [
  'lodash-es',
  'lodash',
  'dayjs',
  'big.js',
  'classnames',
  'animate.css',
  'localforage',
  'js-cookie',
  'qs',
  'validator',
  'vconsole'
];

// 全局变量映射
const globals = {
  'lodash-es': '_',
  'lodash': '_',
  'dayjs': 'dayjs',
  'big.js': 'Big',
  'classnames': 'classNames',
  'localforage': 'localforage',
  'js-cookie': 'Cookies',
  'qs': 'Qs',
  'validator': 'validator',
  'vconsole': 'VConsole'
};

// 入口文件配置
const entries = {
  index: resolve(__dirname, 'src/index.ts'),
  'lang/index': resolve(__dirname, 'src/lang/index.ts'),
  'net/index': resolve(__dirname, 'src/net/index.ts'),
  'storage/index': resolve(__dirname, 'src/storage/index.ts'),
  'style/index': resolve(__dirname, 'src/style/index.ts'),
  'debug/index': resolve(__dirname, 'src/debug/index.ts')
};

export default defineConfig(({ mode }) => {
  const isUmd = mode === 'umd';
  const isDev = process.env.NODE_ENV === 'development';
  
  if (isUmd) {
    // UMD 构建配置
    return {
      build: {
        emptyOutDir: false,
        lib: {
          entry: resolve(__dirname, 'src/index.ts'),
          name: 'JSCommon',
          fileName: 'index',
          formats: ['umd']
        },
        sourcemap: false,
        minify: 'terser',
        terserOptions: {
          compress: {
            drop_console: !isDev,
            drop_debugger: !isDev
          }
        },
        rollupOptions: {
          external: [],
          output: {
            globals
          }
        }
      }
    };
  }
  
  // ESM 和 CJS 构建配置
  return {
    plugins: [
      dts({
        include: ['src/**/*'],
        exclude: ['src/**/*.test.ts', 'src/**/*.spec.ts'],
        rollupTypes: true,
        bundledPackages: ['lodash-es']
      })
    ],
    build: {
      lib: {
        entry: entries,
        formats: ['es', 'cjs'],
        fileName: (format, entryName) => {
          const ext = format === 'es' ? 'mjs' : 'cjs';
          return `${entryName}.${ext}`;
        }
      },
      sourcemap: isDev ? true : false,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: !isDev,
          drop_debugger: !isDev
        }
      },
      rollupOptions: {
        external,
        output: {
          preserveModules: false,
          exports: 'named'
        }
      }
    }
  };
});