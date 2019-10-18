<template lang="pug">
  section.section
    posts-index(
      :posts="posts"
      :linkTo="linkTo")
</template>

<script>
import PostsIndex from '~/components/PostsIndex'
import client from '~/plugins/contentful'
import { mapState, mapGetters } from 'vuex'

export default {

  head: {
  },

  computed:{
    ...mapState(['posts']),
    ...mapState(['categories']),
    ...mapState(['tags']),
    ...mapGetters(['linkTo'])
  },

  components: {
    PostsIndex,
  },

  methods: {
  }
}
</script>

<style lang="scss">

</style>
