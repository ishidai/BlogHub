<template>
  <div style="background:#fff;">
    <HeaderBar isLogin="isLogin"></HeaderBar>
    <div class="main">
      <div class="container">
        <!-- End 博客title and about -->
        <div class="post-title-about">
          <h2>{{ title }}</h2>
          <div class="rich-title">
            <div class="rich-avatar">
              <img src="../assets/images/11.jpg">
            </div>
            <div class="rich-about">
              <div class="rich-text">
                <p>{{ username }}</p>
                <span>+关注</span>
              </div>
              <div class="rich-amount">
                {{ postDate(time) }}  字数 未知 阅读 未知 评论 未知 喜欢 未知
              </div>
            </div>
          </div>
        </div>
        <!-- End 博客title and 关于 -->

        <!-- 富文本区域 -->
        <div class="rich-container" v-html="content">
        </div>
        <!-- End 富文本区域 -->

        <!-- 评论区域 -->
        <div class="comment">
          <h2>评论 ({{ totalCount }})</h2>
          <div class="comment-login" v-if="!isLogin">登录后评论</div>
          <div v-else>
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="textarea">
            </el-input>
            <el-button type="primary" v-on:click="commitComment">提交</el-button>
          </div>
          <ul>
            <li v-for="(item, index) in comments" :key="index">
              <div class="user-avatar">
                <img src="../assets/images/11.jpg">
              </div>
              <div class="user-content">
                <span>{{ item.username }} {{ postDate(item.timestamp) }}</span>
                <p>{{ item.body }}</p>
              </div>
            </li>
          </ul>
        </div>

        <!-- End 评论区域 -->
      </div>
    </div>
    <footer-bar></footer-bar>
  </div>
</template>
<script>
import HeaderBar from "./HeaderBar.vue";
import FooterBar from "./FooterBar.vue";
import consts from "../constant/consts";
import Vue from "vue";
import { Input } from "element-ui";
Vue.component(Input.name, Input);

export default {
  data() {
    return {
        title: '',
        content: '',
        username: '',
        time: '',
        textarea: '',
        comments: [],
        totalCount: ''
    };
  },
  computed: {
      isLogin() {
          return this.$store.state.users.isLogin
      }
  },
  components: {
    HeaderBar,
    FooterBar
  },
  created () {
    const _this = this;
    const arr = [
      consts.posts,
      this.$route.params.id
    ];
    const postUrl = arr.join('');
    this.axios.get(postUrl).then(response => {
      console.log('aaaa', response.data)
      _this.title = response.data.title
      _this.content = response.data.body
      _this.username = response.data.username
      _this.time = response.data.timestamp
    })

    this.axios.get(`/api/v1.0/posts/${this.$route.params.id}/comments/`)
      .then(response => {
          _this.comments = response.data.comments
          _this.totalCount = response.data.count
      })
  },
  methods: {
    postDate(date) {
      return this.$moment(date).format('YYYY-MM-DD HH:mm:ss');
    },
    commitComment() {
      this.axios.post(`/api/v1.0/posts/${this.$route.params.id}/comments/`, {
          body: this.textarea
        })
        .then(function(response) {
          if (response.status === 201) {
            _this.$router.push("/");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped lang="scss">
@import "~scss/mixin";
.main {
  margin: 20px auto;
  background: #fff;
  .container {
    max-width: 800px;
    padding: 0 15px;
    margin: 0 auto;
    .post-introduction {
      display: flex;
      align-items: center;
      margin-top: 80px;
      padding-bottom: 20px;
      border-bottom: 1px dashed #e3ecec;
      .post-up {
        flex: 0 0 45px;
        width: 45px;
        text-align: center;
        border: 1px solid #e3ecec;
        .post-good {
          border-bottom: 1px solid #e3ecec;
          cursor: pointer;
          &:hover {
            background: rgba(0, 0, 0, .1);
          }
          i {
            font-size: 20px;
            color: #000;
          }
          p {
            font-size: 12px;
            margin-bottom: 1px;
          }
        }
        .post-collect {
          border-bottom: 1px solid #e3ecec;
          cursor: pointer;
          &:hover {
            background: rgba(0, 0, 0, .1);
          }
        }
      }
      .post-content {
        margin-left: 20px;
        h2 {
          margin-bottom: 10px;
          font-size: 18px;
          color: #063642;
        }
        p {
          font-size: 14px;
          color: #58666e;
          @include no-wrap-number(2)
        }
        span {
          font-size: 10px;
          color: #999;
        }
      }
      .user-info {
        text-align: center;
        img {
          width: 32px;
          height: 32px;
        }
        p {
          font-size: 10px;
        }
      }
    }
    .post-tags {
      display: flex;
      flex-wrap: wrap;
      margin-top: 10px;
      span {
        margin: 0 20px;
        padding: 1px 10px;
        font-size: 12px;
        border: 1px solid #dee5e7;
        border-radius: 40px;
        box-shadow: 0 1px 1px rgba(90,90,90,0.1);
      }
    }
    .post-title-about {
      margin-top: 30px;
      h2 {
        margin-bottom: 30px;
        font-weight: 700;
      }
      .rich-title {
        display: flex;
        align-items: center;
        .rich-avatar {
          width: 40px;
          height: 40px;
          margin-right: 20px;
          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
        .rich-about {
          display: flex;
          flex-direction: column;
          cursor: pointer;
          .rich-text {
            display: flex;
            align-items: center;
            p {
              margin-right: 10px;
              font-size: 14px;
              color: #333;
            }
            span {
              padding: 0 10px;
              font-size: 12px;
              color: #fff;
              border-radius: 20px;
              background: #42c02e;
            }
          }
          .rich-amount {
            font-size: 10px;
            color: #969696;
          }
        }
      }
    }
    .rich-container {
      margin-top: 30px;
    }
    .comment {
      margin-top: 50px;
      h2 {
        font-size: 14px;
      }
      .comment-login {
        width: 100px;
        margin: 30px auto;
        text-align: center;
        color: #fff;
        font-size: 14px;
        line-height: 36px;
        background: #27c24c;
        border-radius: 2px;
        outline: 0 !important;
      }
      ul {
        font-size: 14px;
        li {
          display: flex;
          align-items: center;
          padding-bottom: 6px;
          margin-bottom: 10px;
          border-bottom: 1px solid #f0f0f0;
          .user-avatar {
            width: 50px;
            height: 50px;
            margin-right: 10px;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .user-content {
            font-size: 14px;
            span {
              font-size: 12px;
            }
          }
        }
      }
    }
  }
}
@media (min-width: 768px) {
  .container {
    width: 620px;
  }
}
</style>

