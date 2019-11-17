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

import { mapActions, mapState, mapGetters } from 'vuex'

export default {

  props:['interestQuestions','personalityQuestions','questionResults'],

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
    ...mapState(['resultType']),
    ...mapState(['resultInterestLv']),
    ...mapState(['resultPersonalityLv']),
    ...mapState(['recType']),
  },

  methods: {

    ...mapActions(['setResultType']),
    ...mapActions(['setResultInterestLv']),
    ...mapActions(['setResultPersonalityLv']),
    ...mapActions(['setRecType']),

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

    calcRecType(pLv,iLv){
      let recType = '';
      switch (pLv) {
        case 1:
          switch (iLv) {
            case 1:
              recType = 'type1';
              break;
            case 2:
              recType = 'type2';
              break;
            case 3:
              recType = 'type3';
              break;
            case 4:
              recType = 'type4';
              break;
          }
          this.setRecType(recType);
          break;
        case 2:
          switch (iLv) {
            case 1:
              recType = 'type5';
              break;
            case 2:
              recType = 'type6';
              break;
            case 3:
              recType = 'type7';
              break;
            case 4:
              recType = 'type8';
              break;
          }
          this.setRecType(recType);
          break;
        case 3:
          switch (iLv) {
            case 1:
              recType = 'type9';
              break;
            case 2:
              recType = 'type10';
              break;
            case 3:
              recType = 'type11';
              break;
            case 4:
              recType = 'type12';
              break;
          }
          this.setRecType(recType);
          break;
        case 4:
          switch (iLv) {
            case 1:
              recType = 'type13';
              break;
            case 2:
              recType = 'type14';
              break;
            case 3:
              recType = 'type15';
              break;
            case 4:
              recType = 'type16';
              break;
          }
          this.setRecType(recType);
          break;
      }
    },

    calcResult(){
      this.questionNumber += 1;
      this.$parent.isActiveThemeInterest = false;
      this.$parent.isActiveThemePersonality =  false;
      this.$parent.isActiveResult = true;
      this.$parent.result = true;
      this.$parent.resultTheme = 'child';
      this.onGoing = false;
      this.resetChoices();

      let arrayInterestPoints = this.answersInterestPoints;
      let arrayPersonalityPoints = this.answersPersonalityPoints;
      let sumInterestPoints = arrayInterestPoints.reduce((a,x) => a+=x,0);
      let sumPersonalityPoints = arrayPersonalityPoints.reduce((a,x) => a+=x,0);

      //直書きだから早く直す -40 ~ 40 の幅を、0~80×幅、のように変えている
      let moveXpercent = ( sumInterestPoints + 40 ) / 80 * 100;
      let moveYpercent = ( sumPersonalityPoints + 60 ) / 120 * 100;

      // 興味関心の結果コメントをセット
      if( moveXpercent <= 25 ){
        this.$parent.interestResultComment = this.questionResults[0].lv_1;
        this.setResultInterestLv(1);
      }else if ( moveXpercent <= 50 ){
        this.$parent.interestResultComment = this.questionResults[0].lv_2;
        this.setResultInterestLv(2);
      }else if ( moveXpercent <= 75 ){
        this.$parent.interestResultComment = this.questionResults[0].lv_3;
        this.setResultInterestLv(3);
      }else if ( moveXpercent > 75 ){
        this.$parent.interestResultComment = this.questionResults[0].lv_4;
        this.setResultInterestLv(4);
      }
      console.log(this.$parent.interestResultComment);
      console.log(this.$store.state.resultInterestLv);

      // 性格の結果コメントをセット
      if( moveYpercent <= 25 ){
        this.$parent.personalityResultComment = this.questionResults[1].lv_1;
        this.setResultPersonalityLv(1);
      }else if ( moveYpercent <= 50 ){
        this.$parent.personalityResultComment = this.questionResults[1].lv_2;
        this.setResultPersonalityLv(2);
      }else if ( moveYpercent <= 75 ){
        this.$parent.personalityResultComment = this.questionResults[1].lv_3;
        this.setResultPersonalityLv(3);
      }else if ( moveYpercent > 75 ){
        this.$parent.personalityResultComment = this.questionResults[1].lv_4;
        this.setResultPersonalityLv(4);
      }
      console.log(this.$parent.personalityResultComment);
      console.log(this.$store.state.resultPersonalityLv);

      //どの象限にいるか
      if( moveXpercent > 50 && moveYpercent <= 50 ){
        // 第一象限の場合
        this.setResultType(1);
      }else if ( moveXpercent <= 50 && moveYpercent <=50 ) {
        // 第二象限の場合
        this.setResultType(2);
      }else if ( moveXpercent <= 50 && moveYpercent > 50 ) {
        // 第三象限の場合
        this.setResultType(3);
      }else{
        // 第四象限の場合
        this.setResultType(4);
      }

      console.log(this.$store.state.resultType);

      // 結果タイプの計算
      const pLv = this.$store.state.resultPersonalityLv;
      const iLv = this.$store.state.resultPersonalityLv;
      this.calcRecType(pLv,iLv);
      console.log(this.$store.state.recType)

      this.$nextTick(() => {
        this.$parent.resultPosition['left'] = `calc(${moveXpercent}% - 15px)`;
        this.$parent.resultPosition['top'] = `calc(${moveYpercent}% - 15px)`;
      });
    },
  }
}
</script>

<style lang="scss">
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
  p{
    margin: 9px 0;
  }
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
p.question-content,
p.question-progress{
  margin: 4px 0;
  font-size: 1.1rem;
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
  margin-bottom: 9px;
  color: #fff;
  font-weight: bold;
  font-size: 1rem;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background-image: linear-gradient(45deg, #709dff 0%, #91fdb7 100%);
  transition: .4s;
}

.choice-content{
  padding: 0 9px;
  font-size: 14px;
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
  position: absolute;
  width: 75px;
  height: 75px;
  line-height:75px;
  border: solid 3px white;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 0 5px rgba(0,0,0,0.4);
  cursor: pointer;
  top: calc(50% - 9px);
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

// タブレット
@media screen and (max-width: 620px) {

  .question-message,
  p.question-content,
  p.question-progress{
    font-size: 0.8rem;
  }

  .choice-content{
    font-size: 14px;
  }

  .btn-circle {
    width: 150px;
    height: 150px;
  }

  .section__btn--pre,
  .section__btn--next{
    width: 50px;
    height: 50px;
    line-height:50px;
  }

  .section__btn--pre:hover,
  .section__btn--next:hover{
    box-shadow: 0 0 10px rgba(0,0,0,0.4);
  }

  .section__btn--pre{
    left: 20px;

    .icon{
      padding:8px 8px 0 0;
    }
  }

  .section__btn--next{
    right: 20px;

    .icon{
      padding:8px 0 0 0;
    }
  }

}

//ここからスマホ
@media screen and (max-width: 480px) {

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
  }

  .choice-content{
    padding: 0 9px;
    font-size: 4vw;
  }

  .section__btn--pre,
  .section__btn--next{
    width: 50px;
    height: 50px;
    line-height:50px;
    top: 95vw;
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
