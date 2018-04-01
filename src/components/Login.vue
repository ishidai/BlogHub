<template>
  <div id="Login">
    <el-form label-position="left" :model="form" status-icon  ref="form" label-width="90px" class="demo-ruleForm">
      <el-form-item label="邮箱" prop="email"
                    :rules="[
              { required: false, message: '请输入邮箱地址', trigger: 'blur' },
              { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
        ]">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="form.pwd" auto-complete="off"></el-input>
      </el-form-item>
      <el-button class="botton" type="primary" @click="login('form')">登录</el-button>
      <a  class="botton1" href="http://127.0.0.1:5000/api/v1.0/login/github">
        <el-button class="botton" type="success">gitHub登录</el-button>
      </a>
      <el-button class="botton" type="info" plain @click="resetFrom('form')">重置</el-button>
      <el-button class="botton" type="success" @click="reg">注册</el-button>
    </el-form>
  </div>
</template>

<script>
  import * as types from '../store/mutation-types'
import consts from "../constant/consts";
export default {
  data() {
    return {
      token: "",
      form: {
        pwd: "",
        email: ""
      },
    };
  },
  computed: {},
  components: {},
  methods: {
    login(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const _this = this;
          this.axios.get(consts.login, {
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
              timeout: 6000,
              auth: {
                username: `${_this.form.email}`,
                password: `${_this.form.pwd}`
              }
            }).then(response => {
              console.log('user --->', response.data);
              _this.token = response.data.token;
              window.localStorage.setItem("token", _this.token);
              this.$store.dispatch("commitToken", _this.token);
              this.$store.dispatch("saveUserId", response.data.user_id);
              if (_this.token) {
                _this.$store.commit(types.IS_LOGIN)
                _this.$router.push("/");
              }
            }).catch(function(error) {
              console.log(error);
            });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetFrom(formName) {
      this.$refs[formName].resetFields();
    },
    reg() {
        this.$router.push('signin')
    }
  }
};
</script>

<style scoped lang="scss">
#Login {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 300px;
  transform: translate3d(-50%, -50%, 0);
  .login-method {
    width: 95%;
    margin: 20px auto 0;
    display: flex;
    justify-content: space-between;
  }
  .botton {
    display: block;
    width: 95%;
    margin: 20px auto 0;
  }
}
</style>
