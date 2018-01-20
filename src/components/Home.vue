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
          <span slot="label"><i class="el-icon-date"></i>基佬1</span>
          <el-col :xs="24" :sm="8" :md="6" :lg="4" :xl="4" v-for="(item, index) in posts" :key="index">
            <div class="grid-content bg-purple">
              <div class="content-bg">
                <img src="../assets/images/11.jpg">
                <span>博客名称</span>
              </div>
              <div class="content-text">
                专业的博客平台
              </div>
              <div class="content-footer">
                <div class="left-footer">
                  <i class="el-icon-view"></i>
                  <span>123</span>
                </div>
                <div class="right-footer">
                  <i class="el-icon-star-on"></i>
                  <span>321</span>
                </div>
              </div>
            </div>
          </el-col>
        </el-tab-pane>
        <el-tab-pane label="基佬" name="second">
          <span slot="label"><i class="el-icon-date"></i>基佬1</span>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <div class="grid-content bg-purple">基佬1</div>
          </el-col>
        </el-tab-pane>
        <el-tab-pane label="基佬" name="third">
          <span slot="label"><i class="el-icon-date"></i>基佬2</span>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <div class="grid-content bg-purple">基佬2</div>
          </el-col>
        </el-tab-pane>
        <el-tab-pane label="基佬" name="fourth">
          <span slot="label"><i class="el-icon-date"></i>基佬3</span>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <div class="grid-content bg-purple">基佬3</div>
          </el-col>
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
                    <span class="underline">我抱着结衣</span>
                    <span>回复于 {{ index }} 天前</span>
                    <span> • 发表时间：{{ postDate(item.timestamp) }}</span>
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
import List from "./List.vue";
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
    FooterBar
  },
  methods: {
    postDate(date) {
      return this.$moment(date).format('YYYY-MM-DD HH:mm:ss');
    },
    getPage() {
      setTimeout(() => {
        const _this = this;
        this.axios.get(consts.home).then(response => {
            this.posts = response.data.posts
            if (this.posts) {
              _this.isShow = false
            }
          this.$store.dispatch("getAllPosts", this.posts)
          })
          .catch(error => {
            _this.getPage();
            if (error.response) {
              console.log(error.response);
            } else if (error.request) {
              //                  console.log(error.request)
              console.log("error.request");
              if (error.request.readyState == 4 && error.request.status == 0) {
                //我在这里重新请求
                //                    _this.getPage()
              }
            } else {
              console.log("Error", error.message);
            }
            console.log(error.config);
          });
      }, 0);
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
  .bg-purple {
    padding: 0 3%;
    background: #fff;
    .content-bg {
      margin: 5%;
      width: 100%;
      img {
        width: 30px;
        height: 30px;
      }
      span {
        margin-left: 8px;
        font-size: 12px;
        font-weight: bold;
      }
    }
    .content-text {
      margin: 5%;
      text-align: left;
      font-size: 12px;
    }
    .content-footer {
      display: flex;
      justify-content: space-between;
      margin: 5% 5% 0;
      font-size: 10px;
    }
  }
  .grid-content {
    margin-bottom: 5%;
    border-radius: 10px;
    min-height: 100px;
    padding: 6px;
    transition: 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
    &:hover {
      transform: scale(1.1);
    }
  }
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
