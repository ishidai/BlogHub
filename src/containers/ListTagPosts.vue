<template>
    <div>
        <Header></Header>
        <div class="container">
            <div class="category">
                <span class="category_title">
                    我这是标题呢
                </span>
            </div>
        </div>

        <el-row :gutter="10">
            <el-col :xs="6" :sm="4" :md="3" :lg="6" :xl="6"><div class="grid-content hidden-xs-only"></div></el-col>
            <el-col :xs="24" :sm="16" :md="18" :lg="12" :xl="12">
                <div class="grid-content bg-purple-light">
                    <blog-item :posts="posts" :type="'post'" ></blog-item>
                </div>
            </el-col>
            <el-col :xs="6" :sm="4" :md="3" :lg="6" :xl="6"><div class="grid-content hidden-xs-only"></div></el-col>
        </el-row>
    </div>
  
</template>

<script>
import Header from "../components/Header.vue";
import BlogItem from '../components/BlogItem.vue';
import consts from "../constant/consts";
import { Row } from 'element-ui';
import { Col } from 'element-ui';
import Vue from 'vue';

Vue.component(Row.name, Row);
Vue.component(Col.name, Col);

export default {
    data() {
        return {
            posts:[]
        }
    },
    components: {
        Header,
        BlogItem
    },
    created() {
        this.axios.get(`${consts.search_tag}${this.$route.params.tag_name}`).then(res => {
            this.posts = res.data.result
        }).catch(err => {
            console.log(err)
        })
    }
}
</script>
<style scoped>
    .container {
        width: 100%;
        min-height: 300px;
        background: none 50%/cover #505d6c;
        background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('../assets/images/category_item_img.jpeg');
    }

    .category {
        margin: 0 auto;
        max-width: 600px;
        -webkit-box-orient: vertical;
        margin-top: auto;
        margin-bottom: 20px;
    }

    .category_title {
        margin-bottom: 10px;
        font-size: 28px;
        font-weight: 600;
        line-height: 34px;
        color: #fff;
        font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif;
    }

    .el-col {
        border-radius: 4px;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
</style>


