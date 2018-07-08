import * as types from '../mutation-types'

// initial state
const state = {
  token: '',
  isLogin: false,
  qiniuToken: '',
  userId: '0',
  user: {}
}

// getters
const getters = {
  getToken: state => state.token,
  getUserId: state => state.userId
}

// actions
const actions = {
  commitToken ({ commit }, token) {
    commit(types.GET_TOKEN, { token })
  },
  saveUserId ({ commit }, userId) {
    commit(types.USER_ID, userId )
  },
  saveUserInfo ({ commit }, user) {
    commit(types.USER, user)
  }
}

// mutations
const mutations = {
  [types.GET_TOKEN] (state, { token }) {
    state.token = token
  },
  [types.IS_LOGIN] (state) {
    state.isLogin = true
  },
  [types.QINIU] (state, token) {
    state.qiniuToken = token
  },
  [types.USER_ID] (state, id) {
    state.userId = id
  },
  [types.USER] (state, user) {
    state.user = user
  },

}

export default {
  state,
  getters,
  actions,
  mutations
}
