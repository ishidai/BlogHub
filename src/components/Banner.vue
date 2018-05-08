<template>
  <div class="banner">
    <el-carousel trigger="click" class="slider-container">
      <el-carousel-item  v-for="banner in bannerData" :key="banner.index">
        <div class="carousel">
          <img :src="banner.pic">
          <div class="carousel-text">
            <h3>{{banner.title}}</h3>
            <p>{{banner.description}}</p>
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
      bannerData:[
        {
          pic: "src/assets/images/banner-01.jpg",
          title: "博客咖-国内博客聚合导航站",
          description: "bokeka.com"
        },
        {
          pic: "src/assets/images/banner-02.jpg",
          title: "博客咖-国内博客聚合导航站",
          description: "bokeka.com"
        }
      ]
    }
  }
};
</script>

<style scoped lang="scss">
.banner {
  margin-top: 4rem;
  font-size: 1.2rem;
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
      font-size: 1.2rem;
      text-align: center;
      z-index: 1000;
      h3, p {
        color: #fff;
        font-size: 3.2rem;
      }
    }
  }
}
</style>
