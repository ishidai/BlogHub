<template>
	<div class="left-nav">
    <div class="content">
      <div class="item" @click="dianzan">
        <i class="iconfont" :class="dianzanActive === true ? 'icon-dianzanActive' : 'icon-dianzan'"></i>
        <span>({{ voteCount }})</span>
      </div>
      <div class="item" @click="star">
        <i class="iconfont" :class="starActive === true ? 'icon-starActive' : 'icon-star'"></i>
      </div>
      <div class="item" @click="share">
        <i class="iconfont icon-fenxiang"></i>
      </div>
    </div>
	</div>
</template>

<script>
export default {
  props: {
    dianzanActive: {
      default: false,
      type: Boolean
    },
    voteCount:{
      default: "0",
      type: String
    },
    starActive: {
      default: false,
      type: Boolean
    }
  },
	data () {
    return {
		}
  },
  methods: {
    dianzan () {
      this.$emit('on-vote')
    },
    star () {
      this.$emit('on-favorite')
    },
    share () {
      this.$emit('share')
    }
  }
}
</script>

<style lang="scss" scoped>
.left-nav{
  position: fixed;
  width: 60px;
  top: 16%;
  left: 22%;
  z-index: 10000;
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 14px 8px;
    background-color: aliceblue;
    border-radius: 8px;
    .item {
      padding: 6px;
      .iconfont {
        font-size: 20px;
      }
      .iconfont.active {
        color: #000;
      }
    }
  }
}
</style>
