<template>
  <div style="background:#fff; position: relative;">
    <Header></Header>
    <div class="main init-height">
      <div class="container">
        <left-nav :dianzanActive="true"></left-nav>
        <!-- End 博客title and about -->
        <div class="post-title-about">
          <h1>{{ post.title }}</h1>
          <div class="rich-title">
            <p></p>
            <Avatar :avatarUrl="post.avatar_url" :userName="post.username"></Avatar>
            <div class="rich-about">
              <div class="rich-text">
                <p>{{ post.username }}</p>
                <el-button class="follow" :type='getFollowState' round @click="getFollowState == 'success' ? unfollow(post.username) : follow(post.username) ">{{ getFollowState == 'success' ? '已关注' : '关注'}}</el-button>
              </div>
              <div class="rich-amount">
                {{ postDate(post.time) }}
              </div>
            </div>
          </div>
        </div>
        <!-- End 博客title and 关于 -->

        <!-- 富文本区域 -->
        <div class="rich-container" v-html="post.body">
        </div>
        <!-- End 富文本区域 -->

        <!-- 评论区域 -->
        <div class="comment">
          <h2>评论 ({{ totalCount }})</h2>
          <div class="comment-login" v-if="!isLogin">登录后评论</div>
          <div class="comment-text" v-else>
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入评论内容"
              v-model="textarea">
            </el-input>
            <el-button class="comment-commit" type="primary" @click="commitComment">提交评论</el-button>
          </div>
          <ul>
            <li v-for="(item, index) in comments" :key="index">
              <div class="user-avatar">
                <Avatar :avatarUrl="item.avatar_url" :userName="item.username"></Avatar>
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
    <Footer></Footer>
  </div>
</template>
<script>
import Vue from "vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import LeftNav from "@/components/LeftNav";
import consts from "../constant/consts";
import { Input } from "element-ui";
import Avatar from "../components/user/Avatar.vue"

Vue.component(Input.name, Input);

export default {
  data() {
    return {
      // 文章相关
      post: {},
      // 评论框内容
      textarea: '',
      // 评论列表
      comments: [],
      // 评论条数
      totalCount: '',
      btnType: 'primary'
    };
  },
  computed: {
    isLogin() {
      return this.$store.state.users.isLogin
    },
    getCurrentUser() {
      return this.$store.state.users.user
    },
    getFollowState() {
      return this.btnType
    }
  },
  components: {
    Header,
    Footer,
    Avatar,
    LeftNav
  },
  created () {
    const _this = this;
    const arr = [
      consts.content,
      this.$route.params.id
    ];
    const postUrl = arr.join('');
    this.axios.get(postUrl).then(response => {
      _this.post = response.data
      this.isFollow(_this.post.username);
    })

    this.axios.get(`/api/common/v1.0/posts/${this.$route.params.id}/comments/`)
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
        window.location.reload();
      })
      .catch(function(error) {
        console.log(error);
      });
    },
    follow(username) {
      const _this = this;
      this.axios.post(`${consts.follow}/${username}`, {
              timeout: 6000,
              auth: { 
                username: this.$store.state.users.token 
              }
            }).then((res) => {
              if(res.data.code == 200) {
                  _this.btnType = "success";
              } else if (res.data.code == 211) {
                  _this.btnType = "success";
              }
            }).catch((err) => {
              console.log(err)
          })
    },
    isFollow(username) {
      const _this = this;
      this.axios.post(`${consts.is_follow}/${username}`, {
              timeout: 6000,
              auth: {
                username: this.$store.state.users.token 
              }
            }).then((res) => {
              if(res.data.code == 200) {
                  _this.btnType = "success";
              } else {
                  _this.btnType = "primary";
              }
            }).catch((err) => {
              console.log(err)
          })
    },
    unfollow(username) {
      const _this = this;
      this.axios.post(`${consts.unfollow}/${username}`, {
              timeout: 6000,
              auth: { 
                username: this.$store.state.users.token 
              }
            }).then((res) => {
              if(res.data.code == 200) {
                  _this.btnType = "primary";
              } else if (res.data.code == 212) {
                  _this.btnType = "primary";
              }
            }).catch((err) => {
              console.log(err)
          })
    }
  }
};
</script>

<style scoped lang="scss">
@import "~scss/mixin";
.main {
  margin: 50px auto;
  background: #fff;
  .container {
    position: relative;
    max-width: 800px;
    padding: 0 15px;
    margin: 20px auto;
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
      margin-top: 50px;
      padding-top: 50px;
      h2 {
        margin-bottom: 30px;
        font-weight: 700;
      }
      .rich-title {
        display: flex;
        align-items: center;
        margin-top: 40px;
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
            .follow {
              height: 30px;
              line-height: 6px;
            }
          }
          .rich-amount {
            font-size: 10px;
            color: #969696;
            margin-top: 10px;
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
      .comment-text {
        margin-top: 15px;
        text-align: right;        
        .comment-commit {
          margin: 15px 0 0 0;
          font-size: 12px;
        }
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
              border-radius: 50%;
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

