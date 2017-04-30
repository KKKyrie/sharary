<template>
	<div class="contact-container">
		<span class="contact-btn" title="直接向 TA 发送你想对 TA 说的话" @click.stop="showDialog">
			<span v-if="!displayInput" class="glyphicon glyphicon-menu-down">&nbsp;</span>
			<span v-else class=" glyphicon glyphicon-menu-up">&nbsp;</span>
			联系 TA
		</span>
		<hr v-if="displayInput" />
		<div class="contact-dialog" v-if="displayInput">
			<div ref="warning" class="alert alert-warning" role="alert" style="display: none;">最多输入100个字 :)</div>
			<div ref="danger" class="alert alert-danger" role="alert" style="display: none;">输入含有非法字符 :)</div>
			<div ref="success" class="alert alert-success" role="alert" style="display: none;">消息发送成功 :)</div>
			<div class="form-group">
				<input type="text" class="form-control input-area" v-model.trim="message" placeholder="向 TA 发送你想说的话..." />
				<span class="glyphicon glyphicon-send send-btn" title="发送" @click="sendMsg"></span>	
			</div>
			
		</div>

	</div>

</template>

<script>

	export default {
		data(){
			return {
				displayInput: false,
				message: ''
			}
		},

		props: ['receiver', 'bookname'],

		methods: {
			showDialog(){
				this.displayInput = !this.displayInput;
			},

			// check xss
			checkLegal(input){

				let patern = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im;

				let _result = patern.test(input);

				if (_result){
					$(this.$refs.danger).show('fast').delay(2500).hide('fast');
					return false;
				}else{
					return true;
				}
			},

			// check empty
			checkFilled(input){
				return input == '' ? false : true;
			},

			checkLength(input){
				if (input.length > 100){
					$(this.$refs.warning).show('fast').delay(2500).hide('fast');
					return false;
				}else{
					return true;
				}
			},

			checkAvailable(){
				let that = this;
				let isLegal = that.checkLegal(that.message);
				let isFilled = that.checkFilled(that.message);
				let isLength = that.checkLength(that.message);

				if (isLegal && isFilled && isLength){
					return true;
				}else{
					return false;
				}
			},

			getDate(){
				let currentTime = new Date();
				let year = currentTime.getFullYear();
				let month = currentTime.getMonth() + 1;
				let day = currentTime.getDate();
				let hours = currentTime.getHours().toString();
				let minutes = currentTime.getMinutes().toString();
				let date = year + '年' + month + '月' + day + '日 ' + (hours.length > 1 ? hours : '0' + hours) + ':' + (minutes.length > 1 ? minutes : '0' + minutes);

				return date;
			},

			sendMsg(){
				let that = this;
				let isAvailable = that.checkAvailable();

				// 校验未通过（空、长度超过100、含有非法字符）
				if (!isAvailable){
					console.warn('输入不合法');
					return;
				}

				let sender = localStorage.getItem('_username');
				let receiver = that.receiver;

				// sender 与 receiver 相同
				if (sender === receiver){
					console.warn('不能给自己发送消息');
					return;
				}

				let date = that.getDate();
				let message = that.message;
				let bookname = that.bookname;

				let data = {
					sender,
					receiver,
					date,
					message,
					bookname
				};

				$.ajax({
					url: './php/handle_sendMsg.php',
					type: 'POST',
					timeout: 3000,
					async: true,
					data: data,
					success(_response){
						let response = JSON.parse(_response);
						switch (response.ret){
							case '1':
								console.log(response.msg);
								$(that.$refs.success).show('fast').delay(3000).hide('fast');
								that.message = '';
								break;
							case '0':
								console.log(response.msg);
								that.showErrorModal('[发送消息失败]: ' + response.msg + ' 请联系劉凯里 :)');
								break;
							default:
								that.showErrorModal('[发送消息逻辑意外], 请联系劉凯里解决这个问题 :)');
						}
					},
					error(){
						that.showErrorModal('[请求超时或发送失败], 请在保证设备网络状态良好的情况下重试 :)');
					}
				});
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

	.contact-container{
		margin-top: 10px;
		padding: 10px;
	}

	.contact-btn{
		width: 100px;
		text-align: center;
		display: inline-block;
		margin-left: 50%;
		transform: translateX(-50px);

		cursor: pointer;
	}

	.contact-btn:hover{
		color: #42b983;
	}

	hr{
		color: #2c3e50;
		margin: 10px 5px;
	}


	.contact-dialog{
		margin: 5px auto;
		width: 70%;
	}

	.input-area{
		width: 80%;
		display: inline-block;
	}

	.send-btn{
		cursor: pointer;
	}

	.send-btn:hover{
		color: #42b983;
	}

</style>
