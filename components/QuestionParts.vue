<template lang="pug">
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
</template>

<script>

import interestQuestions from '~/static/interestQuestions.json'
import personalityQuestions from '~/static/personalityQuestions.json'

export default {

  props:['interestQuestions','personalityQuestions'],

  data () {
    return {
       onGoing: false,
       questionNumber: 0,
       question:'',
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
       answersInterest : [],
       answersPersonality : [],
       answersInterestPoints : [],
       answersPersonalityPoints : [],
    };
  },



  computed:{
  },

  methods: {

    //...mapActions(['answersInterest']),
    //...mapActions(['answersPersonality']),

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

    setAnswers(){
      const number = this.questionNumber-1;
      switch(this.questionTheme){
        case 'interest':
          this.answersInterest[number] = this.choice;
          switch(this.choice){
            case 1:
              this.answersInterestPoints[number] = this.questions[number].q_choice01_point;
              break;
            case 2:
              this.answersInterestPoints[number] = this.questions[number].q_choice02_point;
              break;
            case 3:
              this.answersInterestPoints[number] = this.questions[number].q_choice03_point;
              break;
            case 4:
              this.answersInterestPoints[number] = this.questions[number].q_choice04_point;
              break;
          }
          break;
        case 'personalityQuestion':
          this.answersPersonality[number] = this.choice;
          switch(this.choice){
            case 1:
              this.answersPersonalityPoints[number] = this.questions[number].q_choice01_point;
              break;
            case 2:
              this.answersPersonalityPoints[number] = this.questions[number].q_choice02_point;
              break;
            case 3:
              this.answersPersonalityPoints[number] = this.questions[number].q_choice03_point;
              break;
            case 4:
              this.answersPersonalityPoints[number] = this.questions[number].q_choice04_point;
              break;
          }
          break;
      }
    },

    resetChoices(){
      this.isActiveChoice01 = false;
      this.isActiveChoice02 = false;
      this.isActiveChoice03 = false;
      this.isActiveChoice04 = false;
      this.choice = 0;
    },

    resetAnswers(){
      this.answersInterest = [];
      this.answersPersonality = [];
      this.answersInterestPoints = [];
      this.answersPersonalityPoints = [];
    },

    startQuestion(){
      this.onGoing = true;
      this.questionNumber = 1;
      this.resetChoices();
      this.resetChoices();

      switch(this.questionTheme){
        case 'interest':
          this.questions = this.interestQuestions;
          this.$parent.isActiveThemeInterest = true;
          this.$parent.isActiveThemePersonality =  false;
          this.$parent.isActiveResult = false;
          break;
        case 'personalityQuestion':
          this.questions = this.personalityQuestions;
          this.$parent.isActiveThemeInterest = false;
          this.$parent.isActiveThemePersonality =  true;
          this.$parent.isActiveResult = false;
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
      this.$parent.isActiveThemeInterest = true;
      this.$parent.isActiveThemePersonality =  false;
      this.$parent.isActiveResult = false;

      this.questions = this.interestQuestions;
      this.questionNumber = this.questions.length;
      this.setQuestions();

      this.resetChoices();
    },

    //-今は使っていない
    quitQuestion(){
      this.questionNumber = 0;
      this.question = ''
      this.$parent.isActiveThemeInterest = false;
      this.$parent.isActiveThemePersonality =  false;
      this.$parent.isActiveResult = false;
      this.onGoing = true;
      this.resetChoices();
      this.resetAnswers();
    },

    changeQuestionTheme(){
      this.questionNumber = 0;
      this.questionTheme = 'personalityQuestion'
      this.$parent.isActiveThemeInterest = false;
      this.$parent.isActiveThemePersonality =  true;
      this.$parent.isActiveResult = false;
      this.resetChoices();
    },

    calcResult(){
      this.questionNumber += 1;
      this.$parent.isActiveThemeInterest = false;
      this.$parent.isActiveThemePersonality =  false;
      this.$parent.isActiveResult = true;
      this.$parent.result = true;
      this.onGoing = false;
      this.resetChoices();

      let arrayInterestPoints = this.answersInterestPoints;
      let arrayPersonalityPoints = this.answersPersonalityPoints;
      let sumInterestPoints = arrayInterestPoints.reduce((a,x) => a+=x,0);
      let sumPersonalityPoints = arrayPersonalityPoints.reduce((a,x) => a+=x,0);
      console.log('とりあえず回ってる');
      console.log(sumInterestPoints);
      console.log(sumPersonalityPoints);


      console.log(this.$parent.result);
      console.log('結果を算出中！');
      this.$nextTick(() => {
        console.log('描写なう')
        //let width = this.$refs.infoBox.clientWidth;
        //let height = this.$refs.infoBox.clientHeight;

        //直書きだから早く直す -40 ~ 40 の幅を、0~80×幅に変えている
        let moveXpercent = ( sumInterestPoints + 40 ) / 80 * 100;
        let moveYpercent = ( sumPersonalityPoints + 60 ) / 120 * 100;

        this.$parent.resultPosition['left'] = `calc(${moveXpercent}% - 15px)`;
        this.$parent.resultPosition['top'] = `calc(${moveYpercent}% - 15px)`;
        console.log(this.$parent.resultPosition['left']);
        console.log(this.$parent.resultPosition['top']);
      });

    },

    restartQuestion(){
      this.questionNumber = 0;
      this.result = false;
      this.questionTheme = 'interest'
      this.resetChoices();
      this.isActiveResult = false;
      this.result = false;
    },

    choice01Click(){
      this.choice = (this.choice != 1) ? 1 : 0 ;
      this.isActiveChoice01 = !this.isActiveChoice01;
      this.isActiveChoice02 = false;
      this.isActiveChoice03 = false;
      this.isActiveChoice04 = false;
      this.setAnswers();
    },

    choice02Click(){
      this.choice = (this.choice != 2) ? 2 : 0 ;
      this.isActiveChoice01 = false;
      this.isActiveChoice02 = !this.isActiveChoice02;
      this.isActiveChoice03 = false;
      this.isActiveChoice04 = false;
      this.setAnswers();
    },
    choice03Click(){
      this.choice = (this.choice != 3) ? 3 : 0 ;
      this.isActiveChoice01 = false;
      this.isActiveChoice02 = false;
      this.isActiveChoice03 = !this.isActiveChoice03;
      this.isActiveChoice04 = false;
      this.setAnswers();
    },
    choice04Click(){
      this.choice = (this.choice != 4) ? 4 : 0 ;
      this.isActiveChoice01 = false;
      this.isActiveChoice02 = false;
      this.isActiveChoice03 = false;
      this.isActiveChoice04 = !this.isActiveChoice04;
      this.setAnswers();
    },
  }
}
</script>

<style lang="scss">



</style>
