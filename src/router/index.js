import Router from 'vue-router'
import Vue from 'vue'
import store from '../store/index'
import Home from '@/components/Home'
import Content from '@/components/Content'
import Login from '@/components/Login'
import QEditor from '@/components/QEditor'
import Blog from '@/components/Blog'
// const Content = r => import('../components/Content').then(r)
Vue.use(Router)

const routes = [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/posts/:id',
      name: 'content',
      component: Content
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/blog',
      name: 'blog',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      component: Blog
    },
    {
      path: '/post',
      name: 'post',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      component: QEditor
    }
]

// 页面刷新时，重新赋值token
if (window.localStorage.getItem('token')) {
  store.dispatch('commitToken', window.localStorage.getItem('token'))
}

const router = new Router({
  mode: 'hash',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (store.getters.getToken) {
      next()
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
})

export default router
