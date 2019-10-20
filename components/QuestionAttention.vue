<template lang="pug">
nuxt-link(to="/questions")
  .programming-question プログラミング診断はコチラ
</template>

<script>

export default {

  computed:{
  },

  methods: {
  }
}
</script>

<style lang="scss">
.programming-question{
  margin: 0 auto;
  text-align: center;
  padding:9px 0;
  background: #52B696;
  color: #fff;
  font-weight: bold;
  font-size:16px;
}

@media screen and (max-width: 480px) {
  .programming-question{
    font-size:14px;
  }
}
</style>
