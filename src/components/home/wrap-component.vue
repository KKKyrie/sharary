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

			throttle(fn, delay, mustRunDelay){
				let timer = null;
				let t_start;
				return function(){
                    let context = this, args = arguments, t_curr = +new Date();
                    clearTimeout(timer);
                    if(!t_start){
                        t_start = t_curr;
                    }
                    if(t_curr - t_start >= mustRunDelay){
                        fn.apply(context, args);
                        t_start = t_curr;
                    }
                    else {
                        timer = setTimeout(function(){
                            fn.apply(context, args);
                        }, delay);
                    }
                };
			},

			initScroll(){
				let that = this;
				window.onscroll = that.throttle(function(){
					let scrollPos = $(window).scrollTop();
					let range = 50;
					let totalHeight = parseFloat($(window).height()) + parseFloat(scrollPos);
					if (($(document).height() - range) <= totalHeight){
						that.getBookList();
					}
				}, 500, 3600000);
			},

			addBook(publishData){
				this.bookList.unshift(publishData);
			},

			handleSearch(searchResult){
				this.bookList = searchResult;
			},

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
								that.showErrorModal('[获取书籍列表失败]: ' + response.msg + ' 请联系劉凯里 :)');
								break;
							case '1':
								console.log(response.msg);
								that.bookList = that.bookList.concat(response.books);
								if (response.books.length < 3){
									$('.loading-hint').text('———— 已加载完全部书籍 ————');
									return;
								}
								break;
							default:
								that.showErrorModal('[加载书籍列表逻辑意外], 请联系劉凯里解决这个问题 :)');
						}
					},
					error(){
						that.showErrorModal('[请求超时或发送失败], 请检查设备的网络状态并重试 :)');
					}
				});
			}

		},

		// display error modal
		showErrorModal(msg){
			$('#errorMsg').text(msg);
			$('#errorModal').modal('show');
		},

		created(){
			this.getBookList();
			this.initScroll();
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