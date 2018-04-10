<template>
<div>
  <header-bar></header-bar>
  <div class="container">
    <el-row :gutter="16">
      <el-col :xs="24" :sm="24">
        <ul>
          <li v-for="(category, index) in categories_list" :key="index">
            <router-link :to="{ name: 'list_category', params: { category_id: category.id }}" 
            @mouseenter="handleMouseenter($event, index)" @mouseleave="handleMouseleave($event, index)"> 
             <h3>{{ category.name }}</h3>
              <p>{{ category.description }}</p></router-link>
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
</div>
</template>

<script>
import consts from "../constant/consts";
import HeaderBar from "./HeaderBar.vue";
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
  },
  components: {
    HeaderBar
  },
}
</script>

<style lang="scss">
.container {
  max-width: 1100px;
  margin: 50px auto 0;
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
        background: url('../assets/images/category_item_img.jpeg');
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


