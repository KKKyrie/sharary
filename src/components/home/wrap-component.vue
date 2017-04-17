<template>
	<div class="container-fluid">
		<div class="row">
			<div class="wrap-container col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1 col-sm-12 col-xs-12">
				<BookComponent page="home" v-for="book in bookList" :key="book.id" :book="book"></BookComponent>
				<p class="loading-hint">正在加载...</p>
			</div>
		</div>
	</div>
</template>

<script>
	
	import BookComponent from './book-component.vue';

	export default {

		components: { BookComponent },

		methods: {

			getBookList(){
				let that = this;
				$.ajax({
					url: './php/handle_getBooks.php',
					type: 'GET',
					timeout: 3000,
					async: true,
					data: {
						pageNo: that.pageNo++
					},
					success(_response){
						let response = JSON.parse(_response);
						switch(response.ret){
							case '0':
								console.error(response.msg);
								break;
							case '1':
								console.log(response.msg);
								that.bookList = response.books;
								break;
							default:
								alert('Ooops，出了点意外，请联系劉凯里 :)');
						}
					},
					error(){
						alert('请求失败，请重试或联系劉凯里 :)');
					}
				});
			}

		},

		created(){
			this.getBookList();
		},

		data(){
			return {
				bookList: [],
				pageNo: 1
			}
		}

	}
</script>

<style scoped>
	
	.wrap-container{
		margin-top: 10px;
		margin-bottom: 30px;
		border: 1px solid #ccc;
		padding: 20px;
		/*width: 61.8%;*/
	}

	.loading-hint{
		text-align: center;
		font-size: 15px;
		color: #2c3e50;
	}



</style>