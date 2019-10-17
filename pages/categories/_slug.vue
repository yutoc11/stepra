<template lang="pug">
  section.category
    .category-name
      h1 #
       | {{ category.fields.name }}
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

  .category{

    background: #F7F9F9;

    .category-name{
      background: #99E1D7;
      border-radius: 3px;
      color: #fff;
      max-width: 400px;
      padding: 9px 0;
      margin: 27px auto 12px;
      text-align: center;
    }

    h1{
      font-size: 20px;
    }

  }


</style>
