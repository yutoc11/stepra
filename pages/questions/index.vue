<template lang="pug">
  section
    .q-title-wrapper
      .q-title-bg
      h2.q-title 「今、どうするべき？」がわかる、<br>プログラミング教育診断
    .q-status-wrapper
      nav.nav
        ol.nav-list
          li.nav-interest(v-bind:class='{navSelectedThemeInterest:isActiveThemeInterest}') 興味関心<br>について
          li.nav-personality(v-bind:class='{navSelectedThemePersonality:isActiveThemePersonality}') 性格<br>について
          li.nav-result(v-bind:class='{navSelectedResult:isActiveResult}') 診断結果<br>の発表

    question-parts(
      :interestQuestions = "interestQuestions"
      :personalityQuestions = "personalityQuestions"
      :questionResults = "questionResults"
      )

    .q-result-wrapper.stepra-content(v-if="result")
      h2.result-title.result-mapping-title お子様の診断結果は・・・
      .result-mapping-wrapper
        .result-mapping-child
          img(src="~/assets/images/mapping_child.png")
        .dot(v-bind:style="resultPosition")
      .result-child-wrapper
        .result-interest
          h2.result-title ITへの興味関心
          p {{ interestResultComment }}
        .result-personality
          h2.result-title 性格の傾向
          p {{ personalityResultComment }}
      //-.result-school-wrapper
        .result-school
          h2.result-title おすすめのプログラミング教育との向き合い方
          p お子さまの向いているスクールはこういうところですね。
      nuxt-link(:to="`recs/${$store.state.recType}`")
        .next-result-button おすすめのプログラミング<br>教材/教室をみる
      .retry-button-wrapper.has-text-centered
        b-button(
          @click="restartQuestion"
          size="is-small"
          rounded
          has-addons
          is-centered
          ) もう一度
</template>

<script>
import PostsIndex from '~/components/PostsIndex'
import QuestionParts from '~/components/QuestionParts'
import client from '~/plugins/contentful'
import { mapState, mapGetters } from 'vuex'
import interestQuestions from '~/static/interestQuestions.json'
import personalityQuestions from '~/static/personalityQuestions.json'
import questionResults from '~/static/questionResults.json'
import programmingRecommend from '~/static/programmingRecommend.json'

export default {

  head: {
  },

  data () {
    return {
       result: false,
       isActiveThemeInterest : false,
       isActiveThemePersonality : false,
       isActiveResult : false,
       interestResultComment : '',
       personalityResultComment : '',
       resultPosition : {
         'top': 'calc(50% - 15px)',
         'left': 'calc(50% - 15px)',
         },
    };
  },

  asyncData ({ params }) {
    return {
      interestQuestions,
      personalityQuestions,
      questionResults,
      programmingRecommend,
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

  components: {
    PostsIndex,
    QuestionParts,
  },

  methods: {

    restartQuestion(){
      this.$router.go({path: this.$router.currentRoute.path, force: true})
    },

  }
}
</script>

<style lang="scss">
section{
  margin-top:0;
  padding-top:0;
  background: #fff;
}

.q-title-wrapper{
  position:relative;
}

h2.q-title{
  position:relative;
  text-align:center;
  padding: 9px 0;
  margin: 0;
  font-weight: bold;
  color: #fff;
  z-index: 100;
  letter-spacing:1.5px;
}

.q-title-bg{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  //background-image: url('~assets/images/pc.png');
  //background-repeat: no-repeat;
  background-color: #52B696;
  background-size:  100%;
  //opacity: 0.4;
  z-index: 10;
}

.q-status-wrapper{
  padding: 9px 0;
  background-image: url('~assets/images/line.png') ;
  background-repeat: no-repeat;
  background-position: 0 76%;
  background-size:  100% 4%;
}

ol,li{
  list-style: none;
}

ol{
  display: flex;
  align-items: center;
  flex-flow: row wrap;
  justify-content: space-around;
  box-sizing: content-box;
  width: 100%;
}

li{
  display: list-item;
  font-size: 14px;
  text-align: center;
}

.nav__state--type{

}

li.navSelectedThemeInterest,
li.navSelectedThemePersonality,
li.navSelectedResult{
  color: #52B696;
  font-weight: bold;
}

.navSelectedThemeInterest::after,
.navSelectedThemePersonality::after,
.navSelectedResult::after{
  background-color:#52B696!important;
  border: solid 1px #52B696!important;
}

.nav-interest::after,
.nav-personality::after,
.nav-result::after{
  box-sizing: border-box;
  display: block;
  margin: 5px auto;
  border: solid 1px #000;
  border-radius: 50%;
  width: 15px;
  height: 15px;
  content: "";
  background-color: white;
}

.select{

}

.q-result-wrapper{
  width: 100%;
  margin: 0 auto;
  padding: 9px 9px;
  text-align: left;
  color: #787C7B;
}

.result-title{
  font-size: 1rem;
  margin-bottom: 9px;
}

.result-title.result-mapping-title{
  text-align: center;
  font-size: 1.2rem;
  margin-top: 0;
}

.result-mapping-wrapper{
  position: relative;
  width: 100%;
  margin: 18px auto;
  .dot{
    position: absolute;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-image: linear-gradient(45deg, #709dff 0%, #91fdb7 100%);
  }
}

.next-result-button{
  font-size: 14px;
  padding: 4px 10px;
  margin: 18px auto;
  border: 1px solid #e6e6e6;
  background: #52B696;
  color: #fff;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
  width: 300px;
  align-items: center;
  text-align: center;
}

.next-result-button:hover{
  opacity:0.7;
}

.retry-button-wrapper{
  .button{
    color: #B0B3B2;
    font-size: 0.7rem;
  }
}


//ここからスマホ
@media screen and (max-width: 480px) {

  .q-title{
    font-size: 14px;
  }

  .question-message{
    font-size: 14px;
  }

  h2.q-title{
    padding: 9px 0;
    font-weight: bold;
    font-size:14px;
  }

  .q-status-wrapper{
    background-position: 0 80%;
    padding-bottom: 0;
  }

  li{
    font-size: 11px;
  }

  .next-result-button{
    width: 90%;
  }

}


</style>
