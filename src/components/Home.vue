<template>
  <div id="home">
    <!--<list :lists="articles" :isLoading="isShow"></list>-->
    <div class="uk-section-primary uk-preserve-color">
    <!--uk-sticky="animation: uk-animation-slide-top; -->
    <!--sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky; -->
    <!--cls-inactive: uk-navbar-transparent uk-light; top: 200"-->
      <header-bar
        :isLogin="isLogin"></header-bar>
      <banner></banner>
    </div>
    <!-- boby start -->
    <el-row :gutter="16">
      <el-tabs v-model="activeName" @tab-click="handleClick" class="header-tabs" type="card">
        <el-tab-pane label="基佬" name="first">
          <span slot="label"><i class="el-icon-date"></i>基佬0</span>
          <blog-classify></blog-classify>
        </el-tab-pane>
        <el-tab-pane label="基佬" name="second">
          <span slot="label"><i class="el-icon-date"></i>基佬1</span>
          <blog-classify></blog-classify>
        </el-tab-pane>
        <el-tab-pane label="基佬" name="third">
          <span slot="label"><i class="el-icon-date"></i>基佬2</span>
          <blog-classify></blog-classify>
        </el-tab-pane>
        <el-tab-pane label="基佬" name="fourth">
          <span slot="label"><i class="el-icon-date"></i>基佬3</span>
          <blog-classify></blog-classify>
        </el-tab-pane>
      </el-tabs>
      <!-- <el-col :xs="24" :sm="6" :md="8" :lg="13" :xl="15">
        <div class="grid-content bg-purple-light">
          <list :lists="articles" :isLoading="isShow"></list>
        </div>
      </el-col> -->
    </el-row>

    <el-row :gutter="16" class="container">
      <el-container class="el-container">
        <el-col :xs="24" :sm="20" :md="18" :lg="16">
          <el-main class="el-main">
            <div class="main-container" v-for="(item, index) in posts" :key="index">
              <div class="main-content">
                <div class="main-portrait">
                  <img src="../assets/images/11.jpg">
                </div>
                <div class="main-text">
                  <h2><router-link :to="{ name: 'content', params: { id: item.id }}">{{ item.title }}</router-link></h2>
                  <p>
                    <span class="underline">{{ item.username }}</span>
                    <span> • 最后由 </span>
                    <span class="underline">{{ item.comment_user_last }} 回复</span>
                    <span> • 发表时间：{{ postDate(item.timestamp) }}</span>
                    <span> • 阅读量：{{ item.num_view }}</span>
                  </p>
                </div>
              </div>
              <div class="main-witch-number">
                <span>{{ item.comment_count }}</span>
              </div>
            </div>
          </el-main>
        </el-col>
        <el-col :xs="0" :sm="4" :md="6">
          <el-aside width="300px" class="el-aside">
            <div>
              <h2>hot title</h2>
              <ul>
                <li v-for="(item, index) in 10" :key="index">
                  <span>溢出不隐藏溢出不隐藏溢出不隐藏</span>
                </li>
              </ul>
            </div>
          </el-aside>
        </el-col>
      </el-container>
    </el-row>

    <footer-bar></footer-bar>
  </div>
</template>

<script>
import consts from "../constant/consts";
import Banner from "./Banner.vue";
import FooterBar from "./FooterBar.vue";
import HeaderBar from "./HeaderBar.vue";
import BlogClassify from "./BlogClassify.vue";
import List from "./List.vue";
import * as types from '../store/mutation-types'
import { mapGetters } from "vuex";
export default {
  name: "Home",
  data() {
    return {
      posts: [],
      isShow: true,
      isLogin: false,
      activeName: 'first'
    };
  },
  computed: {
    ...mapGetters([
      'homePosts'
    ]),
  },
  components: {
    Banner,
    List,
    HeaderBar,
    FooterBar,
    BlogClassify
  },
  methods: {
    postDate(date) {
      return this.$moment(date).format('YYYY-MM-DD HH:mm:ss');
    },
    getPage() {
        const _this = this;
        this.axios.get(consts.home).then(response => {
            this.posts = response.data.posts
            if (this.posts) {
              _this.isShow = false
            }
            this.$store.dispatch("getAllPosts", this.posts)
          }).catch(error => {
            console.log(error);
            // _this.getPage();
            // if (error.response) {
              // console.log(error.response);
            // if (error.request) {
              //                  console.log(error.request)
              // console.log("error.request");
              // if (error.request.readyState == 4 && error.request.status == 0) {
                //我在这里重新请求
                // _this.getPage()
              // }
            // } else {
              // console.log("Error", error.message);
            // }
            // console.log(error.config);
          });
    },
    publish() {
      this.$router.push("post");
    },
    handleClick(tab, event) {
      console.log(tab, event);
    }
  },
  created() {
    const userCode = this.$utils.getUrlKey("code")
    if (userCode) {
      window.location.href='/';
      window.localStorage.setItem("isGithub", true)
      window.localStorage.setItem("token", userCode)
    }

    this.getPage();

    if (window.localStorage.getItem("token")) {
      this.isLogin = true;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#home {
  overflow-x: hidden;
  background: #f2f2f2;
  .container {
    margin-top: 1%;
  }
  .el-container {
    box-sizing: border-box;
    padding: 0 3%;
    background: #f2f2f2;
    .el-main {
      padding: 0;
    }
    .el-col-xs-24 {
      padding: 0;
    }
    .main-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 60px;
      padding: 0.8% 1.8%;
      background: #fff;
      border-bottom: 1px solid #F0F0F0;
      .main-content {
        display: flex;
        align-items: center;
        flex: 1;
        .main-portrait {
          width: 48px;
          height: 48px;
          margin-right: 1%;
          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
        .main-text {
          h2 {
            margin-bottom: 2px;
            font-size: 16px;
            font-weight: 600;
          }
          p {
            font-size: 14px;
            color: #8f8d8b;
            .underline {
              text-decoration: underline;
            }
          }
        }
      }
      .main-witch-number {
        flex: 0 0 35px;
        width: 35px;
        text-align: center;
        background: #CFD3E6;
        border-radius: 30%;
        span {
          font-size: 14px;
          color: #fff;
        }
        &:hover {
          cursor: pointer;
        }
      }
    }
    .el-aside {
      box-sizing: border-box;
      background: #fff;
      h2 {
        font-size: 20px;
        line-height: 40px;
        text-align: center;
        color: #666;
        background: #f3fbff;
      }
      ul {
        box-sizing: border-box;
        padding: 2% 8%;
        background: #fff;
        border: 1px solid #F0F0F0;
        li {
          font-size: 14px;
          line-height: 48px;
          font-weight: 500;
          color: #333;
          border-bottom: 1px solid #F0F0F0;
          &:hover {
            text-decoration: underline;
            cursor: pointer;
          }
          span {
            margin-left: 6px;
          }
        }
      }
    }
  }
}
.header-tabs {
  box-sizing: border-box;
  padding: 0 2.5%;
  background: #fff;
}
@media screen and (min-width: 320px) and (max-width: 600px)  {
  .el-container {
    padding: 0 !important;
  }
  .main-witch-number {
    display: none;
  }
}
</style>
