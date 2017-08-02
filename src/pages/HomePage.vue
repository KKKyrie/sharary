<template>
	<div>
		<div class="alert alert-info info" role="alert" style="display: none">你收到了<span class="num"></span>条消息，<router-link to="/notice">点击查看</router-link></div>
		<SearchComponent @searchBook="searchListener"></SearchComponent>
		<PublishComponent @publishBook="publishListener"></PublishComponent>
		<WrapComponent ref="wrapComponent"></WrapComponent>
	</div>
</template>

<script>
	import SearchComponent from '../components/home/search-component.vue';
	import PublishComponent from '../components/home/publish-component.vue';
	import WrapComponent from '../components/home/wrap-component.vue';

	export default {
		components: { SearchComponent, PublishComponent, WrapComponent },

		methods: {
			publishListener(publishData){
				this.$refs.wrapComponent.addBook(publishData);
			},

			searchListener(searchResult){
				this.$refs.wrapComponent.handleSearch(searchResult);
			},

			getNoticeCount(){
				let that = this;
				let data = {
					type: 'getNoticeCount',
					receiver: localStorage.getItem('_username')
				};
				$.ajax({
					url: './php/handle_getNotice.php',
					type: 'GET',
					data: data,
					async: true,
					timeout: 3000,
					success(_response){
						let response = JSON.parse(_response);
						switch(response.ret){
							case '1':
								console.log(response.msg);
								let count = response.count;
								if (count > 0){
									$('.num').text(count);
									$('.info').show('fast');
								}
								break;
							case '0':
								console.log(response.msg);
								that.showErrorModal('[获取消息数量失败]: ' + response.msg + ' 请联系劉凯里 :)');
								break;
							default:
								that.showErrorModal('[获取消息数量逻辑意外], 请联系劉凯里 :)');
						}
					},
					error(){
						that.showErrorModal('[请求超时], 请检查设备网络状态并重试 :)');
					}
				});
			}
		},

		// display error modal
		showErrorModal(msg){
			$('#errorMsg').text(msg);
			$('#errorModal').modal('show');
		},

		mounted(){
			this.getNoticeCount();
		}
	}
</script>

<style scoped>
	
	.info{
		text-align: center;
	}

</style>