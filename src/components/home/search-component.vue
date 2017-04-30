<template>
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-8 col-md-offset-2 col-sm-12 col-xs-12">
					<div class="form-control search-container">
					    <input  type="text" class="search-input" placeholder="搜索你想要的书" v-model.trim="keyword" />
					    <span class="glyphicon glyphicon-search pull-right search-btn" @click="search" ></span>
					</div>
			</div>
		</div>
	</div>
</template>

<script>
	
	export default {
		data(){
			return {
				keyword: ''
			};
		},

		methods: {
			search(){
				let that = this;
				let keyword = that.keyword;

				// 为空不做处理
				if (keyword === ''){
					console.warn('keyword undefined.');
					return;
				}

				// 非法字符检测
				if (!that.checkLegal(keyword)){
					console.warn('keyword illegal');
					return;
				}

				let data = { keyword };

				$.ajax({
					url: './php/handle_search.php',
					type: 'GET',
					async: true,
					timeout: 3000,
					data: data,
					success(_response){
						let response = JSON.parse(_response);
						switch(response.ret){
							case '1':
								console.log(response.msg);
								that.$emit('searchBook', response.searchResult);
								break;
							case '0':
								console.warn(response.msg);
								that.showErrorModal('[搜索失败]: ' + response.msg + ' 请联系劉凯里 :)');
								break;
							default:
								that.showErrorModal('[搜索功能逻辑意外], 请联系劉凯里解决这个问题 :)');
						}
					},
					error(){
						that.showErrorModal('[请求超时或发送失败], 请检查设备的网络状态并重试 :)');
					}
				});


			},

			// 非法字符检测
			checkLegal(input){

				let patern = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im;

				let _result = patern.test(input);

				return _result ? false : true;
			},

			// display error modal
			showErrorModal(msg){
				$('#errorMsg').text(msg);
				$('#errorModal').modal('show');
			}
		}
	}

</script>

<style scoped>
	
	.search-container:active{
		box-shadow: 0px 0px 5px #42b983;
		-webkit-box-shadow: 0px 0px 5px #42b983;
	}

	.search-input{
		display: inline-block;
		border: none;
		outline: none;
		width: 80%;
	}

</style>