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
    '~/assets/css/buefy.scss',
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/contentful',
    '~/plugins/markdownit',
    '~/plugins/components',
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
    ['nuxt-buefy', {
      css: false,
      // materialDesignIcons: false
    }],
  ],
  generate: {
    routes() {
      return Promise.all([
        client.getEntries({
          content_type: 'post'
        }),
        client.getEntries({        							// 追記
          content_type: 'category'
        }),
        client.getEntries({        							// 追記
          content_type: 'tag'
        }),
        client.getEntries({        							// 追記
          content_type: 'rectext'
        }),
      ]).then(([posts,categories,tags,rectexts]) => {        // 追記
        return [
          ...posts.items.map((post) => {
            return { route: `posts/${post.fields.slug}`, payload: post }
          }),
          ...categories.items.map((category) => {        // 追記
            return { route: `categories/${category.fields.slug}`, payload: category }
          }),
          ...tags.items.map((tag) => {        // 追記
            return { route: `tags/${tag.fields.slug}`, payload: tag }
          }),
          ...rextexts.items.map((rectext) => {        // 追記
            return { route: `rectexts/${rectext.fields.slug}`, payload: rectext }
          }),
        ]
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
