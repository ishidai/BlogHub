import * as types from '../mutation-types'

// initial state
const state = {
  token: ''
}

// getters
const getters = {
  getToken: state => state.token
}

// actions
const actions = {
  commitToken ({ commit }, token) {
    commit(types.GET_TOKEN, { token })
  }
}

// mutations
const mutations = {
  [types.GET_TOKEN] (state, { token }) {
    state.token = token
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
