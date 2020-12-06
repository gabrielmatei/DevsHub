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
    '~/plugins/repositories.js'
  ],
  components: true,
  buildModules: [
    '@nuxtjs/eslint-module'
  ],
  modules: [
    '@nuxtjs/axios',
    'nuxt-i18n'
  ],
  axios: {
    baseURL: process.env.APi_BASE_URL || 'https://localhost:44300/api/'
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
