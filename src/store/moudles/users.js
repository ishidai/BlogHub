import * as types from '../mutation-types'

// initial state
const state = {
  token: '',
  isLogin: false,
  qiniuToken: '',
  userId: '0'
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
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
