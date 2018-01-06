<template>
<div>
<header-bar></header-bar>
<div style="width: 50%;margin: 20px auto;">

  <el-upload
    class="avatar-uploader"
    action="https://jsonplaceholder.typicode.com/posts/"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload">
    <img v-if="imageUrl" :src="imageUrl" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
  <el-input
    type="textarea"
    autosize
    placeholder="请输入博客名称"
    v-model="blogName">
  </el-input>
  <div style="margin: 20px 0;"></div>
  <el-input placeholder="请输入博客地址" v-model="blogUrl">
    <template slot="prepend">Http://</template>
  </el-input>
  <div style="margin: 20px 0;"></div>
  <el-input
    type="textarea"
    :autosize="{ minRows: 2, maxRows: 4}"
    placeholder="一句话介绍博客"
    v-model="blogDesc">
  </el-input>
  <div style="margin: 20px 0;"></div>
  <el-button type="primary" @click="onSubmit">提交</el-button>
</div>
  <footer-bar></footer-bar>
</div>
</template>
<script>
  import consts from "../constant/consts";
  import HeaderBar from "./HeaderBar.vue";
  import FooterBar from "./FooterBar.vue";
  import Vue from 'vue';
  import { Input } from 'element-ui';
  import { Upload  } from 'element-ui';
  import { Button  } from 'element-ui';
  Vue.component(Input.name, Input);
  Vue.component(Upload .name, Upload);
  Vue.component(Button .name, Button);
    export default {
        data() {
            return {
              blogName: '',
              blogDesc: '',
              imageUrl: '',
              blogUrl: ''
            }
        },
        computed: {},
        components: {
          HeaderBar,
          FooterBar
        },
        methods: {
          handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
          },
          beforeAvatarUpload(file) {
            console.log('file.type', file.type)
            console.log('imageUrl', this.imageUrl)
            const isJPG = file.type === 'image/jpeg';
            const isPng = file.type === 'image/png';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!(isJPG || isPng)) {
              this.$message.error('上传头像图片只能是 JPG PNG 格式!');
            }
            if (!isLt2M) {
              this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
          },
          onSubmit() {
            const _this = this;
            this.axios
              .post(consts.blogs, {
                name: this.blogName,
                description: this.blogDesc,
                blog_url: this.blogUrl
              })
              .then(function(response) {
                if (response.status === 201) {
                  _this.$router.push("/");
                }
              })
              .catch(function(error) {
                console.log(error);
              });
          }
        },
    }
</script>

<style scoped>
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
</style>
