export default {
  head: {
    title: 'DevsHub',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Oxygen&display=swap' }
    ]
  },
  css: [
    '@/assets/css/sanitize.css',
    '@/assets/css/main.css'
  ],
  plugins: [
    '~/plugins/axios.js',
    '~/plugins/repositories.js',
    '~/plugins/moment.js',
    { src: '~/plugins/loader', ssr: false },
    { src: '~/plugins/vue-datepicker', ssr: false }
  ],
  components: true,
  buildModules: [
    '@nuxtjs/eslint-module'
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    'nuxt-i18n'
  ],
  axios: {
    baseURL: process.env.APi_BASE_URL || 'https://localhost:44300/api/'
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: 'v1/account/login', method: 'post', propertyName: 'token' },
          user: { url: 'v1/account', method: 'get', propertyName: false },
          logout: false
        }
      }
    }
  },
  i18n: {
    locales: [
      { code: 'ro', iso: 'ro-RO', file: 'ro-RO.js' }
    ],
    lazy: true,
    langDir: 'lang/',
    defaultLocale: 'ro',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected'
    }
  },
  build: {
  }
}
