<template>
<div>
  <Header></Header>
  <CategoryItem class="init-height"></CategoryItem>
  <Footer></Footer>
</div>
</template>

<script>
import Header from "../components/Header.vue";
import CategoryItem from "../components/CategoryItem.vue";
import Footer from "../components/Footer.vue";
export default {
  data () {
    return {};
  },
  components: {
    Header,
    CategoryItem,
    Footer
  }
}
</script>
