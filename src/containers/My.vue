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
                <el-tab-pane label="热门分享" name="first">热门分享</el-tab-pane>
                <el-tab-pane label="最新分享" name="second">最新分享</el-tab-pane>
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

Vue.component(Row.name, Row);
Vue.component(Col.name, Col);
Vue.component('v-gravatar', Gravatar);
export default {
    data() {
      return {
        activeName: 'first',
        isStretch: true,
        tabPosition: 'top',
        email: '',
        user_avatar: ''
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
    },
    created() {
    },
    components: {
        Header
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

