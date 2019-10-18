<template lang="pug">
  .header-wrapper
   .header
      h1
        nuxt-link(to="/")
          img(src="~/assets/images/stepra_logo.png")
      b-field.search-wrapper
        b-input.search-input(
          placeholder="記事を検索"
          type="search"
          icon="magnify"
          rounded
          )
      //-ul.menu
        li メニュー
</template>

<style lang="scss">
.header-wrapper{

  position: -webkit-sticky;
  position: sticky;
  top: 0;
  background: #fff;
  border-bottom: 1px solid #e6e6e6;
  box-shadow: 0 0 1px rgba(34,34,34,.08);
  z-index: 10;

  .header{

    max-width: 940px;
    margin: 0 auto;
    padding: 12px 5px 6px 5px;
    background: #fff;
    display: flex;
    justify-content: space-between;


    img{
      max-width: 220px;
    }
  }
  .menu {
    list-style: none;
    padding: 0;
    background-color: #EEE;

    li{
      display: inline-block;
      padding: 5px;
    }
  }

  .search-wrapper{
    margin: auto 0;
    padding: 0 15px 5px 0;
    .search-input{
    }
  }

  @media screen and (max-width: 480px) {

    .header{
      padding: 12px 5px 6px 0px;
    }

    img{
      width: 160px;
    }

    .search-wrapper{
      max-width: 175px;
    }


  }
}


</style>
