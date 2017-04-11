<template>
	<div class="book-container container-fluid">
		<!-- 右上角标志 -->
		<CornerComponent></CornerComponent>



		<!-- 头部区域 -->
		<div class="title-area">
			<h3>《深入 React 技术栈》</h3>
			<span>&nbsp;|&nbsp;</span>
			
			<span class="date">2017年3月1日 07:15</span>

			<!-- 删除按钮 -->
			<button class="btn delete-btn pull-right" v-if="page === 'user'">删除</button>
		</div>
		
		<!-- 用户留言区 -->
		<div class="message-area">
			<h4>kyrieliu：</h4>
			<p class="message">React从诞生起就颠覆了诸多传统前端开发的“铁律”，这种破旧立新开启了前端开发全新的时代。它的用法和理念，代表了现在和未来几年前端技术的潮流风向。如果不想落伍，最好进行系统学习。实践出真知，从牛人的实践中收获自己的真知，恐怕是最好的捷径。这是我看到的第一本React中文原创著作，读来倍感亲切。</p>
		</div>
		
		<!-- 共享方式 -->
		<span class="share-type">共享方式：交易（90元）</span>

		<!-- 联系区域 -->
		<ContactComponent v-if="page ==='home'"></ContactComponent>

	</div>
</template>

<script>

	import CornerComponent from './corner-component.vue';
	import ContactComponent from './contact-component.vue';
	
	export default {

		props: ['page'],

		components: { CornerComponent, ContactComponent }
	}

</script>

<style scoped>

	.book-container{
		border: 1px solid #ccc;
		padding: 10px;
		box-shadow: 0 0 10px #ccc;
		border-radius: 10px;
		position: relative;
		overflow: hidden;
	}

	h3,
	h4{
		display: inline-block;
	}

	.message-area{
		/*border: 1px solid blue;*/
		margin: 10px;
		padding: 10px;
	}

	.message{
		display: inline-block;
		/*border: 1px solid green;*/
	}

	.share-type{
		display: inline-block;
		margin-top: 10px;
		margin-left: 20px;
		font-size: 15px;
		font-weight: bold;
		color: #42b983;
	}

	.delete-btn{
		display: inline-block;
		color: white;
		background-color: #ae2e2e;
		margin-right: 5%;
	}

</style>