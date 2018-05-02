<template>
  <div class="header">
    <div class="container">
      <div class="header-left">
        <a class="logo" href="/"><img src="../assets/logo.jpg" alt="博客咖"></a>
        <div class="menu">
          <ul>
            <li><a class="active" href="/">首页</a></li>
            <li><a href="">书单</a></li>
            <li><a href="">标签</a></li>
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
            <img class="profile-pic" src="../assets/images/11.jpg" alt="头像">
            {{ user.username }}
            <i class="el-icon-caret-bottom el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item class="clearfix">
              我的主页
            </el-dropdown-item>
            <el-dropdown-item class="clearfix">
              消息
              <el-badge class="mark" :value="6" />
            </el-dropdown-item>
            <el-dropdown-item class="clearfix">
              设置
            </el-dropdown-item>
            <el-dropdown-item class="clearfix">
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
export default {
  props: {
    isPublish: Boolean
  },
  data() {
    return {
      user: {},
      search: ''
    };
  },
  computed: {
    isLoginOnline() {
      return this.$store.state.users.isLogin
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
      this.axios.get(constans.logout).then(res => {
        window.localStorage.clear();
        window.location.reload();
      });
    }
  },
  created() {
    const token = window.localStorage.getItem("token");
    this.axios.get(constans.user, {
          timeout: 6000,
          auth: {
            username: token
          }
        }).then(res => {
          console.log('user-info:', res.data.result)
          this.user = res.data.result;
        }).catch((err) => {
          console.log(err)
          window.localStorage.clear();
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
  padding: .1rem 0;
  background-color: #fff;
  overflow: auto;
  transition: all .3s ease;
  .container{
    max-width: 1024px;
    padding: 0 .2rem;
    margin: 0 auto;
    font-size: .15rem;
    .button{
      display: inline-block;
    }
    .header-left{
      float: left;
      .logo{
        vertical-align: text-top;
        img{
          height: .15rem;
        }
      }
      .menu{
        display: inline-block;
        vertical-align: text-top;
        li{
          display: inline-block;
          margin-left: .3rem;
          transition: all .3s ease;
          @media screen and ($md) {
            margin-left: .2rem;
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
        width: .12rem;
        height: .12rem;
      }
    }
  }
}
</style>
