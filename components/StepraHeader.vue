<template lang="pug">
  .header-wrapper
   .header
      h1
        nuxt-link(to="/")
          img(src="~/assets/images/stepra_logo.png")
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
    padding: 18px 9px;
    background: #fff;
    display: flex;
    justify-content: space-between;


    img{
      max-width: 200px
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

    @media screen and (max-width: 480px) {


    }
  }
}


</style>
