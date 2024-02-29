import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  build: {
    minify: true,
    target: 'esnext',
    rollupOptions: {
      treeshake: true,
      output: {
        manualChunks(path) {
          if (path.includes('node_modules')) return 'vendor'
        },
      },
    },
  },
  plugins: [
    solid(),
    tsconfigPaths(),
  ],
})
