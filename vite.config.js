import { defineConfig, loadEnv, transformWithEsbuild } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [
      {
        name: 'treat-js-files-as-jsx',
        async transform(code, id) {
          if (!id.match(/src\/.*\.js$/)) return null
          return transformWithEsbuild(code, id, {
            loader: 'jsx',
            jsx: 'automatic',
          })
        },
      },
      react(),
    ],
    optimizeDeps: {
      force: true,
      esbuildOptions: {
        loader: {
          '.js': 'jsx',
        },
      },
    },
    resolve: {
      alias: {
        components: path.resolve(__dirname, './src/components'),
        context: path.resolve(__dirname, './src/context'),
        utils: path.resolve(__dirname, './src/utils'),
        assets: path.resolve(__dirname, './src/assets'),
        mocks: path.resolve(__dirname, './src/mocks'),
      },
    },
    define: {
      'process.env.REACT_APP_API_URL': JSON.stringify(
        env.REACT_APP_API_URL || 'https://api.themoviedb.org/3'
      ),
      'process.env.REACT_APP_IMAGE_URL': JSON.stringify(
        env.REACT_APP_IMAGE_URL || 'https://image.tmdb.org/t/p'
      ),
      'process.env.REACT_APP_AUTH_URL': JSON.stringify(
        env.REACT_APP_AUTH_URL || 'https://auth.service.com'
      ),
      'process.env.REACT_APP_API_KEY': JSON.stringify(
        env.REACT_APP_API_KEY || ''
      ),
      'process.env.NODE_ENV': JSON.stringify(mode),
    },
    server: {
      port: 3000,
    },
  }
})
