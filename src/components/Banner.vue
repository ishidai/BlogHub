<template>
  <div class="uk-position-relative uk-visible-toggle uk-light" uk-slideshow="animation: push; max-height: 250">

    <ul class="uk-slideshow-items">
      <li>
        <div class="uk-position-cover" uk-slideshow-parallax="scale: 1.2,1.2,1">
          <img src="../style/images/banner-01.jpg" alt="" uk-cover>
        </div>
        <div class="uk-position-cover" uk-slideshow-parallax="opacity: 0,0,0.2; backgroundColor: #000,#000"></div>
        <div class="uk-position-center uk-position-medium uk-text-center">
          <div uk-slideshow-parallax="scale: 1,1,0.8">
            <h2 uk-slideshow-parallax="x: 200,0,0">bokeka.com</h2>
            <p uk-slideshow-parallax="x: 400,0,0;">博客咖-国内博客聚合导航站</p>
          </div>
        </div>
      </li>
      <li>
        <div class="uk-position-cover" uk-slideshow-parallax="scale: 1.2,1.2,1">
          <img src="../style/images/banner-02.jpg" alt="" uk-cover>
        </div>
        <div class="uk-position-cover" uk-slideshow-parallax="opacity: 0,0,0.2; backgroundColor: #000,#000"></div>
        <div class="uk-position-center uk-position-medium uk-text-center">
          <div uk-slideshow-parallax="scale: 1,1,0.8">
            <h2 uk-slideshow-parallax="x: 200,0,0">bokeka.com</h2>
            <p uk-slideshow-parallax="x: 400,0,0;">博客咖-国内博客聚合导航站</p>
          </div>
        </div>
      </li>
      <li>
        <div class="uk-position-cover" uk-slideshow-parallax="scale: 1.2,1.2,1">
          <img src="../style/images/banner-02.jpg" alt="" uk-cover>
        </div>
        <div class="uk-position-cover" uk-slideshow-parallax="opacity: 0,0,0.2; backgroundColor: #000,#000"></div>
        <div class="uk-position-center uk-position-medium uk-text-center">
          <div uk-slideshow-parallax="scale: 1,1,0.8">
            <h2 uk-slideshow-parallax="x: 200,0,0">bokeka.com</h2>
            <p uk-slideshow-parallax="x: 400,0,0;">博客咖-国内博客聚合导航站</p>
          </div>
        </div>
      </li>
    </ul>

    <a class="uk-position-center-left uk-position-small uk-hidden-hover" href="#" uk-slidenav-previous uk-slideshow-item="previous"></a>
    <a class="uk-position-center-right uk-position-small uk-hidden-hover" href="#" uk-slidenav-next uk-slideshow-item="next"></a>
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

</style>
