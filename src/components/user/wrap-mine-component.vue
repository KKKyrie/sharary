<template>
	<div class="container-fluid">
		<div class="row">
			<div class="wrap-container col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1 col-sm-12 col-xs-12">
				<BookComponent page="user" v-for="book in myBookList" :key="book.id" :book="book"></BookComponent>
				<p class="loading-hint">正在加载...</p>
			</div>
		</div>
	</div>
</template>

<script>
	
	import BookComponent from '../home/book-component.vue';

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
						that.getMyBookList();
					}
				}, 500, 3600000);
			},

			getMyBookList(){
				let that = this;
				let getData = {
					username: localStorage.getItem('_username'),
					pageNo: that.pageNo++
				};
				$.ajax({
					url: './php/handle_getMyBooks.php',
					type: 'GET',
					timeout: 3000,
					async: true,
					data: getData,
					success(_response){
						let response = JSON.parse(_response);
						switch(response.ret){
							case '0':
								console.error(response.msg);
								break;
							case '1':
								console.log(response.msg);
								if (response.books.length === 0){
									$('.loading-hint').text('———— 已加载完你的全部书籍 ————');
									return;
								}else{
									that.myBookList = that.myBookList.concat(response.books);
									return;
								}
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
			this.getMyBookList();
			this.initScroll();
		},

		data(){
			return {
				myBookList: [],
				pageNo: 1
			}
		}

	}
</script>

<style scoped>
	
	.wrap-container{
		margin-top: 30px;
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