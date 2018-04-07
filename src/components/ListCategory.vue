<template>
    <div>
        <header-bar></header-bar>
        <div class="container">
            <div class="category">
                <span class="category_title">
                    我这是标题呢
                </span>
            </div>
        </div>
        <post :posts="posts"></post>
    </div>
  
</template>

<script>
import HeaderBar from "./HeaderBar.vue";
import Post from './Post.vue';
import consts from "../constant/consts";
export default {
    data() {
        return {
            posts:[]
        }
    },
    components: {
        HeaderBar,
        Post
    },
    created() {
        this.axios.get(`${consts.categories}${this.$route.params.category_id}`).then(res => {
            this.posts = res.data.posts
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
</style>


