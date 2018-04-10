<template>
  <div>
    <el-col :xs="24" :sm="8" :md="6" :lg="4" :xl="4" v-for="(item, index) in blogs" :key="index">
      <div class="grid-content bg-purple" >
        <div class="content-bg">
          <img v-bind:src="item.img" v-if="item.img">
          <img src="../assets/images/11.jpg" v-else>
          <span><a v-on:click="clickCount(item.id)" target="_blank" :href="`http://${item.url}`">{{ item.name }}</a></span>
          <!--<span><router-link v-on:click.native="clickCount" to="`http://${item.url}`">{{ item.name }}</router-link></span>-->
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
.bg-purple {
  padding: 0 3%;
  background: #fff;
  .content-bg {
    margin: 5%;
    width: 100%;
    img {
      width: 30px;
      height: 30px;
    }
    span {
      margin-left: 8px;
      font-size: 12px;
      font-weight: bold;
    }
  }
  .content-text {
    margin: 5%;
    text-align: left;
    font-size: 12px;
  }
  .content-footer {
    display: flex;
    justify-content: space-between;
    margin: 5% 5% 0;
    font-size: 10px;
  }
}
.grid-content {
  margin-bottom: 5%;
  border-radius: 10px;
  min-height: 100px;
  padding: 6px;
  transition: 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
  &:hover {
    transform: scale(1.1);
  }
}
</style>
