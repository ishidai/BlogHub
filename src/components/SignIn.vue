<template>
  <div id="Login">
    <el-form label-position="left" :model="form" status-icon :rules="rules" ref="form" label-width="90px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email"
                    :rules="[
              { required: true, message: '请输入邮箱地址', trigger: 'blur' },
              { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
        ]">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="form.pass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="form.checkPass" auto-complete="off"></el-input>
      </el-form-item>
      <el-button class="botton" type="success" @click="reg('form')">注册</el-button>
      <el-button class="botton" type="info" plain @click="resetFrom('form')">重置</el-button>
      <el-button class="botton" type="primary" @click="login">登录</el-button>
    </el-form>
  </div>
</template>

<script>
  import consts from "../constant/consts";

  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (value.length < 6) {
          callback(new Error('密码长度必须超过6位'));
        } else {
          if (this.form.checkPass !== '') {
            this.$refs.form.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.form.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        token: "",
        form: {
          pass: "",
          checkPass: "",
          email: "",
          username: ""
        },
        rules: {
          pass: [
            { required: true, validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { required: true, validator: validatePass2, trigger: 'blur' }
          ],
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
          ],
        }
      };
    },
    computed: {},
    components: {},
    methods: {
      reg(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const _this = this;
            this.axios.post(consts.signin, {
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
              timeout: 6000,
              auth: {
                email: `${_this.form.email}`,
                username: `${_this.form.username}`,
                password: `${_this.form.pass}`
              }
            }).then(response => {
              console.log(response.data);
              if (response.data.code === '500') {
                _this.$notify({
                  title: '提示',
                  message: `该邮箱已注册`,
                  duration: 0
                });
              } else if (response.data.code === '00') {
                _this.$notify({
                  title: '成功',
                  message: `恭喜您注册成功`,
                  duration: 0
                });
                _this.$router.push('login')
              }
            }).catch(function(error) {
              console.log(error);
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      },
      resetFrom(formName) {
        this.$refs[formName].resetFields();
      },
      login() {
        this.$router.push('login')
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
