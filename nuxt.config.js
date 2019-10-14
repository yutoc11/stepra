require("dotenv").config() //一番上に
const client = require("./plugins/contentful")

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
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/contentful',
    '~/plugins/markdownit',
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  router: {
    middleware: [
      'getContentful'
    ]
  },
  modules: [
    '@nuxtjs/dotenv',
    '@nuxtjs/markdownit',
    ['@nuxtjs/google-analytics', {
      id: 'UA-149861330-1'
    }],
  ],
  generate: {
    routes() {
      return client
        .getEntries({ content_type: 'post' })
        .then(entries => {
          return entries.items.map(entry => {
            return {
              route: "/posts/"+entry.fields.slug,
              payload: entry
            }
          })
        })
    },
    routes() {
      return client
        .getEntries({ content_type: 'category' })
        .then(entries => {
          return entries.items.map(entry => {
            return {
              route: "/category/"+entry.fields.slug,
              payload: entry
            }
          })
        })
    }
  },
  env: {
    CTF_SPACE_ID: process.env.CTF_SPACE_ID,
    CTF_ACCESS_TOKEN: process.env.CTF_ACCESS_TOKEN,
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },
  sitemap: {
    path: '/sitemap.xml',
    hostname: 'stepra',
    routes() {
      return client
      .getEntries({ content_type: 'post' })
      .then(entries => {
        return entries.items.map(entry => {
          return "/posts/" + entry.fields.slug
        })
      })
    }
    // generate: true,
  },
}
