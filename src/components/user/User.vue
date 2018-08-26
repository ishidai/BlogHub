<template>
  <el-container>
        <el-header><Header></Header></el-header>
        <el-main>
            <el-row :gutter="10">
  <el-col :xs="6" :sm="4" :md="3" :lg="6" :xl="6">
      <div class="hidden-xs-only">
      <img/>
      </div>
  </el-col>
  <el-col :xs="24" :sm="16" :md="18" :lg="12" :xl="12">
      <div class="user-settings-interface">
      <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="头像">
      <el-upload
        class="avatar-uploader"
        action="//up.qiniup.com"
        type="drag"
        :before-upload="beforeUpload"
        :auto-upload="true"
        :headers="avatarTokenHeaders"
        :show-file-list="false"
        :on-success="handleSuccess"
        :data="form">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
  </el-form-item>
  <el-form-item label="UID">
    <el-input v-model="form.uid" disabled></el-input>
  </el-form-item>
    <el-form-item label="用户名">
    <el-input v-model="form.username" disabled></el-input>
  </el-form-item>
  <el-form-item label="昵称">
    <el-input v-model="form.name" ></el-input>
  </el-form-item>
    <el-form-item label="个人主页">
    <el-input v-model="form.homeUrl" ></el-input>
  </el-form-item>
      <el-form-item label="职业">
    <el-input v-model="form.career" ></el-input>
  </el-form-item>
    <el-form-item label="城市">
    <el-input v-model="form.address" ></el-input>
  </el-form-item>

  <el-form-item label="性别">
    <el-radio-group v-model="form.sex">
      <el-radio label="男"></el-radio>
      <el-radio label="女"></el-radio>
      <el-radio label="其他"></el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="个人简介">
    <el-input type="textarea" v-model="form.desc"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">保存</el-button>
    <el-button>重置</el-button>
  </el-form-item>
</el-form>
      </div>
  </el-col>
  <el-col :xs="6" :sm="4" :md="3" :lg="6" :xl="6"><div class="hidden-xs-only"> </div></el-col>
</el-row>
        </el-main>
  </el-container>
</template>

<script>
  import consts from "../../constant/consts";
  import Header from "../../components/Header.vue";
  import utils from '../../utils/utils'

export default {
  data() {
    return {
      form: {
          // 昵称
          name: '',
          // 性别
          sex: '',
          // 个人简介
          desc: '',
          // uid 会员唯一标识
          uid: '',
          // 用户名（不可更改）
          username: '',
          // 地址
          address: '',
          // 职业
          career: '',
          // 个人主页
          homeUrl: ''
        },
        // 上传用户头像需要上传token识别用户
        avatarTokenHeaders: {},
        imageUrl: '',
        bucketHost: consts.base_upload_img_address,
    }
  },
  computed: {
    getUser() {
      return this.$store.state.users.user
    }
  },
  components: {
      Header
  },
  created() {
    utils.getUserInfo().then(user => {
      // 昵称
      this.form.name = user.nick_name
      // 性别
      this.form.sex = user.sex,
      // 个人简介
      this.form.desc = user.about_me,
      // uid 会员唯一标识
      this.form.uid = user.id,
      // 用户名（不可更改）
      this.form.username = user.username,
      // 地址
      this.form.address = user.location,
      // 职业
      this.form.career = user.career,
      // 个人主页
      this.form.homeUrl = user.home_url,
      // 缩略图
      this.imageUrl = user.avatar_url
    })
  },
  mounted() {
    this.uploadHeaders()
  },
  methods: {
    getToken: async function(key) {
        const _this = this
        return new Promise((resolve) => {
          this.axios.get(`/api/v1.0/user/atavar/token/${key}`, {
              timeout: 6000,
              auth: {
                username: this.$store.state.users.token
              }
            })
            .then((res) => {
              _this.form.key = key
              _this.form.token = res.data.token
              resolve()
            }).catch((err) => {
              console.log(err)
          })
        })
      },
    generateUUID() {
        let d = new Date().getTime();
        let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          let r = (d + Math.random()*16)%16 | 0
          d = Math.floor(d/16)
          return (c=='x' ? r : (r&0x7|0x8)).toString(16)
        })
        return uuid
      },
    uploadHeaders() {
      const token = window.localStorage.getItem("token");
      this.avatarTokenHeaders = {
        'token': token
      }
    },
    onSubmit() {
      const _this = this;
      this.axios.post(consts.update_user_info, {
          // 昵称
          name: this.form.name,
          // 性别
          sex: this.form.sex,
          // 个人简介
          desc: this.form.desc,
          // 地址
          address: this.form.address,
          // 职业
          career: this.form.career,
          // 个人主页
          homeUrl: this.form.homeUrl,
          // 头像缩略图
          imageUrl: this.imageUrl
        })
        .then(function(response) {
          console.log('aaa--->', response.status)
          if (response.status === 201) {
            _this.$router.push("/");
            _this.loginSucc();
          } else if (response.status === 200) {
            _this.$message({
              message: '修改资料成功',
              type: 'success'
            });
            setTimeout("location.reload();", 300)
          }
        })
        .catch(function(error) {
          console.log(error);
        });

      console.log('imgUrl!', this.imageUrl);
      console.log('submit!', this.form);
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    handleSuccess(res, file, fileList) {
      console.log('handleSuccess')
      this.imageUrl = `${this.bucketHost}${res.key}`
    },
    beforeUpload: async function(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }

      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }

      if (isJPG && isLt2M) {
        let currentTime = this.$moment().format('YYYYMMDDHHmmss').toString()
        let prefixTime = this.$moment(file.lastModifiedDate).format('HHmmss').toString()
        let key = encodeURI(`${currentTime}_${prefixTime}${this.generateUUID()}`)
        await this.getToken(key)
        return true;
      } else {
          return false;
      }
    },
  }
};
</script>

<style scoped lang="scss">
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
  .user-settings-interface {
      background: #FFFFFF;
      padding: 20px;
  }
</style>
