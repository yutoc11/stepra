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

    .q-wrapper
      .q-content-wrapper(v-if="questionTheme=='interest'")
        .q-start-wrapper(v-if="questionNumber==0")
          .question-message
            p １つめのテーマは、<br>お子様のITへの興味関心を探るご質問<br>（1/2）
          .q-start-button-wrapper
            .q-start-button(@click="startQuestion") スタート

        .question-wrapper(v-else-if="questions.length >= questionNumber")
          p.question-progress {{questionNumber}}
            |  /
            | {{questions.length}}
          p.question-content {{questionContents[questionNumber-1]}}

          //-.fuwafuwa_1.btn-circle(@click="shuzoClick" v-bind:class='{shuzoClass:isActiveType01}') しゅうぞう
          .choices-wrapper
            .choices
              .fuwafuwa_1.btn-circle(@click="choice01Click" v-bind:class='{choice01Class:isActiveChoice01}')
                .choice-content {{ choice01Content[questionNumber-1] }}
              .fuwafuwa_2.btn-circle(@click="choice02Click" v-bind:class='{choice02Class:isActiveChoice02}')
                .choice-content {{ choice02Content[questionNumber-1] }}
              .fuwafuwa_3.btn-circle(@click="choice03Click" v-bind:class='{choice03Class:isActiveChoice03}')
                .choice-content {{ choice03Content[questionNumber-1] }}
              .fuwafuwa_4.btn-circle(@click="choice04Click" v-bind:class='{choice04Class:isActiveChoice04}')
                .choice-content {{ choice04Content[questionNumber-1] }}

          .btn-pre-wrapper
            .section__btn--pre(v-if="questionNumber != 1" @click="preQuestion")
              b-icon(
                icon="chevron-left"
                size="is-large"
                )
          .btn-next-wrapper(v-if="choice != 0")
            .section__btn--next(v-if="questions.length != questionNumber" @click="nextQuestion")
              b-icon(
                icon="chevron-right"
                size="is-large"
                )
            .section__btn--next(v-else @click="changeQuestionTheme")
              b-icon(
                icon="chevron-right"
                size="is-large"
                )

      .q-content-wrapper(v-else-if="questionTheme=='personalityQuestion'")
        .q-start-wrapper(v-if="questionNumber==0")
          .question-message
            p 次のテーマは、<br>お子さまの普段の性格についてのご質問<br>（2/2）
          .q-start-button-wrapper
            .q-start-button(@click="startQuestion") 続ける
          .btn-pre-wrapper
            .section__btn--pre(@click="preQuestionTheme")
              b-icon(
                icon="chevron-left"
                size="is-large"
                )

        .question-wrapper(v-else-if="questions.length >= questionNumber")
          p.question-progress {{questionNumber}}
            |  /
            | {{questions.length}}
          p.question-content {{questionContents[questionNumber-1]}}

          .choices-wrapper
            .choices
              .fuwafuwa_1.btn-circle(@click="choice01Click" v-bind:class='{choice01Class:isActiveChoice01}')
                .choice-content {{ choice01Content[questionNumber-1] }}
              .fuwafuwa_2.btn-circle(@click="choice02Click" v-bind:class='{choice02Class:isActiveChoice02}')
                .choice-content {{ choice02Content[questionNumber-1] }}
              .fuwafuwa_3.btn-circle(@click="choice03Click" v-bind:class='{choice03Class:isActiveChoice03}')
                .choice-content {{ choice03Content[questionNumber-1] }}
              .fuwafuwa_4.btn-circle(@click="choice04Click" v-bind:class='{choice04Class:isActiveChoice04}')
                .choice-content {{ choice04Content[questionNumber-1] }}

          .btn-pre-wrapper
            .section__btn--pre(v-if="questionNumber != 1" @click="preQuestion")
              b-icon(
                icon="chevron-left"
                size="is-large"
                )
            .section__btn--pre(v-else @click="preQuestionTheme")
              b-icon(
                icon="chevron-left"
                size="is-large"
                )

          .btn-next-wrapper(v-if="choice != 0")
            .section__btn--next(v-if="questions.length != questionNumber" @click="nextQuestion")
              b-icon(
                icon="chevron-right"
                size="is-large"
                )
            .section__btn--calc(v-else @click="calcResult") 診断する

    .q-result-wrapper(v-if="result")
      p 結果画面だよ！
      button(@click="restartQuestion") もう一度


</template>

<script>
import PostsIndex from '~/components/PostsIndex'
import client from '~/plugins/contentful'
import { mapState, mapGetters } from 'vuex'

import interestQuestions from '~/static/interestQuestions.json'
import personalityQuestions from '~/static/personalityQuestions.json'

