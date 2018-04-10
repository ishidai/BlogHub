<template>
  <div class="header">
    <div class="container">
      <div class="header-left">
        <div class="logo">博客咖</div>
        <div class="list">
          <ul>
            <li class="hover">首页</li>
            <li>书单</li>
            <li>标签</li>
          </ul>
        </div>
      </div>
      <div class="header-right">
        <div class="search">
          <el-input 
            v-model="search"
            size="mini"
            suffix-icon="el-icon-search"
            placeholder="搜索">
          </el-input>
        </div>
        <div class="login-button">
          <el-button size="mini" icon="el-icon-document"></el-button>          
          <el-button size="mini">注册</el-button>
          <el-button size="mini">登录</el-button>
          <el-button size="mini">GitHub登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import constans from "../constant/consts";
import * as types from '../store/mutation-types';
export default {
  props: {
    isLogin: Boolean,
    isPublish: Boolean
  },
  data() {
    return {
      user: {},
      search: ''
    };
  },
  computed: {},
  components: {},
  methods: {
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
  },
  mounted() {
    // const _this = this;
    // if (this.isLogin) {
    //   const token = window.localStorage.getItem("token");
    //   const isGithub = window.localStorage.getItem("isGithub");
    //   if (isGithub) {
    //     this.axios.get(`https://api.github.com/user?access_token=${token}&scope=&token_type=bearer`).then(res => {
    //       _this.user = res.data;
    //       _this.user['username'] = res.data.name;
    //       _this.$store.dispatch("commitToken", token);
    //     })
    //   } else {
    //     this.axios.get(constans.user, {
    //       timeout: 6000,
    //       auth: {
    //         username: token
    //       }
    //     }).then(res => {
    //       _this.user = res.data.result;
    //     }).catch((err) => {
    //       console.log(err)
    //       window.localStorage.clear();
    //     })
    //   }
    // }
  }
};
</script>

<style scoped lang="scss">
@import "~scss/variable";
.header {
  height: .5rem;
  line-height: .5rem;
  background: #fff;
  width: 100%;
  font-size: .12px;
  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    .header-left {
      display: flex;
      align-items: center;
      font-size: .15rem;
      height: 100%;
      cursor: pointer;      
      ul {
        height: 100%;
        margin-left: .3rem;       
        text-align: center;
        color: #87969d;
        .hover {
          color: $theme;
        }
        li {
          display: inline-block;
          width: .6rem;
        }
      }
      .logo {
        width: .5rem;
        text-align: center;
        height: 100%;
        font-size: .16rem;
      }
      .list {

      }
    }
    .header-right {
      display: flex;
      align-items: center;
      height: 100%;
      font-size: .15rem;
      text-align: right;
      .login-button {
        height: 100%;
        margin-left: .3rem;
      }
    }
  }
}
@media screen and (min-width: 1000px) {
  .container {
    width: 10rem;
    margin: 0 auto;
    border-bottom: 1px solid #eceef1;
  }
}
@media screen and (max-width: 640px) {
  .container {
    padding: 0 .1rem;
    .list, .search {
      display: none;
    }
  }
}
</style>
