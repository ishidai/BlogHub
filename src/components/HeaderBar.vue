<template>
  <div class="uk-background-primary uk-light ">
  <nav  uk-navbar>
    <div class="uk-navbar-left">
      <ul class="uk-navbar-nav">
        <li class="uk-active"><a href="/">发现</a></li>
        <li>
          <a href="#">Parent</a>
          <div class="uk-navbar-dropdown">
            <ul class="uk-nav uk-navbar-dropdown-nav">
              <li class="uk-active"><a href="/">Active</a></li>
              <li><a href="#">Item</a></li>
              <li><a href="#">Item</a></li>
            </ul>
          </div>
        </li>
        <li><a href="/">Item</a></li>
      </ul>

    </div>

    <div class="uk-navbar-right">

      <ul class="uk-navbar-nav">
        <li v-if="isPublish" style="margin-right: 20px">
          <button class="uk-button uk-button-primary" @click="commitPost">发布</button>
        </li>
        <li v-if="!isLogin" style="margin-right: 20px">
          <button class="uk-button uk-button-default" uk-toggle @click="login">登录</button>
        </li>
        <li v-else-if="isLogin && !isPublish">
          <a href="#" style="font-weight: bold">{{ user.username }}</a>
          <div class="uk-navbar-dropdown">
            <ul class="uk-nav uk-navbar-dropdown-nav">
              <li class="uk-active"><a href="javascript:" @click="publish()"  >投稿</a></li>
              <li><a href="javascript:" @click="logout()"  >登出</a></li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </nav></div>
</template>

<script>
  import constans from '../constant/consts'
    export default {
        props: {
            isLogin: Boolean,
            isPublish: Boolean,
        },
        data() {
            return {
                user: {}
            }
        },
        computed: {

        },
        components: {
        },
        methods: {
          login() {
              this.$router.push('login')
          },
          publish() {
            this.$router.push('post')
          },
          commitPost() {
            this.$emit('commitActicle')
          },
          logout() {
            this.axios.get(constans.logout).then((res) => {
                window.localStorage.clear()
                window.location.reload()
            })
          }
        },
        created() {
        },
        mounted() {
          const _this = this
          if (this.isLogin) {
            const token = window.localStorage.getItem("token")
            this.axios.get(constans.user, {
              timeout: 6000,
              auth: {
                username: token
              }
            }).then((res) => {
              _this.user = res.data
            })
          }
        }
    }
</script>

<style scoped>

</style>
