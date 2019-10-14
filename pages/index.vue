<template lang="pug">
  section.latest-posts
    .posts
      nuxt-link.post(:to="linkTo('posts', post)" v-for="(post, index) in posts" :key="index")
        .thumb
          img(:src="post.fields.image.fields.file.url")
        .post-text
          h3 {{ post.fields.title }}
</template>

<script>
import client from '~/plugins/contentful'
import { mapState, mapGetters } from 'vuex'

export default {

  head: {
    title: '記事一覧',
  },

  computed:{
    ...mapState(['posts']),
    ...mapGetters(['linkTo'])
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
section.latest-posts {
  padding: 10px;
  background: #F7F9F9;
  .posts {
    max-width: 900px;
    margin: 0 auto;
    padding: 10px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    a.post {
      width: calc(100% / 2 - 20px);
      @media (min-width: (768px)) {
        width: calc(100% / 3 - 20px);
      }
      border-radius: 3px;
      margin: 10px;
      padding:0 0 8px 0;
      background: #fff;
      text-decoration: none;
      color: #111;
      .thumb {
        width: 100%;
        padding-bottom: 50%;
        position: relative;
        overflow: hidden;
        img {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          max-width: 100%;
          border-radius: 3px;
        }
      }
      .post-text {
        // padding: 5px 10px 10px;
        h3 {
          margin:16px 16px 8px;
          width: fit-content;
          font-size: 18px;
        }
        p{
          color: #888C8B;
          font-size: 12px;
        }
      }
    }
    a.post:hover,img:hover{

    }
  }
}
</style>