export default {

  head: {
  },

  data () {
    return {
       onGoing: false,
       questionNumber: 0,
       question:'',
       result: false,
       questionTheme: 'interest',
       questions:[],
       questionContents: [],
       choice:0,
       choice01Content : [],
       choice02Content : [],
       choice03Content : [],
       choice04Content : [],
       isActiveChoice01 : false,
       isActiveChoice02 : false,
       isActiveChoice03 : false,
       isActiveChoice04 : false,
       isActiveChoice05 : false,
       isActiveThemeInterest : false,
       isActiveThemePersonality : false,
       isActiveResult : false,
    };
  },

  asyncData ({ params }) {
    return {
      interestQuestions,
      personalityQuestions,
    }
  },

  computed:{
    ...mapState(['posts']),
    ...mapState(['categories']),
    ...mapState(['tags']),
    ...mapGetters(['linkTo']),
  },

  created: function(){

  },

  components: {
    PostsIndex,
  },

  methods: {

    setQuestions(){
      for(var i = 0 ; i < this.questions.length ; i++){

        //問題をセットする
        this.questionContents[i] = this.questions[i].q_description;

        //選択肢ををセットする
        this.choice01Content[i] = this.questions[i].q_choice_1;
        this.choice02Content[i] = this.questions[i].q_choice_2;
        this.choice03Content[i] = this.questions[i].q_choice_3;
        this.choice04Content[i] = this.questions[i].q_choice_4;
      }
    },

    resetChoices(){
      this.isActiveChoice01 = false;
      this.isActiveChoice02 = false;
      this.isActiveChoice03 = false;
      this.isActiveChoice04 = false;
      this.choice = 0;
    },

    startQuestion(){
      this.onGoing = true;
      this.questionNumber = 1;
      this.resetChoices();

      switch(this.questionTheme){
        case 'interest':
          this.questions = this.interestQuestions;
          this.isActiveThemeInterest = true;
          this.isActiveThemePersonality =  false;
          this.isActiveResult = false;
          break;
        case 'personalityQuestion':
          this.questions = this.personalityQuestions;
          this.isActiveThemeInterest = false;
          this.isActiveThemePersonality =  true;
          this.isActiveResult = false;
          break;
      }
      this.setQuestions();
    },

    nextQuestion(){
      if(this.questions.length > this.questionNumber){
        this.questionNumber += 1;
        this.resetChoices();
      }
    },

    preQuestion(){
      this.questionNumber -= 1;
      this.resetChoices();
    },

    preQuestionTheme(){
      this.questionTheme = 'interest'
      this.isActiveThemeInterest = true;
      this.isActiveThemePersonality =  false;
      this.isActiveResult = false;

      this.questions = this.interestQuestions;
      this.questionNumber = this.questions.length;
      this.setQuestions();

      this.resetChoices();
    },

    //-今は使っていない
    quitQuestion(){
      this.questionNumber = 0;
      this.question = ''
      this.isActiveThemeInterest = false;
      this.isActiveThemePersonality =  false;
      this.isActiveResult = false;
      this.onGoing = true;
      this.resetChoices();
    },

    changeQuestionTheme(){
      this.questionNumber = 0;
      this.questionTheme = 'personalityQuestion'
      this.isActiveThemeInterest = false;
      this.isActiveThemePersonality =  true;
      this.isActiveResult = false;
      this.resetChoices();
    },

    calcResult(){
      this.questionNumber += 1;
      this.isActiveThemeInterest = false;
      this.isActiveThemePersonality =  false;
      this.isActiveResult = true;
      this.result = true;
      this.onGoing = false;
      console.log(this.result)
      console.log('結果を算出中！')
      this.$nextTick(() => {
        console.log('描写なう')
      });
      this.resetChoices();
    },

    restartQuestion(){
      this.questionNumber = 0;
      this.result = false;
      this.questionTheme = 'interest'
      this.resetChoices();
    },

    choice01Click(){
      this.choice = (this.choice != 1) ? 1 : 0 ;
      this.isActiveChoice01 = !this.isActiveChoice01;
      this.isActiveChoice02 = false;
      this.isActiveChoice03 = false;
      this.isActiveChoice04 = false;
    },

    choice02Click(){
      this.choice = (this.choice != 2) ? 2 : 0 ;
      this.isActiveChoice01 = false;
      this.isActiveChoice02 = !this.isActiveChoice02;
      this.isActiveChoice03 = false;
      this.isActiveChoice04 = false;
    },
    choice03Click(){
      this.choice = (this.choice != 3) ? 3 : 0 ;
      this.isActiveChoice01 = false;
      this.isActiveChoice02 = false;
      this.isActiveChoice03 = !this.isActiveChoice03;
      this.isActiveChoice04 = false;
    },
    choice04Click(){
      this.choice = (this.choice != 4) ? 4 : 0 ;
      this.isActiveChoice01 = false;
      this.isActiveChoice02 = false;
      this.isActiveChoice03 = false;
      this.isActiveChoice04 = !this.isActiveChoice04;
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
  padding: 18px 0;
  font-weight: bold;
  color: #fff;
  z-index: 100;
  -webkit-text-stroke: 1px #fff;
  text-stroke: 1px #fff;
  letter-spacing:1.5px;
}

.q-title-bg{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-image: url('~assets/images/pc.png');
  background-repeat: no-repeat;
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

.q-result-wrapper,
.q-wrapper{
  width: 100%;
  margin: 0 auto;
  padding:18px 9px;
  text-align: center;
  color: #787C7B;
  font-weight: 500;
}


.question-message{
  padding:18px 9px;
}

.q-wrapper,q-result-wrapper{
  //background-image: url('~assets/images/cafe.jpg') ;
  background-repeat: no-repeat;
  background-size:  100%;
}

.q-start-button-wrapper{

  width: 140px;
  margin: 0 auto;
  text-align: center;

  .q-start-button{
    height: 140px;
    width: 140px;
    line-height: 140px;
    text-align: center;
    background-color: #52B696;
    border: 2px solid #fff;
    box-shadow: 0 0 3px #ccc;
    border-radius: 70px;
    color: #fff;
    font-weight: bold;
    cursor: pointer;
  }

  .q-start-button:hover{
    opacity: 0.8;
  }

}

.question-progress{
  margin-bottom: 18px;
}

.question-content{
  margin-bottom: 18px;
}

.question-wrapper{

}

.choices{
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  margin: 0 auto;
  padding: 9px;
  width:70%;

}

.btn-circle {
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: #fff;
  font-weight: bold;
  font-size: 1rem;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-image: linear-gradient(45deg, #709dff 0%, #91fdb7 100%);
  transition: .4s;
}

.choice-content{
  padding: 0 9px;
}

.btn-circle.choice01Class,
.btn-circle.choice02Class,
.btn-circle.choice03Class,
.btn-circle.choice04Class{
  background-image: none;
  background-color: #709dff;
}

.btn-circle:hover {
  cursor: pointer;
  opacity: 0.8;
}

.fuwafuwa_1 {
  animation: fuwafuwa_1 2.5s infinite;
}

.fuwafuwa_2{
  animation: fuwafuwa_2 4s infinite;
}

.fuwafuwa_3{
  animation: fuwafuwa_3 5s infinite;
}

.fuwafuwa_4{
  animation: fuwafuwa_4 3.5s infinite;
}


@keyframes fuwafuwa_1 {
  0% { transform:translateX(0px); }
  50% { transform:translateX(5px) translateY(5px); }
  100% { transform:translateX(  0px); }
}

@keyframes fuwafuwa_2 {
  0% { transform:translateY(0px); }
  50% { transform:translateY(5px); }
  100% { transform:translateY(  0px); }
}

@keyframes fuwafuwa_3 {
  0% { transform:translateY(0px); }
  50% { transform:translateY(5px) translateX(-5px); }
  100% { transform:translateY(  0px); }
}

@keyframes fuwafuwa_4 {
  0% { transform:translateY(0px); }
  50% { transform:translateY(-2px) translateX(-5px); }
  100% { transform:translateY(  0px); }
}

.v-enter{
  opacity: 0;
  transform: translateX(+100px);
}

.section__btn--pre,
.section__btn--next{
  position: fixed;
  width: 75px;
  height: 75px;
  line-height:75px;
  border: solid 3px white;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 0 5px rgba(0,0,0,0.4);
  cursor: pointer;
  top: 50vh;
}

.section__btn--pre:hover,
.section__btn--next:hover{
  box-shadow: 0 0 10px rgba(0,0,0,0.4);
}

.section__btn--pre{
  left: 50px;

  .icon{
    padding:30px 3px 0 0;
  }
}

.section__btn--next{
  right: 50px;

  .icon{
    padding:30px 0 0 3px;
  }
}

.section__btn--calc{
  position: fixed;
  bottom: 5%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 140px;
  width: 140px;
  line-height: 140px;
  text-align: center;
  background-color: #52B696;
  border: 2px solid #fff;
  box-shadow: 0 0 3px #ccc;
  border-radius: 70px;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
}

.section__btn--calc:hover{
  opacity: 0.8;
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
    -webkit-text-stroke: #fff;
    text-stroke: #fff;
  }

  .q-status-wrapper{
    background-position: 0 80%;
    padding-bottom: 0;
  }

  li{
    font-size: 11px;
  }

  .q-wrapper{
    padding: 0 9px;
  }

  .question-progress{
    margin: 4px 0;
    font-size: 0.7rem;
  }

  .question-content{
    font-size: 0.8rem;
    min-height: 40px;
    margin-bottom: 4px;
  }

  .choices{
    padding: 0 9px;
    width:100%;
  }

  .btn-circle {
    font-weight: bold;
    font-size: 0.75rem;
    width: 40vw;
    height: 40vw;
    border-radius: 50%;
    background-image: linear-gradient(45deg, #709dff 0%, #91fdb7 100%);
    transition: .4s;
    margin-bottom:9px;
  }

  .choice-content{
    padding: 0 9px;
  }

  .section__btn--pre,
  .section__btn--next{
    width: 50px;
    height: 50px;
    line-height:50px;
    top: 150vw;
  }

  .section__btn--pre:hover,
  .section__btn--next:hover{
    box-shadow: 0 0 10px rgba(0,0,0,0.4);
  }

  .section__btn--pre{
    left: 5px;

    .icon{
      padding:8px 8px 0 0;
    }
  }

  .section__btn--next{
    right: 5px;

    .icon{
      padding:8px 0 0 0;
    }
  }

}


</style>
