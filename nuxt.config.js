import EventService from './services/EventService.js'

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#39b982' },
  /*
   ** Global CSS
   */
  css: ['github-markdown-css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/markdownit'
  ],
  markdownit: {
    preset: 'default',
    linkify: true,
    breaks: true,
    use: ['markdown-it-div', 'markdown-it-attrs']
  },
  vuetify: {
    theme: {
      options: {
        customProperties: true
      },
      light: true,
      // Traditional chinese color 传统中国色
      // http://zhongguose.com/
      // Traditional nippon colors 传统日本色
      // https://nipponcolors.com/
      themes: {
        light: {
          primary: '#1781b5', // 釉蓝
          secondary: '#CA7853', // 远州茶
          tertiary: '#F17C67', // 珊瑚朱
          accent: '#5698c3', // 晴蓝
          error: '#ec2b24', // 秋海棠红
          info: '#2775b6', // 景泰蓝
          success: '#68b88e', // 田园绿
          warning: '#fecc11' // 向日葵黄
        }
      }
    }
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */

    transpile: ['vue-instantsearch', 'instantsearch.js/es'],
    extend(config, ctx) {}
  },
  generate: {
    routes: () => {
      return EventService.getEvents().then((response) => {
        return response.data.map((event) => {
          return '/event/' + event.id
        })
      })
    }
  }
}
