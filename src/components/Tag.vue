<template>
	<div class="tags">
		<div v-for="list in tagList" :key="list.name">
		<h5 class="title">{{list.name}}</h5>
		<ul>
			<router-link tag="li" class="tag" v-for="tag in list.tags" :key="tag.id" 
				 :to="{ name: 'tag_name', params: { tag_name: tag.name }}" >
				<el-tag>{{ tag.name }}</el-tag>
			</router-link>
		</ul>
		</div>
	</div>
</template>

<script>
import constans from "../constant/consts";
import Vue from 'vue';
import { Tag } from 'element-ui';

Vue.component(Tag.name, Tag);

export default {
	data () {
    return {
			tagList: []
		};
	},
	created() {
		this.axios.get(constans.list_tags).then((res) => {
			this.tagList = res.data.result
		})
	}
}
</script>

<style lang="scss" scoped>
	.tags{
		width: 80%;
		max-width: 1024px;
		margin: 80px auto;
		background: #FFF;
		.title{
			border-bottom: 1px solid #ccc;
			padding-bottom: 5px;
			line-height: 3rem;
			font-size: 1.2rem;
		}
		ul{
			.tag{
				list-style: none;
				display: inline-block;
				// border: 1px solid #ccc;
				// background-color: #aabbcc;
				// border-radius: 3px;
				color: #666;
				margin: 10px 10px 20px 0;
				padding: 3px 6px;
				cursor: pointer;
			}
		}
	}
</style>
