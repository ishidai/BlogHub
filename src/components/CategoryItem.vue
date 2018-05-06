<template>
  <div class="category">
    <ul class="list">
      <li v-for="(category, index) in categories_list" :key="index">
        <router-link :to="{ name: 'list_category', params: { category_id: category.id }}" 
        @mouseenter="handleMouseenter($event, index)" @mouseleave="handleMouseleave($event, index)"> 
          <h3>{{ category.name }}</h3>
          <p>{{ category.description }}</p></router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import consts from "../constant/consts";
export default {
  data () {
    return {
      categories_list: []
    }
  },
  methods: {
    handleMouseenter (e, index) {
    },
    handleMouseleave (e, index) {
    }
  },
  created() {
    this.axios.get(consts.categories_list).then((res) => {
      this.categories_list = res.data.categories_list
    })
  }
}
</script>

<style lang="scss">
.category {
  max-width: 1024px;
  font-size: 1rem;
  margin: 6rem auto 0;
  .list {
    width: 100%;
    display: flex;
    justify-content: space-between;
    li {
      width: 16rem;
      height: 10rem;
      a{
        display: inline-block;
        width: 100%;
        height: 100%;
        line-height: 100%;
        text-align: center;
        background: url('../assets/images/category_item_img.jpeg');
        background-size: 100% 100%;
        color: #fff;
        text-decoration : none;
        h3 {
          color: #fff;          
          font-size: 1.3rem;
        }
      }
      a:hover {
        filter: blur(1px);
      }
    }
  }
}
</style>

