<template lang="pug">
  section.section
    .q-wrapper
      .q-start-wrapper(v-if="questionNumber==0")
        .question-message
          p 「今、どうするべき？」がわかる、<br>プログラミング教育診断はこちらから
        .q-start-button-wrapper
          .q-start-button(@click="startQuestion") START

      .question-wrapper(v-else-if="questionNumber == 1")
        p {{questionNumber}}
          | 問目の質問
        p {{question}}

        button(@click="nextQuestion") 次の質問へ
        button(@click="quitQuestion") やめる

      .question-wrapper(v-else-if="questionsProgrammingKnowledge.length > questionNumber")
        p {{questionNumber}}
          | 問目の質問
        p {{question}}

        button(@click="nextQuestion") 次の質問へ
        button(@click="preQuestion") 前の質問へ
        button(@click="startQuestion") はじめから
        button(@click="quitQuestion") やめる

      .question-wrapper(v-else-if="questionsProgrammingKnowledge.length == questionNumber")
        p 最後の質問
        p {{question}}

        button(@click="calcResult") 結果画面へ
        button(@click="preQuestion") 前の質問へ
        button(@click="startQuestion") はじめから
        button(@click="quitQuestion") やめる
    .result-wrapper(v-if="result")
      p 結果画面だよ！
      button(@click="restartQuestion") もう一度
</template>

<script>
import PostsIndex from '~/components/PostsIndex'
import client from '~/plugins/contentful'
import { mapState, mapGetters } from 'vuex'

import questionsProgrammingKnowledge from '~/static/questionsProgrammingKnowledge.json'

export default {

  head: {
  },

  data () {
    return {
       onGoing: false,
       questionNumber: 0,
       question:'',
       result: false,
    };
  },

  asyncData ({ params }) {
    return {
      questionsProgrammingKnowledge,
    }
  },

  computed:{
    ...mapState(['posts']),
    ...mapState(['categories']),
    ...mapState(['tags']),
    ...mapGetters(['linkTo']),
  },

  components: {
    PostsIndex,
  },

  methods: {

    startQuestion(){
      this.onGoing = true;
      this.questionNumber = 1;
      const number = this.questionNumber -1
      this.question = this.questionsProgrammingKnowledge[number].q_description;
      console.log('スタートしたよ')
      console.log(this.questionsProgrammingKnowledge[number].q_description)
      console.log(this.questionsProgrammingKnowledge.length)
    },

    nextQuestion(){
      if(this.questionsProgrammingKnowledge.length > this.questionNumber){
        this.questionNumber += 1;
        const number = this.questionNumber -1
        this.question = this.questionsProgrammingKnowledge[number].q_description
        console.log('次の質問へ')
        console.log(this.questionNumber)
        console.log(this.questionsProgrammingKnowledge[number].q_description)
      }
    },

    preQuestion(){
      this.questionNumber -= 1;
      const number = this.questionNumber -1
      this.question = this.questionsProgrammingKnowledge[number].q_description
      console.log('前の質問へ')
      console.log(this.questionNumber)
      console.log(this.questionsProgrammingKnowledge[number].q_description)
    },

    quitQuestion(){
      this.questionNumber = 0;
      this.question = ''
      console.log('やめる')
      console.log(this.questionNumber)
    },

    calcResult(){
      this.questionNumber += 1;
      this.result = true;
      console.log(this.result)
      console.log('結果を算出中！')
      this.$nextTick(() => {
        console.log('描写なう')
      });
    },

    restartQuestion(){
      this.questionNumber = 0;
      this.result = false;
    }
  }
}
</script>

<style lang="scss">
.question-message{
  width: 100%;
  margin: 0 auto 18px;
  padding:18px 9px;
  text-align: center;
  color: #787C7B;
  font-weight: 500;
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

@media screen and (max-width: 480px) {
  .question-message{
    font-size: 14px;
  }
}


</style>
