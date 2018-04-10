<template>
  <div class="banner">
    <el-carousel trigger="click" height="300px">
      <el-carousel-item>
        <div class="carousel">
          <img src="../style/images/banner-01.jpg">
          <div class="carousel-text">
            <h3>博客咖-国内博客聚合导航站</h3>
            <p>bokeka.com</p>
          </div>
        </div>
      </el-carousel-item>
      <el-carousel-item>
        <div class="carousel">
          <img src="../style/images/banner-02.jpg">
          <div class="carousel-text">
            <h3>博客咖-国内博客聚合导航站</h3>
            <p>bokeka.com</p>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      defaultValue: ""
    };
  },
  computed: {},
  components: {},
  methods: {
    confirm() {}
  }
};
</script>

<style scoped lang="scss">
.banner {
  font-size: .12rem;
  .carousel {
    width: 100%;
    height: 100%;
    position: relative;
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    .carousel-text {
      width: 80%;
      margin: 0 auto;
      position: relative;
      padding-top: 10%;      
      font-size: .12rem;
      text-align: center;
      z-index: 1000;
      h3, p {
        color: #fff;
        font-size: .32rem;
      }
    }
  }
}
</style>
