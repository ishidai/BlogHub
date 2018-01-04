<template>
  <div>
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
      <!--chorme 全屏 lg, mobile xs -->
      <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"><div class="grid-content bg-purple hidden-xs-only"></div></el-col>
      <el-col :xs="24" :sm="6" :md="8" :lg="13" :xl="15">
        <div class="grid-content bg-purple-light">
          <!--content start-->
          <list :lists="articles" :isLoading="isShow"></list>
          <!--content end-->
        </div>
      </el-col>
      <el-col :xs="4" :sm="6" :md="8" :lg="5" :xl="7"><div class="grid-content bg-purple hidden-xs-only"></div></el-col>
      <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"><div class="grid-content bg-purple-light hidden-xs-only"></div></el-col>
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
import consts from '../constant/consts'
import Banner from './Banner.vue'
import FooterBar from './FooterBar.vue'
import HeaderBar from './HeaderBar.vue'
import List from './List.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  data () {
    return {
      posts:[],
      isShow: true,
      isLogin: false
    }
  },
  computed: mapGetters({
    articles: 'homePosts'
  }),
  created () {
    this.getPage()
  },
  components: {
    Banner,
    List,
    HeaderBar,
    FooterBar,
  },
  methods: {
      getPage () {
          setTimeout(() => {
            const _this = this
            this.axios.get(consts.home)
              .then(response => {
                this.posts = response.data.posts
                if (this.posts) {
                  _this.isShow = false
                }
                this.$store.dispatch('getAllPosts', this.posts)
              }).catch((error) => {
                _this.getPage()
                if (error.response) {
                  console.log(error.response)
                } else if (error.request) {
//                  console.log(error.request)
                  console.log('error.request')
                  if(error.request.readyState == 4 && error.request.status == 0){
                    //我在这里重新请求
//                    _this.getPage()
                  }
                } else {
                  console.log('Error', error.message)
                }
                console.log(error.config)
            })
          }, 0)
      },
    publish() {
          this.$router.push('post')
    }
  },
  created() {
    this.getPage()
    if (window.localStorage.getItem("token")) {
      this.isLogin = true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .uk-text-center {
    margin: 0 190px;
  }

  .topic-list>ul {
    padding: 0;
    margin: 0;
  }

  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 360px;
    padding: 6px;
  }


</style>
