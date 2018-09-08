<template>
  <div class="rich-avatar">
    <img  v-if="avatarUrl" class="profile-pic" :src="avatarUrl" alt="头像">
    <v-gravatar v-else :email="userName" class="profile-pic"/>
  </div>
</template>

<script>
import Vue from "vue";
import Gravatar from 'vue-gravatar';

Vue.component('v-gravatar', Gravatar);

export default {
    props: {
        avatarUrl: String,
        userName: String
    },
    data() {
        return {
            
        }
    }
};
</script>

<style scoped lang="scss">
    .rich-avatar {
          width: 40px;
          height: 40px;
          margin-right: 20px;
          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }

</style>
