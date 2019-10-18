<template lang="pug">
  .post-tag-wrapper(
    v-if="post.fields.tags != undefined"
  )
    ul.post-tags
      li.tag-list(v-for="uniquetag in post.fields.tags")
        nuxt-link.tag-link(:to="linkTo('tags', uniquetag)") #
          | {{ uniquetag.fields.name }}

</template>

<script>

export default {

  props:['post','linkTo'],

  computed:{
  },
}
</script>

<style lang="scss">

  .post-tags{
    padding: 0;
  }

  .post-tags{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .tag-list{
    font-size: 14px;
    display: inline-flex;
    padding: 4px 10px;
    margin-right: 5px;
    margin-bottom: 5px;
    border: 1px solid #e6e6e6;
    background: #fff;
    border-radius: 4px;
    cursor: pointer;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 100%;
    align-items: center;
  }
  .tag-list:hover{
    border: 1px solid #A7AAAA;
  }
  .tag-link{
    text-decoration:none;
    color:#B0B3B2;
  }
</style>
