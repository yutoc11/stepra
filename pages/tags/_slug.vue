<template lang="pug">
  section.tag
    .tag-name
      h1 #
       | {{ tag.fields.name }}
    posts-index(
      :posts="relatedTagPosts"
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
    relatedTagPosts() {
      return this.$store.getters.relatedTagPosts(this.tag)
    }
  },

  async asyncData({ payload, store, params, error }) {
    const tag = payload || await store.state.tags.find(cat => cat.fields.slug === params.slug)

    if (tag) {
      return { tag }
    } else {
      return error({ statusCode: 400 })
    }
  }
}
</script>

<style lang="scss">

  .tag{

    background: #fff;

    .tag-name{
      background: #fff;
      border-radius: 3px;
      border: 1px solid #e6e6e6;
      color:#B0B3B2;
      max-width: 300px;
      padding: 4px 0;
      margin: 27px auto 27px;
      text-align: center;
    }

    h1{
      font-size: 14px;
    }

  }


</style>
