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
    dts: false,
    clean: false,
    sourcemap: false,
    minify: true,
  },
])
