<template lang="pug">
  section.category
    .category-name
      h1 {{ category.fields.name }}
    posts-index(
      :posts="relatedCategoryPosts"
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
    relatedCategoryPosts() {
      return this.$store.getters.relatedCategoryPosts(this.category)
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

    background: #fff;

    .category-name{
      background: #52B696;
      border-radius: 3px;
      color: #fff;
      max-width: 500px;
      padding: 9px 0;
      margin: 27px auto 27px;
      text-align: center;
    }

    h1{
      font-size: 20px;
      font-weight: bold;
    }

  }


</style>
