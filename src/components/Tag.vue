<template>
	<div class="tags">
		<div v-for="list in tagList" :key="list.category">
		<h5 class="title">{{list.category}}</h5>
		<ul>
			<li class="tag" v-for="tag in list.tags" :key="tag">{{tag}}</li>
		</ul>
	</div>
	</div>
</template>

<script>
const tagList = [
	{
		category: 'Android',
		tags:[ 'Android', 'AndroidStudio', 'RxJava', 'Gradle', 'Kotlin']
	},
	{
		category: '前端',
		tags: ['前端', 'TypeScript', 'JavaScript', 'Elm', 'React', 'Web', 'CSS', 'JavaSaript', 'Webpack', 'ReactNative', 'React', 'Node']
	},
	{
		category: 'iOS',
		tags: ['iOS', 'Swift', 'Objective-C']
	}
]
export default {
	data () {
    return {
			tagList: tagList
		};
  },
}
</script>

<style lang="scss" scoped>
	.tags{
		width: 80%;
		max-width: 1024px;
		margin: 80px auto;
		.title{
			border-bottom: 1px solid #ccc;
			padding-bottom: 5px;
		}
		ul{
			.tag{
				list-style: none;
				display: inline-block;
				border: 1px solid #ccc;
				background-color: #aabbcc;
				border-radius: 3px;
				margin: 10px 10px 20px 0;
				padding: 3px 6px;
			}
		}
	}
</style>
