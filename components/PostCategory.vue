<template lang="pug">
  .post-category-wrapper(
    v-if="post.fields.category != undefined"
  )
    nuxt-link(:to="linkTo('categories', post.fields.category)")
      .post-category {{ post.fields.category.fields.name }}
</template>

<script>

export default {

  props:['post','linkTo'],

  computed:{
  },
}
</script>

<style lang="scss">

  .post-category{
    text-align: center;
    padding: 4px;
    margin: 0 auto;
    background-color: #99E1D7;
    border-radius: 5px;
    color: #fff;
    font-weight: bold;
    font-size: 14px;

  }

  .post-category-wrapper{
    a{
      text-decoration: none;
    }
  }
</style>
