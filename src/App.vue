<template>
<div id="app">
  <router-view></router-view>
</div>
</template>

<script>
export default {
  // 😒
  name: 'app',
  components: {
  },
  data() {
    return {};
  },
}
</script>

<style lang="scss">
.init-height {
  min-height: 600px;
}
</style>
