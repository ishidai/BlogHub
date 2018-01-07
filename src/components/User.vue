<template>
  <div id="user">
    <!--<list :lists="articles" :isLoading="isShow"></list>-->
    <div class="uk-section-primary uk-preserve-color">
    <!--uk-sticky="animation: uk-animation-slide-top; -->
    <!--sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky; -->
    <!--cls-inactive: uk-navbar-transparent uk-light; top: 200"-->
      <header-bar
        :isLogin="isLogin"></header-bar>
      <banner></banner>
    </div>
    <div>Hello, Guest!</div>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
import consts from "../constant/consts";
import Banner from "./Banner.vue";
import FooterBar from "./FooterBar.vue";
import HeaderBar from "./HeaderBar.vue";
 import { mapGetters } from "vuex";

export default {
  name: "User",
  data() {

  },
  computed: mapGetters({
    articles: "homePosts"
  }),
  created() {
    this.getPage();
  },
  components: {
    Banner,
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
                // _this.getPage()
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
#user {
  overflow-x: hidden;
}
.uk-text-center {
  margin: 0 190px;
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
