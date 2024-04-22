import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  dts: true,
  splitting: true,
  sourcemap: true,
  clean: true,
})
