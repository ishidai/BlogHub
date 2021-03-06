import Router from 'vue-router'
import Vue from 'vue'
import store from '../store/index'
import Home from '@/containers/Home'
import Content from '@/containers/Content'
import Login from '@/containers/Login'
import QEditor from '@/containers/QEditor'
import Blog from '@/containers/Blog'
import Category from '@/containers/Category'
import SignIn from '@/containers/SignIn'
import ListCategory from '@/containers/ListCategory'
import ListTagPosts from '@/containers/ListTagPosts'
import Tags from '@/containers/Tags'
import My from '@/containers/My'
import User from '../components/user/User'
import * as types from '../store/mutation-types'

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
      path: '/signin',
      name: 'signin',
      component: SignIn
    },
    {
      path: '/categories',
      name: 'categories',
      component: Category
    },
    {
      path: '/tags',
      name: 'tags',
      component: Tags
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
    },
    {
      path: '/mine',
      name: 'mine',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      component: My
    },
    {
      path: '/user',
      name: 'user',
      meta: {
        requireAuth: true,
      },
      component: User
    },
    {
      path: '/list/category/:category_id',
      name: 'list_category',
      component: ListCategory
    },
    {
      path: '/search/tag/:tag_name', // 标签搜索列表
      name: 'tag_name',
      component: ListTagPosts
    }
]

// 页面刷新时，重新赋值token
if (window.localStorage.getItem('token')) {
  store.commit(types.IS_LOGIN)
  store.dispatch('commitToken', window.localStorage.getItem('token'))
}

const router = new Router({
  mode: 'history',
  routes,
  // scroll to top
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
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
