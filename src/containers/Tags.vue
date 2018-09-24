<template>
<div class="tag_body">
  <Header></Header>
  <Tag></Tag>
  <Footer></Footer>
</div>
</template>

<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import Tag from "../components/Tag.vue"

export default {
  data () {
    return {};
  },
  components: {
    Header,
    Footer,
    Tag
  }
}
</script>

<style scoped>
.tag_body {
  background: #FFF;
}
</style>

