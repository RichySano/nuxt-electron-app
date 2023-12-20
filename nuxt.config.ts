import path from 'path'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  devtools: { enabled: true },
  modules: ['nuxt-electron'],
  experimental: {
    appManifest: false
  },
/*   devServer: {
    https: {
      key: path.resolve(__dirname, 'server.key'),
      cert: path.resolve(__dirname, 'server.crt')
    }
  }, */
  router: {
    options: {
      hashMode: true,
    },
  },
  extends: './electron',
  app: {
    baseURL: './'
  },
  nitro: {
    runtimeConfig: {
      app: {
        baseURL: './',
      }
    }    
  },
  vite: {
    build: {
      rollupOptions: {
        external: ['serialport']
      }
    }
  },
  electron: {
    build: [
      {
        entry: 'electron/main.ts',
      },
      {
        entry: 'electron/preload.ts',
        onstart(options) {
          options.reload()
        }
      },
    ],
    disableDefaultOptions: false
  }
})
