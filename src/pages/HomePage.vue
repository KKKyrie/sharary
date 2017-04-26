<template>
	<div>
		<div class="alert alert-info info" role="alert" style="display: none">你收到了<span class="num"></span>条消息，<router-link to="/notice">点击查看</router-link></div>
		<SearchComponent></SearchComponent>
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
								alert('获取新消息失败，刷新或联系劉凯里 :)');
								break;
							default:
								alert('Ooops, 出了点意外，请刷新或联系劉凯里 :)');
						}
					},
					error(){
						alert('请求失败，请重试或联系劉凯里 :)');
					}
				});
			}
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