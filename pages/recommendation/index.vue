<template lang="pug">
  section.stepra-content
    p へいへい
</template>

<script>
import PostsIndex from '~/components/PostsIndex'
import client from '~/plugins/contentful'
import { mapState, mapGetters } from 'vuex'
import programmingRecommend from '~/static/programmingRecommend.json'

export default {

  head: {
  },

  data () {
    return {
    };
  },

  asyncData ({ params }) {
    return {
    }
  },

  computed:{
    ...mapState(['posts']),
    ...mapState(['categories']),
    ...mapState(['tags']),
    //...mapState(['answersInterest']),
    //...mapState(['answersPersonality']),
    ...mapGetters(['linkTo']),
  },

  created: function(){

  },

  components: {
    PostsIndex,
  },

  methods: {

  }
}
</script>

<style lang="scss">
section{
  margin-top:0;
  padding-top:0;
  background: #fff;
}


//ここからスマホ
@media screen and (max-width: 480px) {

}


</style>
