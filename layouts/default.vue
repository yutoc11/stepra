<template lang="pug">
  .app
    stepra-header

    nuxt/

    stepra-footer
</template>

<style lang="scss">
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  background: #fff;
  color: #4a4a4a;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.stepra-container{
  max-width: 620px;
  margin: 0 auto;
  padding:0 50px;
}

.thumb{
  margin: 0 auto;
  width: 100%;
  img{
    width:100%;
  }
}

.stepra-description{
  background-color: #F7F9F9;
  padding: 25px 36px;
  margin: 36px 0;
  line-height: 36px;
  font-size: 16px;
}

h1,h2,h3,h4{
  font-weight: normal;
}

h2, h3 {
  margin: 16px 0;
}

h1.title {
  font-size: 32px;
  text-decoration: underline;
  margin: 48px 0 18px;
  text-decoration: none;
  line-height:1.5;
}

.stepra-content {
  max-width: 620px;
  margin: 0 auto;
  padding:12px 12px 50px;
  // color: #4a4a4a;
  font-weight: normal;
  h1 {
    font-size: 32px;
  }
  h2 {
      font-size: 24px;
      margin:50px 0 0;
    }
  p {
    margin: 36px 0;
    font-size: 16px;
  }
  img {
    max-width: 100%;
    border: 1px solid #000;
  }
  padding: 0 0 15px;
  position: relative;
  z-index: 1;
  > * {
    position: relative;
    z-index: 10; // h2のpadding部分より前面に来るように
  }
}

@media screen and (max-width: 480px) {
  h1.title {
    font-size: 24px;
  }
}
</style>
