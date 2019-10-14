import client from '~/plugins/contentful'	// 追記

// 追記
export const state = () => ({
  posts: [],
  categories: []
})

export const getters = {

	// 追記
  linkTo: () => (name, obj) => {
    return { name: `${name}-slug`, params: { slug: obj.fields.slug } }
  },

  relatedPosts: state => (category) => {
    const posts = []
    for (let i = 0; i < state.posts.length; i++) {
      const catId = state.posts[i].fields.category.sys.id
      if (category.sys.id === catId) posts.push(state.posts[i])
    }
    return posts
  }
}

// 追記
export const mutations = {
  setPosts(state, payload) {
    state.posts = payload
  },
  setCategories(state, payload) {
    state.categories = payload
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
  }

}
