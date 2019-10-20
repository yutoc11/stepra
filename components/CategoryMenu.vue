<template lang="pug">
  .category-menu-wrapper
    .category-menu
      nuxt-link.category-menu-item(
        :to="linkTo('categories', category)"
        v-for="(category, index) in categories"
        key="index") {{category.fields.name}}
</template>

<script>

export default {

  props:['categories','linkTo'],

  computed:{
  },

  methods: {
  }
}
</script>

<style lang="scss">
.category-menu-wrapper{

  //position: -webkit-sticky;
  //position: sticky;
  //top: 90px;
  white-space: nowrap;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  margin:0 auto;
  padding:4px;
  z-index: 10;
  background: #fff;
  border-bottom: 1px solid #e6e6e6;
  box-shadow: 0 0 1px rgba(34,34,34,.08);

  .category-menu{
    display: flex;
    flex-direction: row;
    flex-wrap:nowrap;
    justify-content:space-around;
    margin: 0 auto;
    min-width: 320px;
    max-width: 900px;
  }

  .category-menu-item{
    width:250px;
    margin-right: 10px;
    padding: 4px 9px;
    border-radius: 5px;
    text-align: center;
    color: #787C7B;
    font-weight: bold;
    font-size: 16px;
  }

  @media screen and (max-width: 480px) {

    .category-menu-wrapper{
      //top: 72px;
    }

    .category-menu{
      justify-content:flex-start;
    }

    .category-menu-item{
      width:auto;
      font-size: 14px;
    }
  }
}
</style>
