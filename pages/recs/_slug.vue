<template lang="pug">
  section.stepra-content
    .r-title-wrapper
      .r-title-bg
      h2.r-title お子様に合った、<br>プログラミング教育/教材
    p {{ $store.state.resultPersonalityLv }}
    p {{ $store.state.resultInterestLv }}
    .rectexts
      p {{rectext.fields.name}}
      p {{rectext.fields.description}}
      p {{rectext.fields.content}}
      p {{rectext}}
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

  async asyncData({ payload, store, params, error }) {
      const rectext = payload || await store.state.rectexts.find(rectext => rectext.fields.slug === params.slug)

      if (rectext) {
        return { rectext }
      } else {
        return error({ statusCode: 400 })
      }
    },

  computed:{
    ...mapState(['posts']),
    ...mapState(['categories']),
    ...mapState(['tags']),
    ...mapState(['rectexts']),
    //...mapState(['answersInterest']),
    //...mapState(['answersPersonality']),
    ...mapGetters(['linkTo']),
    foryourRectext() {
      return this.$store.getters.foryourRectext(this.$store.state.resultInterestLv,this.$store.state.resultPersonalityLv)
    }
  },

  created: function(){

  },

  mounted: function(){
    console.log('mountedなう')
    console.log(this.$store.state.rectexts)
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

.r-title-wrapper{
  position:relative;
}

h2.r-title{
  position:relative;
  text-align:center;
  padding: 9px 0;
  margin: 0;
  font-weight: bold;
  color: #fff;
  z-index: 100;
  letter-spacing:1.5px;
}

.r-title-bg{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #52B696;
  background-size:  100%;
  z-index: 10;
}


//ここからスマホ
@media screen and (max-width: 480px) {

}


</style>
