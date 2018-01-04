import * as types from '../mutation-types'

// initial state
const state = {
  indexPosts: []
}

// getters
const getters = {
  homePosts: state => state.indexPosts
}

// actions
const actions = {
  getAllPosts ({ commit }, posts) {
    commit(types.INDEX_DATA, { posts })
  }
}

// mutations
const mutations = {
  [types.INDEX_DATA] (state, { posts }) {
    state.indexPosts = posts
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
