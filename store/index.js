import client from '~/plugins/contentful'	// 追記

// 追記
export const state = () => ({
  posts: []
})

export const getters = {

	// 追記
  linkTo: () => (name, obj) => {
    return { name: `${name}-slug`, params: { slug: obj.fields.slug } }
  }
}

// 追記
export const mutations = {
  setPosts(state, payload) {
    state.posts = payload
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
  }

}
