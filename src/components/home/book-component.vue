<template>
    <transition name="bounce">
		<div class="book-container container-fluid">
			<!-- 右上角标志 -->
			<CornerComponent :type="book.infoType"></CornerComponent>



			<!-- 头部区域 -->
			<div class="title-area">
				<h3>《{{ book.bookname }}》</h3>
				

				<br>
				<span class="date">{{ book.date }}</span>
				<!-- 删除按钮 -->
				<a class="btn delete-btn pull-right" v-if="page === 'user'" data-toggle="modal" :data-target="'#myModal'+book.username+book.bookId">删除</a>

            	<!-- delete modal starts -->
	            <div class="modal fade" :id="'myModal'+book.username+book.bookId" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
	                <div class="modal-dialog" role="document">
	                    <div class="modal-content">
	                        <div class="modal-header">
	                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	                            <h4 class="modal-title" id="myModalLabel">你要删除这条发布吗？</h4>
	                        </div>
	                        <div class="modal-body">
	                            删除是永久性操作，不可复原，确定删除吗？
	                        </div>
	                        <div class="modal-footer">
	                            <button type="button" class="btn btn-default" data-dismiss="modal">算了</button>
	                            <button type="button" class="btn btn-danger" data-dismiss="modal">删除</button>
	                        </div>
	                    </div>
	                </div>
	            </div>
            	<!-- delete modal ends -->
			</div>
			
			<!-- 用户留言区 -->
			<div class="message-area">
				<h4>{{ book.username }}：</h4>
				<p class="message">{{ book.description }}</p>
			</div>
			
			<!-- 共享方式 -->
			<span class="share-type">
				共享方式：
				<span v-if="book.shareType == 0">交换</span>
				<span v-if="book.shareType == 1">交易（{{book.price}}元）</span>
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
		color: #ae2e2e;
		/*background-color: #ae2e2e;*/
		margin-right: 5%;
		padding: 0px;
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