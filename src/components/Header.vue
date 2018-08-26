<template>
  <div class="header">
    <div class="container">
      <div class="header-left">
        <a class="logo" href="/"><img src="../assets/logo.jpg" alt="博客咖"></a>
        <div class="menu">
          <ul>
            <li><a :class="path==='/'? 'active' : ''" href="/">首页</a></li>
            <li><a :class="path==='/categories'? 'active' : ''" href="/#/categories">分类</a></li>
            <li><a :class="path==='/tags'? 'active' : ''" href="/#/tags">标签</a></li>
            <li><a :class="path==='/tags'? 'active' : ''" href="">移动客户端开发中...</a></li>
            <li><a :class="path==='/tags'? 'active' : ''" href="https://github.com/ishidai/BlogHub/issues/new">我要提意见</a></li>
          </ul>
        </div>
      </div>
      <div class="header-right">
        <el-input
          class="search inline-block"
          v-model="search"
          size="mini"
          suffix-icon="el-icon-search"
          placeholder="搜索">
        </el-input>
        <el-button class="inline-block" size="mini" icon="el-icon-document" @click="publish"></el-button>
        <div class="inline-block" v-if="isLoginOnline !== true">            
            <el-button class="inline-block" size="mini" @click="reg">注册</el-button>
            <el-button class="inline-block" size="mini" @click="login">登录</el-button>
        </div>
        <el-dropdown trigger="click" v-else>
          <el-button class="el-dropdown-link" size="mini">
            <img  v-if="imageUrl" class="profile-pic" :src="imageUrl" alt="头像">
            <v-gravatar v-else :email="getCurrentUser.email" class="profile-pic"/>
            {{ getCurrentUser.username }}
            <i class="el-icon-caret-bottom el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item class="clearfix">
              <router-link to="mine">我的主页</router-link>
            </el-dropdown-item>
            <el-dropdown-item class="clearfix">
              <router-link to="blog">提交博客</router-link>
            </el-dropdown-item>
            <el-dropdown-item class="clearfix">
              <router-link to="post">发表见解</router-link>
            </el-dropdown-item>
            <el-dropdown-item class="clearfix">
              消息
              <el-badge class="mark" :value="6" />
            </el-dropdown-item>
            <el-dropdown-item class="clearfix">
              <router-link to="user">设置</router-link>
            </el-dropdown-item>
            <el-dropdown-item @click.native="logout" class="clearfix">
              退出
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import constans from "../constant/consts";
import * as types from '../store/mutation-types';
import utils from '../utils/utils.js'
import Vue from 'vue';
import Gravatar from 'vue-gravatar';

Vue.component('v-gravatar', Gravatar);

export default {
  props: {
    isPublish: Boolean
  },
  data() {
    return {
      path: this.$route.path,
      user: {},
      search: '',
      imageUrl: '',
    };
  },
  computed: {
    isLoginOnline() {
      return this.$store.state.users.isLogin
    },
    getCurrentUser() {
      return this.$store.state.users.user
    }
  },
  components: {},
  methods: {
    reg() {
      this.$router.push("signin");
    },
    login() {
      this.$router.push("login");
    },
    blogCommit() {
      this.$router.push("blog");
    },
    publish() {
      this.$router.push("post");
    },
    commitPost() {
      this.$emit("commitActicle");
    },
    logout() {
      window.localStorage.clear();
      window.location.reload();
    }
  },
  created() {
    // 获取用户信息和头像
    utils.getUserInfo().then(user => {
      this.imageUrl = user.avatar_url
    })
  },
  mounted() {
  }
};
</script>

<style scoped lang="scss">
@import "~scss/variable";
.shadow{
  box-shadow: 0 0 15px rgba(0,0,0,.25)
}
.header{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 3;
  width: 100%;
  padding: 1rem 0;
  background-color: #fff;
  overflow: auto;
  transition: all .3s ease;
  .container{
    max-width: 1024px;
    padding: 0 2rem;
    margin: 0 auto;
    font-size: 1.5rem;
    .button{
      display: inline-block;
    }
    .header-left{
      float: left;
      .logo{
        vertical-align: text-top;
        img{
          height: 1.5rem;
        }
      }
      .menu{
        display: inline-block;
        vertical-align: text-top;
        li{
          display: inline-block;
          margin-left: 3rem;
          transition: all .3s ease;
          @media screen and ($md) {
            margin-left: 2rem;
          }
          @media screen and ($sm) {
            display: none;
          }
        }
      }
    }
    .header-right{
      float: right;
      text-align: right;
      .search{
        width: 42%;
        @media screen and ($md) {
         display: none;
        }
      }
      .profile-pic{
        width: 1.2rem;
        height: 1.2rem;
      }
    }
  }
}
</style>
