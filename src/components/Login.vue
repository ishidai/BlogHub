<template>
  <div id="Login">
    <el-form label-position="left" :model="from" status-icon :rules="rules" ref="from" label-width="90px" class="demo-ruleForm">
      <el-form-item label="账号或邮箱" prop="user">
        <el-input v-model="from.user"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="from.pass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="from.checkPass" auto-complete="off"></el-input>
      </el-form-item>
      <div class="login-method">
        <el-button class="botton1" type="primary" @click="login">登录</el-button>
        <a class="botton1" href="http://67.218.140.125:5000/api/v1.0/login/github">
          <el-button type="success">gitHub登录</el-button>
        </a>
      </div>
      <el-button class="botton" type="info" plain @click="resetFrom('from')">重置</el-button>
      <el-button class="botton" type="success">注册</el-button>
    </el-form>
  </div>
</template>

<script>
import consts from "../constant/consts";
export default {
  data() {
    var checkUser= (rule, value, callback) => {
        if (!value) {
          return callback(new Error('账号不能为空'));
        }
        setTimeout(() => {
          if (value.length < 8) {
            callback(new Error('账号必须大于8位'));
          } else {
            callback();
          }
        }, 1000);
      };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.from.checkPass !== '') {
          this.$refs.from.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.from.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      emailName: "",
      pwd: "",
      token: "",
      from: {
        pass: "",
        checkPass: "",
        user: ""
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        user: [
          { validator: checkUser, trigger: 'blur' }
        ]
      }
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
    },
    resetFrom(formName) {
      this.$refs[formName].resetFields();
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
