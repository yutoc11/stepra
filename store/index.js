import client from '~/plugins/contentful'	// 追記

// 追記
export const state = () => ({
  posts: [],
  categories: [],
  tags: []
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
  }
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
  }

}

// 追記
export const actions = {
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
  }

}
