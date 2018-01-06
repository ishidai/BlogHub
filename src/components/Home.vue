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
    <el-row :gutter="10">
      <el-tabs v-model="activeName" @tab-click="handleClick" class="header-tabs">
        <el-tab-pane label="基佬" name="first">
          <span slot="label"><i class="el-icon-date"></i>基佬1</span>
          <el-col :xs="24" :sm="8" :md="6" :lg="4" :xl="4" v-for="(item, index) in posts" :key="index">
            <div class="grid-content bg-purple">
              <div class="content-bg">
                <img src="../assets/logo.png" width="100%" height="100%">
              </div>
              <div class="content-text">
                博客名称：{{ item.name }}
              </div>
              <div class="content-text">
                博客简介：{{ item.name }}
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

    <!--<div uk-grid>-->
      <!--<div class="uk-width-3-4">-->
        <!--<div class="uk-card uk-card-default uk-card-body">-->
          <!---->
        <!--</div>-->
      <!--</div>-->

      <!--<div class="uk-width-1-4">-->
          <!--<button class="uk-button uk-button-primary uk-button-large" @click="publish">投 稿</button>-->
      <!--</div>-->
    <!--</div>-->
    <!--boby end-->
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
  computed: mapGetters({
    articles: "homePosts"
  }),
  created() {
    this.getPage();
  },
  components: {
    Banner,
    List,
    HeaderBar,
    FooterBar
  },
  methods: {
    getPage() {
      setTimeout(() => {
        const _this = this;
        this.axios
          .get(consts.blogs)
          .then(response => {
            this.posts = response.data.blogs;
            if (this.posts) {
              _this.isShow = false;
            }
            this.$store.dispatch("getAllPosts", this.posts);
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
}
.uk-text-center {
  margin: 0 190px;
}

.topic-list > ul {
  padding: 0;
  margin: 0;
}

.el-col {
  border-radius: 4px;
}
.header-tabs {
  box-sizing: border-box;
  padding: 0 2.5%;
  .bg-purple {
    background: #d3dce6;
    .content-bg {
      width: 100%;
      height: 80px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .content-text {
      margin-top: 10px;
      text-align: center;
    }
  }
  .grid-content {
    margin-bottom: 5%;
    border-radius: 4px;
    min-height: 120px;
    padding: 6px;
  }
}

</style>
