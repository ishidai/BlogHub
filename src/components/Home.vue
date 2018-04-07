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
      <el-tabs v-model="activeName" @tab-click="handleClick" class="header-tabs">

        <el-tab-pane v-for="(blog_category, index) in blog_categories" :key='index' :label="blog_category.name" :name="`${blog_category.id}`" >
          <span slot="label"><i class="el-icon-date"></i>{{ blog_category.name }}
          </span>
          <blog-classify :selectCategoryId="blog_category.id"></blog-classify>
        </el-tab-pane>
      </el-tabs>
    </el-row>

    <el-row :gutter="16" class="container">
      <el-container class="el-container">
        <el-col :xs="24" :sm="20" :md="18" :lg="16">
          <el-main class="el-main">
            <post :posts="posts"> </post>
          </el-main>
        </el-col>
        <el-col :xs="0" :sm="4" :md="6">
          <el-aside width="300px" class="el-aside">
            <div>
              <h2>热门标签</h2>
                <el-tag v-for="(tag, index) in tags" :key="index" size="mini" closable>{{ tag.content }}</el-tag>
            </div>
          </el-aside>
        </el-col>
      </el-container>
    </el-row>

    <footer-bar></footer-bar>
  </div>
</template>

<script>
import Vue from 'vue';
import consts from "../constant/consts";
import Banner from "./Banner.vue";
import FooterBar from "./FooterBar.vue";
import HeaderBar from "./HeaderBar.vue";
import BlogClassify from "./BlogClassify.vue";
import Post from './Post.vue'
import List from "./List.vue";
import * as types from '../store/mutation-types'
import { mapGetters } from "vuex";
import { Tag  } from 'element-ui';
Vue.component(Tag.name, Tag);

export default {
  name: "Home",
  data() {
    return {
      posts: [],
      isShow: true,
      isLogin: false,
      activeName: '1',
      blog_categories: [],
      tags: []
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
    BlogClassify,
    Post
  },
  methods: {
    getTags() {
      this.axios.get(consts.tags).then((res) => {
        console.log('tags=>', res.data)
        this.tags = res.data.tags
      }).catch(err => {
        console.log(err)
      })
    },
    /**@function
     * 格式化时间
     */
    postDate(date) {
      return this.$moment(date).format('YYYY-MM-DD HH:mm:ss');
    },
    /**@function
     * 获取首页列表数据
     */
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
    /**@function
     * 获取博客分类栏目名称
     */
    getBlogCategories() {
      this.axios.get(consts.blog_categories).then((res) => {
        this.blog_categories = res.data.blog_categories
      })
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

    this.getBlogCategories();

    this.getTags();

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
