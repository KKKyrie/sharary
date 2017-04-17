<template>
    <transition name="bounce">
		<div class="book-container container-fluid">
			<!-- 右上角标志 -->
			<CornerComponent :type="book.info_type"></CornerComponent>



			<!-- 头部区域 -->
			<div class="title-area">
				<h3>《{{ book.bookname }}》</h3>
				
				<span class="date">{{ book.date }}</span>

				<!-- 删除按钮 -->
				<button class="btn delete-btn pull-right" v-if="page === 'user'">删除</button>
			</div>
			
			<!-- 用户留言区 -->
			<div class="message-area">
				<h4>kyrieliu：</h4>
				<p class="message">{{ book.description }}</p>
			</div>
			
			<!-- 共享方式 -->
			<span class="share-type">
				共享方式：
				<span v-if="book.share_type == 0">交换</span>
				<span v-if="book.share_type == 1">交易（{{book.price}}元）</span>
			</span>

			<!-- 联系区域 -->
			<ContactComponent v-if="page ==='home'"></ContactComponent>
		</div>
	</transition>
</template>

<script>

	import CornerComponent from './corner-component.vue';
	import ContactComponent from './contact-component.vue';
	
	export default {

		props: ['page', 'book'],

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
		margin-bottom: 20px;
	}

	h3,
	h4{
		display: inline-block;
	}

	.date{
		margin: 10px;
		padding: 10px;
		color: #2c3e50;
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


    /*animation*/
    .bounce-enter-active{
    	animation: bounce-in .5s;
    }
    .bounce-leave-active{
    	animation: bounce-out .5s;
    }
    @keyframes bounce-in{
    	0% {
        	transform: scale(0);
      	}
      	50% {
        	transform: scale(1.2);
      	}
      	100% {
        	transform: scale(1);
      	}
    }
    @keyframes bounce-out{
      	0% {
        	transform: scale(1);
      	}
      	50% {
        	transform: scale(1.2);
      	}
      	100% {
        	transform: scale(0);
      	}
    }

</style>