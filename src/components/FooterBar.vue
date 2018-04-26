<template>
  <div class="uk-section uk-section-secondary  uk-light">
    <div class="uk-container">

      <h3>博客咖-博客聚合导航站</h3>

      <div class="uk-grid-match uk-child-width-1-3@m" uk-grid>
        <div>
          <p><a style="" href="https://toit.me">联系我们</a></p>
        </div>
        <div>
          <p><a style="" href="https://toit.me">关于我们</a></p>
        </div>
        <div>
          <p>&copy &nbsp2018 &nbspBokeka.com&nbsp版权所有</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {},
  components: {},
  methods: {}
};
</script>

<style scoped lang="scss">
  div.uk-section{
    background-color: rgba(0,101,206,0.9); 
    position:absolute;
    bottom:auto;
    width:100%;
    font-size: .12rem;
    h3{
      font-size: .14rem;
    }
  }
</style>
