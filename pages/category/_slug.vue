<template lang="pug">
  section.section
    h1 {{ category.fields.name }}
    posts-index(
      :posts="relatedPosts"
      :linkTo="linkTo")
</template>

<script>
import PostsIndex from '~/components/PostsIndex'
import { mapState, mapGetters } from 'vuex'
export default {

  components: {
    PostsIndex,
  },

  computed: {
    ...mapGetters(['linkTo']),
    relatedPosts() {
      return this.$store.getters.relatedPosts(this.category)
    }
  },

  async asyncData({ payload, store, params, error }) {
    const category = payload || await store.state.categories.find(cat => cat.fields.slug === params.slug)

    if (category) {
      return { category }
    } else {
      return error({ statusCode: 400 })
    }
  }
}
</script>

<style lang="scss">
</style>
