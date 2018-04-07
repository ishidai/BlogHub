<template>
<div>
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
            <span class="underline">{{ item.comment_user_last }} 回复</span>
            <span> • 发表时间：{{ postDate(item.timestamp) }}</span>
            <span> • 阅读量：{{ item.num_view }}</span>
            </p>
            <p>
            <span><el-tag v-for="(tag,i) in item.tags" :key="i">{{ tag }}</el-tag> &nbsp;</span>
            </p>
        </div>
        </div>
        <div class="main-witch-number">
        <span>{{ item.comment_count }}</span>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: {
        posts: Array
    },
    data() {
        return {
        }
    },
    methods: {
        postDate(date) {
            return this.$moment(date).format('YYYY-MM-DD HH:mm:ss');
        }
    },
    created() {
        console.log('aaaaa===>', this.posts)
    }
  
}
</script>

<style scoped lang="scss">
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
</style>


