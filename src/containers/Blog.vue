<template>
  <div>
    <Header></Header>
 <el-row :gutter="10">
  <el-col :xs="2" :sm="4" :md="3" :lg="6" :xl="6">.</el-col>
  <el-col :xs="20" :sm="16" :md="18" :lg="12" :xl="12">
      <div class="grid-content bg-purple-light post-blog">
            <span class="pic-desc">为博客选一张精美的配图吧！</span>
      <el-upload
        class="avatar-uploader"
        action="//up.qiniup.com"
        type="drag"
        :before-upload="beforeUpload"
        :auto-upload="true"
        :show-file-list="false"
        :on-success="handleSuccess"
        :data="form">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>

      <div style="margin: 20px 0;"></div>
      <el-input
        type="textarea"
        autosize
        placeholder="请输入博客名称"
        :maxlength="30"
        v-model="blogName">
      </el-input>
      <div style="margin: 20px 0;"></div>
      <el-input placeholder="请输入博客地址"
                v-model="blogUrl"
                @blur="checkUrl"
                :maxlength="30">
        <template slot="prepend">Http://</template>
      </el-input>

      <div style="margin: 20px 0;"></div>
      <el-select v-model="categoryId" placeholder="请选择博客分类">
      <el-option
        v-for="category in blogCategories"
        :key="category.value"
        :label="category.label"
        :value="category.value"
        >
      </el-option>
      </el-select>

      <div style="margin: 20px 0;"></div>
      <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4}"
        placeholder="一句话介绍博客"
        :maxlength="130"
        v-model="blogDesc">
      </el-input>
      <div style="margin: 20px 0;"></div>
      <el-button type="primary" @click="onSubmit" >提交</el-button>
      </div>
  </el-col>
  <el-col :xs="2" :sm="4" :md="3" :lg="6" :xl="6"><div class="grid-content hidden-xs-only"></div></el-col>
</el-row>
  </div>
</template>
<script>
  import consts from "../constant/consts";
  import Header from "../components/Header.vue";
  import * as types from '../store/mutation-types'
  import Vue from 'vue';
  import { Input } from 'element-ui';
  import { Upload  } from 'element-ui';
  import { Button  } from 'element-ui';
  import { Row } from 'element-ui';
  import { Col } from 'element-ui';
  import Gravatar from 'vue-gravatar';

  Vue.component(Row.name, Row);
  Vue.component(Col.name, Col);
  Vue.component(Input.name, Input);
  Vue.component(Upload .name, Upload);
  Vue.component(Button .name, Button);
  export default {
    data() {
      return {
        categoryId:'',
        blogCategories:[],
        blogName: '',
        blogDesc: '',
        imageUrl: '',
        blogUrl: '',
        form: {
          key: '',
          token: ''
        },
        check: false,
        bucketHost: consts.base_upload_img_address,   // 上传图片的外链域名,七牛设置的
      }
    },
    computed: {
    },
    components: {
      Header
    },
    created() {
      this.getBlogCategories()
    },
    methods: {
      /**@function
       * 获取博客分类展示
       */
      getBlogCategories() {
        const _this = this;
        this.axios.get(consts.blog_categories).then((res) => {
          console.log('blog->', res.data.blog_categories)
          res.data.blog_categories.forEach((item) => {
            _this.blogCategories.push({
                value:item.id,
                label:item.name
            })
          })
        })
      },
      handleSuccess(res, file, fileList) {
        this.imageUrl = `${this.bucketHost}${res.key}?imageView2/2/h/300`
      },
      checkUrl() {
        const url = `http://${this.blogUrl}`
        const isUrl = this.url(url);
        if (!isUrl) {
          this.$message.error('域名不符合格式!');
        } else {
            this.check = true;
        }
      },
      url(value) {
        return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
      },
      getToken: async function(key) {
        const _this = this
        console.log('key:', key)
        return new Promise((resolve) => {
          this.axios.get(`/api/v1.0/upload/token/${key}`, {
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
      generateUUID() {
        let d = new Date().getTime();
        let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          let r = (d + Math.random()*16)%16 | 0
          d = Math.floor(d/16)
          return (c=='x' ? r : (r&0x7|0x8)).toString(16)
        })
        return uuid
      },
      onSubmit() {
        if (!(this.blogName || this.blogDesc || this.blogUrl || this.form.token)) {
          this.$message.warning('输入不能为空');
          return;
        }

        if (!this.check) {
          this.$message.error('域名不符合格式!');
          return;
        }

        const _this = this;
        this.axios.post(consts.blogs, {
          name: this.blogName,
          description: this.blogDesc,
          blog_url: this.blogUrl,
          image_url: this.imageUrl,
          category_id: this.categoryId
        }).then(function(response) {
              _this.$router.push("/");
          }).catch(error => {
            console.log(error);
          });
      }
    },
  }
</script>

<style >
  .pic-desc {
    font-size: 13px;
    color: #C1C3CB;
    line-height: 20px;
  }
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
    width: 178px;
    height: 178px;
    display: block;
  }
  .post-blog {
    margin-top: 80px;
  }
</style>
