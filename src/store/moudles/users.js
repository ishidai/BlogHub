import * as types from '../mutation-types'

// initial state
const state = {
  token: '',
  isLogin: false
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
  },
  [types.IS_LOGIN] (state) {
    state.isLogin = true
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
