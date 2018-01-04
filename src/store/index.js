import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import posts from './moudles/posts'
import users from './moudles/users'

Vue.use(Vuex)
// const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  actions,
  getters,
  modules: {
    posts,
    users
  }
  // strict: debug
})

export default store
