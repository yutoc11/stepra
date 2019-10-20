<template lang="pug">
  section

    category-menu(
      :categories="categories"
      :linkTo="linkTo")

    question-attention

    .section
      posts-index(
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




</style>
