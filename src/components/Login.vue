<template>
  <div>
    <div class="uk-grid-collapse" uk-grid>
      <div class="uk-background-cover" uk-height-viewport></div>
      <div class="uk-padding-large">
        <form>
          <div class="uk-margin">
            <div class="uk-inline">
              <span class="uk-form-icon" uk-icon="icon: user"></span>
              <input class="uk-input uk-width-3-1" v-model="emailName" type="text" placeholder="请输入邮箱名">
            </div>
          </div>

          <div class="uk-margin">
            <div class="uk-inline">
              <span class="uk-form-icon" uk-icon="icon: lock"></span>
              <input class="uk-input uk-width-3-1" type="password" v-model="pwd" placeholder="请输入密码">
            </div>
          </div>

          <div class="uk-margin">
            <div class="uk-inline">
              <button class="uk-button uk-button-primary" style="width: 226px" @click="login">登录</button>
            </div>
            <div class="uk-inline">
              <a href="http://localhost:5000/api/v1.0/login/github">
                <el-button type="success" class="uk-button uk-button-primary">Github登录</el-button>
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import consts from "../constant/consts";
export default {
  data() {
    return {
      emailName: "",
      pwd: "",
      token: ""
    };
  },
  computed: {},
  components: {},
  methods: {
    login() {
      const _this = this;
      this.axios
        .get(consts.login, {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          timeout: 6000,
          auth: {
            username: `${_this.emailName}`,
            password: `${_this.pwd}`
          }
        })
        .then(response => {
          _this.token = response.data.token;
          window.localStorage.setItem("token", _this.token);
          this.$store.dispatch("commitToken", _this.token);
          if (_this.token) {
            _this.$router.push("/");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    loginGithub() {
      this.axios
        .get('/api/v1.0/login/github')
        .then(response => {
          console.log('daixin', response.data)
        }).catch((err) => {
          console.log(err)
      })
    }
  }
};
</script>

<style scoped lang="scss">
/*.uk-background-cover {*/
/*background-image: url("../style/images/login.jpg");*/
/*}*/
.uk-padding-large {
  padding: inherit;
  text-align: center;
  width: 100%;
  margin-top: 150px;
}
</style>
