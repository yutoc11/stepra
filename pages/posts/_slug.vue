<template lang="pug">
  article.article
    .content-wrapper
      .thumb
        img(:src="post.fields.image.fields.file.url")
      post-category(
        :post="post"
        :linkTo="linkTo"
        )
      h1.post-title {{ post.fields.title }}
      p.post-created-at {{ formatDate(post.sys.createdAt) }}
      .post-description(v-html="$md.render(post.fields.description)")
      .post-content(v-html="$md.render(post.fields.content)")
      post-tag(
        :post="post"
        :linkTo="linkTo"
        )
      //-ul.post-tags(v-if="post.fields.tags != undefined")
        li.tag-list(v-for="tag in post.fields.tags") #
          | {{ tag.fields.name }}
</template>

<script>
import PostCategory from '~/components/PostCategory'
import PostTag from '~/components/PostTag'

import { mapState, mapGetters } from 'vuex'

export default {

  computed:{
    ...mapState(['posts']),
    ...mapState(['categories']),
    ...mapState(['tags']),
    ...mapGetters(['linkTo'])
  },

  components: {
    PostCategory,
    PostTag,
  },

  async asyncData({ payload, store, params, error }) {
      const post = payload || await store.state.posts.find(post => post.fields.slug === params.slug)

      if (post) {
        return { post }
      } else {
        return error({ statusCode: 400 })
      }
    },

  head() {
    return {
      title: this.post.fields.title,
      meta: [
          { hid: 'description', name: 'description', content: this.post.fields.description },
          { hid: 'og:site_name', property: 'og:site_name', content: this.post.fields.title + ' | ステプラ' },
          { hid: 'og:type', property: 'og:type', content: 'website' },
          { hid: 'og:url', property: 'og:url', content: 'https://izm51.com/posts/' + this.post.fields.slug },
          { hid: 'og:title', property: 'og:title', content: this.post.fields.title },
          { hid: 'og:description', property: 'og:description', content: this.post.fields.description },
          { hid: 'og:image', property: 'og:image', content: this.post.fields.image.fields.file.url }
        ]
    }
  },
  mounted() {
    console.log(this.post)
  },
  methods: {
    formatDate(iso) {
      const date = new Date(iso)
      const yyyy = new String(date.getFullYear())
      const mm = new String(date.getMonth() + 1).padStart(2, "0")
      const dd = new String(date.getDate()).padStart(2, "0")
      return `${yyyy}.${mm}.${dd}`
    }
  }
}
</script>

<style lang="scss">
article.article {
  .content-wrapper {
    max-width: 620px;
    margin: 0 auto;
    padding:12px 12px 50px;
    .thumb{
      margin: 0 auto;
      width: 100%;
      img{
        width:100%;
      }
    }

    h2, h3 {
      margin: 16px 0;
    }
    h1.post-title {
      font-size: 32px;
      text-decoration: underline;
      margin: 48px 0 18px;
      text-decoration: none;
      line-height:1.5;
    }
    .table-of-contents {
      color: #888C8B;
      background-color: #F7F9F9;
      padding: 14px;
      margin: 36px 0;
      width: 100%;
      ul {
        padding-left:2px;
        list-style: none;
      }
      li {
        font-size:14px;
        padding:8px 0;
        border-bottom: 1px solid #E6E6E6;
        text-align: left;
      }
      li:first-child{
        padding:20px 0 8px 0;
      }
      li:last-child{
        border-bottom: none;
      }
      &:before {
        content: '▼ 目次';
        font-weight: bold;
        font-size: 14px;
      }
      a{
        color: #888C8B;
        text-decoration:none;
      }
      li:hover,a:hover{
        color: #000;
      }
    }
    .post-created-at{
      color: #D1D3D6;
      font-size: 12px;
    }
    .post-description{
      background-color: #F7F9F9;
      padding: 25px 36px;
      margin: 36px 0;
      line-height: 36px;
      font-size: 16px;
    }
    .post-content {
      h1 {
        font-size: 32px;
      }
      h2 {
          font-size: 24px;
          margin:50px 0 -18px;
        }
      p {
        margin: 36px 0;
        font-size: 16px;
      }
      img {
        max-width: 100%;
        border: 1px solid #000;
      }
      padding: 0 0 15px;
      position: relative;
      z-index: 1;
      > * {
        position: relative;
        z-index: 10; // h2のpadding部分より前面に来るように
      }
    }

    @media screen and (max-width: 480px) {
      h1.post-title {
        font-size: 24px;
      }

      .post-description{
        line-height: 27px;
        font-size: 16px;
      }
    }
  }
}
</style>
