<template lang="pug">
  section
    p 「今、どうするべき？」がわかる、プログラミング教育診断はこちらから
</template>

<script>
import PostsIndex from '~/components/PostsIndex'
import client from '~/plugins/contentful'
import { mapState, mapGetters } from 'vuex'

export default {

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
</style>
