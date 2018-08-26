<template>
<div class="user-info-detail">
<Header></Header>
<el-row :gutter="10" class="user-info">
  <el-col :xs="0" :sm="7" :md="8" :lg="6" :xl="1"><div class="grid-content bg-purple"></div></el-col>
    <el-col :xs="24" :sm="10" :md="8" :lg="12" :xl="22">
        <div class="user-info-text">
            <h1 class="username">{{ getUser.username }}</h1>
            <div class="user-desc">{{ getUser.location }}</div>
        </div>
        <div class="user-info-img">
            <img v-if="getUser.avatar_url" :src="getUser.avatar_url" class="avatar">
            <v-gravatar v-else :email="getUser.email" class="avatar"/>
        </div>
    </el-col>
  <el-col :xs="0" :sm="7" :md="8" :lg="6" :xl="1"><div class="grid-content bg-purple-light"></div></el-col>
</el-row>

<el-row :gutter="10">
  <el-col :xs="6" :sm="4" :md="3" :lg="6" :xl="6"><div class="grid-content hidden-xs-only"></div></el-col>
  <el-col :xs="24" :sm="16" :md="18" :lg="12" :xl="12">
      <div class="grid-content bg-purple-light">
            <el-tabs v-model="activeName" @tab-click="handleClick" :stretch="isStretch" class="test-test"
                :tab-position="tabPosition">
                <el-tab-pane label="发表的文章" name="first">
                    <blog-item type="post" :posts="posts"> </blog-item>
                </el-tab-pane>
                <el-tab-pane label="分享的博客" name="second">
                    <blog-item type="blog" :blogs="blogs"> </blog-item>
                </el-tab-pane>
                <el-tab-pane label="我的收藏" name="third">我的收藏</el-tab-pane>
                <el-tab-pane label="赞过的文章" name="fourth">赞过的文章</el-tab-pane>
                <el-tab-pane label="关注" name="fifth">关注</el-tab-pane>
                <el-tab-pane label="粉丝" name="sixth">粉丝</el-tab-pane>
            </el-tabs>
      </div>
  </el-col>
  <el-col :xs="6" :sm="4" :md="3" :lg="6" :xl="6"><div class="grid-content hidden-xs-only"></div></el-col>
</el-row>
    
</div>
</template>
<script>
import Header from "../components/Header.vue";
import { Row } from 'element-ui';
import { Col } from 'element-ui';
import Vue from 'vue';
import Gravatar from 'vue-gravatar';
import BlogItem from '../components/BlogItem.vue'
import consts from "../constant/consts";

Vue.component(Row.name, Row);
Vue.component(Col.name, Col);
Vue.component('v-gravatar', Gravatar);

export default {
    data() {
      return {
        activeName: 'first',
        isStretch: true,
        tabPosition: 'top',
        // 用户邮箱
        email: '',
        // 用户头像
        user_avatar: '',
        // 热门分享列表
        posts: [],
        blogs: [],
        user: {}
      };
    },
    computed: {
        getUser() {
            return this.$store.state.users.user;
        }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      // 获取用户发表过的文章
      getUserPosts(userId) {
        this.axios.get(`${consts.user_posts}/${userId}/timeline`).then(response => {
            this.posts = response.data.posts
        }).catch(error => {
            console.log(error);
        })
      },
      // 获取用户分享过的博客
      getUserBlogs(userId) {
        this.axios.get(`${consts.user_posts}/${userId}/blogs/`).then(response => {
            this.blogs = response.data.blogs
            console.log('获取的blogs：', this.blogs)
        }).catch(error => {
            console.log(error);
        })
      }
    },
    created() {
        const userId = localStorage.getItem('user_id')
        this.getUserPosts(userId);
        this.getUserBlogs(userId);
    },
    components: {
        Header,
        BlogItem
    }
}
</script>

<style scoped > 
    .user-info {
        margin-top: 60px;
    }
    .user-info-username {
        color: #000;
        font-size: 3rem;
        font-weight: 500;
    }
    .avatar {
        height: 100px;
        border-radius:50%;
    }
    .el-col {
        border-radius: 4px;
    }
    .bg-purple-dark {
        /* background: #99a9bf; */
    }
    .bg-purple {
        /* background: #d3dce6; */
    }
    .bg-purple-light {
        /* background: #e5e9f2; */
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
    .user-info-text {
        width: 70%;
        background: fff;
        float: left;
    }
    .username {
        font-weight: 500;
        font-size: 3rem;
        margin-top: 80px;
    }
    .user-info-img {
        margin-top: 50px;
        display: inline-block;
        vertical-align: middle;
        border-radius: 100%;
        width: 100px;
        height: 100px;
        border: 0;
    }
    .user-desc {
        color: #000;
        font-size: 1rem;
        line-height: 100px;
    }
    .user-info-detail {
        background: #FFFFFF;
    }
</style>

