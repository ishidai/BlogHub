<template>
  <div class="main-content-body">
  <div v-if="!isLoading" >


    <div class="content-list" v-for="item in lists">
      <div class="content-left"><img src="../style/images/avatar.jpg" width="50px" height="50px" class="img-avatar"/></div>
      <div class="content-body">
        <span class="uk-text-muted uk-text-nowrap">{{ item.title }}</span><br/>
        <span class="uk-text-muted">by <a class="uk-text-primary">{{ item.username }}</a>
        发表于：2111111</span>
      </div>
      <div class="content-right">点赞</div>
    </div>


  </div>
  <div v-else>
    <!--<div uk-spinner></div>-->
  </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Row } from "element-ui";
import { Tag } from "element-ui";
Vue.component(Row.name, Row);
Vue.component(Tag.name, Tag);
import { mapGetters } from "vuex";
export default {
  props: {
    isLoading: Boolean,
    lists: Array
  },
  data() {
    return {};
  }
};
</script>

<style scoped lang="scss">
.content-list {
  min-width: 600px;
  width: 100%;
  min-height: 68px;
  border-bottom: 1px solid #f0f0f0;
}

.content-left {
  width: 10%;
  min-height: 68px;
  float: left;
  text-align: center;
}

.content-body {
  min-height: 68px;
  width: auto;
  float: left;
}

.content-right {
  float: right;
  min-height: 68px;
}

.img-avatar {
  border-radius: 120px;
  height: 50px;
}
</style>
