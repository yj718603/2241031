import i18n from "./plugins/i18n.js"

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'translator-app',
    htmlAttrs: {
      lang: 'en',
      "data-theme": "light"
    },
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''},
      {name: 'format-detection', content: 'telephone=no'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "element-ui/lib/theme-chalk/index.css",
    "animate.css/animate.min.css",
    "~/assets/iconfont/iconfont.css",
    "~/assets/main.css"
  ],
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    //ElementUI插件
    {src: "~/plugins/ElementUI"},
    {src: "~/plugins/Filters", ssr: false},
    {src: "~/plugins/axios", ssr: false},
    {src: '~/plugins/vue-toasted', ssr: false}
  ],
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],
  // Modules: https://go.nuxtjs.dev/config-modules
  ssr: true,
  target: 'server',
  modules: [
    '@nuxtjs/tailwindcss',
    'cookie-universal-nuxt',
    "@nuxtjs/axios",
    ["@nuxtjs/i18n", i18n]
  ],
  axios: {},
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    //防止elementui打包多次
    transpile: [/^element-ui/]
  }
}
