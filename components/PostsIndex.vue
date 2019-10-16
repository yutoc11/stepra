<template lang="pug">
  .posts-index
    .posts
      nuxt-link.post(:to="linkTo('posts', post)" v-for="(post, index) in posts" :key="index")
        .thumb
          img(:src="post.fields.image.fields.file.url")
        .post-text
          h3 {{ post.fields.title }}
</template>

<script>

export default {

  props:['posts','linkTo'],

  computed:{
  },

  methods: {
  }
}
</script>

<style lang="scss">
.posts-index {
  padding: 6px;
  background: #F7F9F9;
  .posts {
    max-width: 900px;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    a.post {
      width: calc(100% / 2 - 20px);
      @media (min-width: (768px)) {
        width: calc(100% / 3 - 20px);
      }
      @media (max-width: (480px)) {
        width: calc(100% - 6px);
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
        h3 {
          margin:16px 16px 8px;
          width: fit-content;
          font-size: 18px;
        }
      }
    }
    a.post:hover,img:hover{

    }
  }

  @media screen and (max-width: 480px) {
    .posts{
      a.post {
        .post-text {
          h3 {
            margin:16px 16px 8px;
            font-size: 16px;
          }
        }
      }
    }
  }

}
</style>
