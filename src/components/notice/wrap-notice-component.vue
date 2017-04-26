<template>
	<div class="container-fluid wrap">
		<div class="row">
			<h2 class="wrap-title">收到的消息</h2>&nbsp;&nbsp;&nbsp;
			<a href="javascript:void(0)" @click="getNotice('getAllNotice')"><span class="glyphicon glyphicon-list"></span>&nbsp;查看历史消息</a>
		</div>
		<div class="row">
			<div class="wrap-container col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1 col-sm-12 col-xs-12">
				<NoticeComponent v-for="notice in noticeList" :key="notice.id" :notice="notice"></NoticeComponent>
			</div>
		</div>
		<div class="row">
			<div class="hint col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1 col-sm-12 col-xs-12">
				<h3 class="hint">加载中...</h3>				
			</div>
		</div>
	</div>
</template>

<script>

	import NoticeComponent from './notice-component.vue';

	const username = localStorage.getItem('_username');

	export default {
		components: { NoticeComponent },

		methods: {
			getNotice(type){
				// type == 'getNewNotice' || 'getAllNotice'
				let that = this;
				let data = {
					type: type,
					receiver: username
				};
				$.ajax({
					url: './php/handle_getNotice.php',
					type: 'GET',
					async: true,
					timeout: 3000,
					data: data,
					success(_response){
						let response = JSON.parse(_response);
						switch (response.ret){
							case '1':
								console.log(response.msg);
								that.noticeList = response.noticeList;
								if (that.noticeList.length === 0){
									$('.hint').text('———— 你暂时还没有收到消息 ————');
								}else{
									$('.hint').text('———— 已加载全部消息 ————');
								}
								break;
							case '0':
								console.log(response.msg);
								alert('查询出错，请刷新或联系劉凯里 :)');
								break;
							default:
								alert('Ooops,出了点意外，请联系劉凯里 :)');
						}
					},
					error(){
						alert('请求失败，请联系劉凯里 :)');
					}
				});
			},

			readNewNotice(){
				let that = this;
				let data = {
					type: 'readNewNotice',
					receiver: username
				};
				$.ajax({
					url: './php/handle_getNotice.php',
					type: 'GET',
					async: true,
					timeout: 3000,
					data: data,
					success(_response){
						let response = JSON.parse(_response);
						switch(response.ret){
							case '1':
								console.log(response.msg);
								break;
							case '0':
								console.log(response.msg);
								alert('阅读消息失败，请联系劉凯里 :)');
								break;
							default:
								alert('Ooops, 出了点意外，请联系劉凯里 :)');
						}
					},
					error(){
						alert('请求失败，请刷新或联系劉凯里 :)');
					}
				});
			}
		},

		created(){
			this.getNotice('getNewNotice');
		},

		mounted(){
			this.readNewNotice();
		},

		data(){
			return {
				noticeList: []
			}
		}

	};


</script>

<style scoped>

	.wrap{
        margin:30px auto;
        padding:20px;
    }


    .wrap-title{
    	font-weight: bold;
    	display: inline-block;
    }

    a:link{
		color: #42b983;
    }

    a:visited{
    	color: #ae2e2e;
    	text-decoration: line-through;
    }

    a:hover{
    	text-decoration: underline;
    }

    a:active{
    	box-shadow: 0px 0px 5px;
    	-webkit-box-shadow: 0px 0px 5px;
    	-o-box-shadow: 0px 0px 5px;
    	-ms-box-shadow: 0px 0px 5px;
    	-moz-box-shadow: 0px 0px 5px;
    }


    .hint{
    	text-align: center;
    	color: gray;
    	font-size: 15px;
    }
</style>
