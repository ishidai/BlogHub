<template>
  <div>
    <el-col :xs="24" :sm="8" :md="6" :lg="4" :xl="4" v-for="(item, index) in blogs" :key="index">
      <div class="grid-content bg-purple">
        <div class="content-bg">
          <img src="../assets/images/11.jpg">
          <span>{{ item.name }}</span>
        </div>
        <div class="content-text">
          {{ item.description }}
        </div>
        <div class="content-footer">
          <div class="left-footer">
            <i class="el-icon-view"></i>
            <span>123</span>
          </div>
          <div class="right-footer">
            <i class="el-icon-star-on"></i>
            <span>321</span>
          </div>
        </div>
      </div>
    </el-col>
  </div>
</template>

<script>
  import consts from "../constant/consts";
    export default {
        data() {
            return {
              blogs: []
            }
        },
        computed: {},
        components: {
        },
        created() {
          this.axios.get(consts.blogs).then(response => {
            this.blogs = response.data.blogs
          })
        },
        methods: {
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

