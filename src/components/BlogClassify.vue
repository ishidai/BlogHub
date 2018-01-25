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

<style scoped>

</style>
