<template>
  <div class="container">
    <el-row :gutter="16">
      <el-col :xs="24" :sm="24">
        <ul>
          <li v-for="(item, index) in arr" :key="index">
            <a href="#" @mouseenter="handleMouseenter($event, index)" @mouseleave="handleMouseleave($event, index)">
              <h3>结衣最帅</h3>
              <p>一晚只要998</p>
            </a>
            <!-- <div>
              <h3>结衣最帅</h3>
              <p>一晚只要998</p>
            </div> -->
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      arr: [1, 1, 1, 1, 1, 1, 1, 1]
    }
  },
  methods: {
    handleMouseenter (e, index) {
    },
    handleMouseleave (e, index) {
    }
  }
}
</script>

<style lang="scss">
.container {
  max-width: 1100px;
  margin: 200px auto 0;
  ul {
    width: 100%;
    li {
      position: relative;
      display: inline-block;
      width: 268px;
      height: 148px;
      margin: 4px 2px;
      a, div {
        display: inline-block;
        width: 100%;
        height: 100%;
        text-align: center;
        background: url('../assets/images/11.jpg');
        background-size: 100% 100%;
        color: #fff;
        text-decoration : none;
        h3 {
          color: #fff;          
          padding-top: 18%;
        }
      }
      a:hover {
        filter: blur(1px);
      }
      div {
        display: none;
        opacity: 0;
        position: absolute;
        left: 0;
        top: -100%;
        background: rgba(227,101,101,1);
        transition-duration: 300ms;
      }
    }
  }
}
</style>


