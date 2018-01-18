<template>
  <div style="background:#fff;">
    <HeaderBar></HeaderBar>
    <div class="main">
      <div class="container">
        <!-- 博客介绍区域 -->
        <div class="post-introduction">
          <div class="post-up">
            <div class="post-good">
              <i class="iconfont icon-dianzan"></i>
              <p>130</p>
            </div>
            <div class="post-collect">
              <i class="iconfont icon-favorite"></i>
            </div>
          </div>
          <div class="post-content">
            <h2>Java 并发思考：导读 & 总结篇</h2>
            <p>Java并发思考该篇作为本文集的导读目录，将现有9篇关于Java并发的文章的核心内容整理并列出。这9篇文章大体上将Java并发的体系简述了一遍，对我个人是一次知识上的梳理，对大Java并发思考该篇作为本文集的导读目录，将现有9篇关于Java并发的文章的核心内容整理并列出。这9篇文章大体上将Java并发的体系简述了一遍，对我个人是一次知识上的梳理，对大
            </p>
            <span>jianshu.com  by 登高且赋 </span>
          </div>
          <div class="user-info">
            <img src="../assets/images/11.jpg">
            <p>Android与kotlin成长之路</p>
          </div>
        </div>
        <!-- End 博客介绍区域 -->        
        <!-- 博客标签区域 --> 
        <div class="post-tags">
          <span>闸瓦</span>
          <span>js</span>
          <span>贱婢</span>
        </div>       
        <!-- End 博客标签区域 -->        
        <!-- End 博客title and about -->        
        <div class="post-title-about">
          <h2>踏浪前行 | 徒步逆行世界上最长的海滨栈道</h2>
          <div class="rich-title">
            <div class="rich-avatar">
              <img src="../assets/images/11.jpg">
            </div>
            <div class="rich-about">
              <div class="rich-text">
                <p>白昼黯淡了星光</p>
                <span>+关注</span>
              </div>
              <div class="rich-amount">
                2018.01.17 18:45* 字数 787 阅读 21311评论 115喜欢 278赞赏 2
              </div>
            </div>
          </div>
        </div>
        <!-- End 博客title and 关于 -->      

        <!-- 富文本区域 -->
        <div class="rich-container">
              <img src="../assets/images/11.jpg">
              <img src="../assets/images/11.jpg">
              <img src="../assets/images/11.jpg">
              <img src="../assets/images/11.jpg">
              <img src="../assets/images/11.jpg">
        </div>      
        <!-- End 富文本区域 -->      
        
        <!-- 评论区域 -->
        <div class="comment">
          <h2>评论 (3)</h2>
          <div class="comment-login">登录后评论</div>
          <ul>
            <li v-for="(item, index) in 5" :key="index">
              <div class="user-avatar">
                <img src="../assets/images/11.jpg">
              </div>
              <div class="user-content">
                <span>王辉的博客 2017-12-06 01:32</span>
                <p>多谢分享</p>
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
export default {
  data() {
    return {};
  },
  computed: {},
  components: {
    HeaderBar,
    FooterBar
  },
  created () {
  },
  methods: {}
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
      text-align: center;
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
    width: 750px;
  }
}
</style>

