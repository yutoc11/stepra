<template lang="pug">
  section
    .stepra-container
      .r-title-wrapper
        .r-title-bg
        h2.r-title お子様に合った、<br>プログラミング教育/教材
      .rectexts
        h1.title {{ rectext.fields.name }}
        .stepra-description(v-html="$md.render(rectext.fields.description)")
        .stepra-content(v-html="$md.render(rectext.fields.content)")
      //-nuxt-link(to="/")
        .stepra-button TOPへ
      .stepra-sub-button-wrapper.has-text-centered
        b-button(
          size="is-small"
          rounded
          has-addons
          is-centered
          )
          nuxt-link.text-gray(
            to="/questions"
            ) もう一度診断する
    //-.section
      .recs-contents
        h2 プログラミング教育ガイド
      posts-index(
        :posts="posts"
        :linkTo="linkTo")
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
  border: 2px solid #52B696;
  border-radius: 5px;
  letter-spacing:1.5px;
}

.r-title-bg{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-size:  100%;
}

.recs-contents{
  background-color: #F7F9F9;
  padding: 18px 0 0 0;
  margin: 0 auto;
  h2{
    margin: 0 auto;
    text-align: center;
    font-weight: bold;
    font-size: 1.2rem;
  }
}

//ここからスマホ
@media screen and (max-width: 480px) {

}


</style>
