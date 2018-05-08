<template>
  <div>
    <el-col :xs="24" :sm="8" :md="6" :lg="4" :xl="4" v-for="(item, index) in blogs" :key="index">
      <div class="grid-content bg-purple" >
        <div class="content-bg">
          <img v-bind:src="item.img" v-if="item.img">
          <img src="../assets/images/11.jpg" v-else>
          <span><a v-on:click="clickCount(item.id)" target="_blank" :href="`http://${item.url}`">{{ item.name }}</a></span>
        </div>
        <div class="content-text">
          {{ item.description }}
        </div>
        <div class="content-footer">
          <div class="left-footer">
            <i class="el-icon-view"></i>
            <span>{{ item.num_view }}</span>
          </div>
          <div class="right-footer" @click="collectBlog(item.id, index)">
            <a><i :class="item.is_collect ? 'el-icon-star-on' : 'el-icon-star-off'"></i></a>
            <span>{{ item.collect_num }}</span>
          </div>
        </div>
      </div>
    </el-col>
  </div>
</template>

<script>
  import consts from "../constant/consts";
    export default {
        props:{
          selectCategoryId: Number
        },
        data() {
            return {
              blogs: [],
              isCollect: false
            }
        },
        computed: {},
        components: {
        },
        created() {
          let user_id = window.localStorage.getItem('user_id')
          // 如果取出的user_id没有值说明登录失败或者还没登录就直接取默认值
          if (!user_id) {
            user_id = 0;
          }
          this.axios.get(`${consts.show_blogs}/${user_id}/${this.selectCategoryId}`).then(response => {
            this.blogs = response.data.blogs
          }).catch(err => {
            console.log(err);
          });
        },
        methods: {
          clickCount(id) {
            this.axios.get(`${consts.blogs}${id}`)
          },
          collectBlog(id, index) {
            this.axios.get(`${consts.collect}/${id}`, {
              timeout: 6000,
              auth: {
                username: this.$store.state.users.token
              }
            }).then((res) => {
              this.$set(this.$data.blogs[index], 'collect_num', res.data.count)
              this.$set(this.$data.blogs[index], 'is_collect', res.data.isCollect)
            })
            console.log('collectBlog')
          }
        },
    }
</script>

<style lang="scss" scoped>
@import "~scss/variable";
.bg-purple {
  padding: 0;
  background: #fff;
  font-size: 1.2rem;
  @media screen and ($sm) {
    border-bottom: 1px solid #F0F0F0; 
  }
  .content-bg {
    img {
      width: 6rem;
      height: 6rem;
      border-radius: 5px;
    }
    span {
      margin-left: 1rem;
      font-weight: bold;
    }
  }
  .content-text {
    margin-top: 1rem;
  }
  .content-footer {
    display: flex;
    justify-content: space-between;
    margin: 1rem 1rem 1rem 0;
    font-size: 10px;
  }
}
.grid-content {
  min-height: 100px;
  padding: 6px;
  transition: 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
  &:hover {
    transform: scale(1.1);
  }
}

</style>
