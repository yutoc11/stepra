<template lang="pug">
  section

    //-category-menu(
      :categories="categories"
      :linkTo="linkTo")

    question-attention

    .section
      .attention-message
        h2 ステプラでは、<br>「おうちの方へ役立つ」<br>プログラミング教育情報を発信
        p ※お役立ち記事は現在準備中です。
      nuxt-link(to="questions")
        .stepra-button.stepra-border-button プログラミング教育診断
      a(href="https://www.youtube.com/channel/UCLlLJ5ioNMqBXD14saGmHDA/" target="_blank")
        .stepra-button.youtube-button Youtube

    //-posts-index(
      :posts="posts"
      :linkTo="linkTo")
</template>

<script>
import PostsIndex from '~/components/PostsIndex'
import client from '~/plugins/contentful'
import { mapState, mapGetters } from 'vuex'

export default {
  //layout: 'home',

  head: {
  },

  data () {
    return {
    };
  },

  computed:{
    ...mapState(['posts']),
    ...mapState(['categories']),
    ...mapState(['tags']),
    ...mapGetters(['linkTo']),
  },

  components: {
    PostsIndex,
  },

  methods: {
  }
}
</script>

<style lang="scss">
section{
  margin-top:0;
  padding-top:0;
  background: #fff;
}

.attention-message{
  margin: 0 auto;
  max-width: 620px;
  text-align: center;
  h2{
    font-weight: bold;
    font-size: 1.1rem;
  }
  p{
    font-size: 0.9rem;
  }
}





</style>
