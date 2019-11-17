import client from '~/plugins/contentful'	// 追記

// 追記
export const state = () => ({
  posts: [],
  categories: [],
  tags: [],
  rectexts: [],
  resultType: null,
  resultInterestLv: null,
  resultPersonalityLv: null,
  recType: null,
  //answersInterest: [],
  //answersPersonality: [],
})

export const getters = {

	// 追記
  linkTo: () => (name, obj) => {
    return { name: `${name}-slug`, params: { slug: obj.fields.slug } }
  },

  relatedCategoryPosts: state => (category) => {
    const posts = []
    for (let i = 0; i < state.posts.length; i++) {
      const catId = state.posts[i].fields.category.sys.id
      if (category.sys.id === catId) posts.push(state.posts[i])
    }
    return posts
  },

  relatedTagPosts: state => (tag) => {
    //投稿の箱を用意
    const posts = []
    //投稿数の数だけループ
    for (let i = 0; i < state.posts.length; i++) {
      //1投稿に含むタグを抽出
      const posttags = state.posts[i].fields.tags;
      //1投稿に含むタグの数だけループ
      for(let j = 0; j < posttags.length; j++){
        const uniquetag = posttags[j]
        //そのタグのIDを拾う
        const catId = uniquetag.sys.id
        // そのURLのtag idと一致したら投稿一覧に入れる
        if (tag.sys.id === catId) posts.push(state.posts[i])
      }
    }
    return posts
  },

  foryourRectext: state => (iLv,pLv) => {
    const rectext = '';
    const recType = '';
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
        break;
    }
    for (let i = 0; i < state.rectexts.length; i++) {
      const catSlug = state.rectexts[i].fields.slug
      if (recType === catSlug) rectext.push(state.posts[i])
    }
    return rectext
  },

}
//(v-for="uniquetag in post.fields.tags")
// 追記
export const mutations = {
  setPosts(state, payload) {
    state.posts = payload
  },
  setCategories(state, payload) {
    state.categories = payload
  },
  setTags(state, payload) {
    state.tags = payload
  },
  setRectexts(state, payload) {
    state.rectexts = payload
  },
  setResultType(state, payload){
    state.resultType = payload
  },
  setResultInterestLv(state, payload){
    state.resultInterestLv = payload
  },
  setResultPersonalityLv(state, payload){
    state.resultPersonalityLv = payload
  },
  setRecType(state, payload){
    state.recType = payload
  },
  // setAnswersInterest(state, payload) {
  //   state.answersInterest = payload
  // },
  // setAnswersPersonality(state, payload) {
  //   state.answersPersonality = payload
  // },
}

// 追記
export const actions = {

  // setAnswersInterest ({ commit }, payload) {
  //   commit('setAnswersInterest', payload)
  // },
  //
  // setAnswersPersonality ({ commit }, payload) {
  //   commit('setAnswersPersonality', payload)
  // },

  setResultType ({ commit }, payload) {
    commit('setResultType', payload)
  },

  setResultInterestLv ({ commit }, payload) {
    commit('setResultInterestLv', payload)
  },

  setResultPersonalityLv ({ commit }, payload) {
    commit('setResultPersonalityLv', payload)
  },

  setRecType ({ commit }, payload) {
    commit('setRecType', payload)
  },

  async getPosts({ commit }) {
    await client.getEntries({
      content_type: 'post',
      order: '-sys.createdAt'
    }).then(res =>
      commit('setPosts', res.items)
    ).catch(console.error)
  },

  async getCategories({ commit }) {
    await client.getEntries({
      content_type: 'category',
      order: 'fields.sort'
    }).then(res =>
      commit('setCategories', res.items)
    ).catch(console.error)
  },

  async getTags({ commit }) {
    await client.getEntries({
      content_type: 'tag',
      order: 'fields.sort'
    }).then(res =>
      commit('setTags', res.items)
    ).catch(console.error)
  },

  async getRectexts({ commit }) {
    await client.getEntries({
      content_type: 'rectext',
    }).then(res =>
      commit('setRectexts', res.items)
    ).catch(console.error)
  }

}
