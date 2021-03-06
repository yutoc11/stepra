export default async ({ store }) => {
  if (!store.state.posts.length) await store.dispatch('getPosts')
  if (!store.state.categories.length) await store.dispatch('getCategories')
  if (!store.state.tags.length) await store.dispatch('getTags')
  if (!store.state.rectexts.length) await store.dispatch('getRectexts')
}
