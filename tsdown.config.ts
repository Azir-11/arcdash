import { defineConfig } from 'tsdown'

export default defineConfig([
  {
    entry: './src/index.ts',
    outDir: './dist',
    format: ['cjs', 'esm'],
    dts: true,
    clean: true,
    sourcemap: true,
  },
  {
    entry: { arcdash: './src/index.ts' },
    outDir: './cdn',
    format: ['iife'],
    outExtensions: () => ({ js: '.js' }),
    globalName: 'arcdash',
    // CDN 产物需自包含，将运行时依赖（如 klona）一并打包，避免引用未定义的全局变量
    noExternal: [/^klona/],
    dts: false,
    clean: true,
    sourcemap: false,
    minify: false,
  },
  {
    entry: { arcdash: './src/index.ts' },
    outDir: './cdn',
    format: ['esm'],
    outExtensions: () => ({ js: '.esm.js' }),
    noExternal: [/^klona/],
    dts: false,
    clean: false,
    sourcemap: false,
    minify: false,
  },
  {
    entry: { arcdash: './src/index.ts' },
    outDir: './cdn',
    format: ['iife'],
    outExtensions: () => ({ js: '.min.js' }),
    globalName: 'arcdash',
    noExternal: [/^klona/],
    dts: false,
    clean: false,
    sourcemap: false,
    minify: true,
  },
])
