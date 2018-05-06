<template>
  <div class="footer">
    <h3 class="item">博客咖-博客聚合导航站</h3>
    <div class="footer-menu item">
      <a style="" href="https://toit.me">联系我们</a>
      <a style="" href="https://toit.me">关于我们</a>
      <a style="" href="https://toit.me">反馈建议</a>
    </div>
    <p>&copy; &nbsp;2018 &nbsp;Bokeka.com&nbsp;版权所有</p>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style scoped lang="scss">
  .footer{
    background-color: rgba(0,101,206,0.9);
    padding: 2rem;
    font-size: 1.3rem;
    margin-top: 1.0rem;
    h3{
      font-size: 1.8rem;
    }
    .footer-menu{
      display: flex;
      justify-content: space-between;
    }
    p{
      text-align: center;
    }
    .item{
      max-width: 1024px;
      margin: 0 auto;
      height: 4rem;
    }
  }
</style>
