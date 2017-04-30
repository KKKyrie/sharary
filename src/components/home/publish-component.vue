<template>
	<div class="container-fluid">
		<div class="row btn-area">
			<button type="button" class="btn pull-right show-btn" data-toggle="modal" data-target="#publishModal"><span class="glyphicon glyphicon-plus" style="color: white;"></span></button>
		</div>
		
		<!-- publish modal starts -->
		<div class="modal fade" id="publishModal" tabindex="-1" role="dialog" aria-labelledby="publishModalLabel">
		  	<div class="modal-dialog" role="document">
		    	<div class="modal-content">
		      		<div class="modal-header">
		        		<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		        		<h4 class="modal-title" id="publishModalLabel">发布共享书籍</h4>
		      		</div>
		      		<div class="modal-body">
		        
				        <form>	
							<!-- hint -->
							<div class="alert alert-danger hint" role="alert" id="input_danger">你的输入不合法！<br/>（输入不完整、长度过长或含有非法字符）</div>
							<div class="alert alert-danger hint" role="alert" id="publish_fail"></div>

							<!-- infoType -->
				          	<div class="form-group">
				            	<label for="infoType">类型：</label>
								<select name="infoType" class="form-control" v-model="infoType">
									<option value="0">我有这本书</option>
									<option value="1">我要这本书</option>
								</select>
				          	</div>

				          	<!-- bookname -->
				          	<div class="form-group">
				            	<label for="bookname">书名：</label>
				            	<input class="form-control padding-control" type="text" v-model.trim="bookname" placeholder="无需添加书名号" />
				          	</div>

							<!-- message -->
				          	<div class="form-group">
				          		<label for="description">留言：</label>
								<input name="description" type="text" class="form-control" v-model.trim="description" placeholder="谈谈你对这本书的感受 / 你为什么想要这本书？" />
				          	</div>

				          	<!-- shareType -->
				          	<div class="form-group">
				          		<label for="">共享方式：</label>
								<select class="form-control" v-model="shareType">
									<option value="0">我要交换</option>
									<option value="1">我要交易</option>
								</select>
				          	</div>

				          	<!-- price -->
				          	<div class="form-group" v-if="shareType == 1">
				          		<label for="">期望价格（元）:</label>
				          		<input type="text" class="form-control" placeholder="0" v-model.trim.number="price" />
				          	</div>
				        </form>
		    		</div>
		      
		    		<div class="modal-footer">
		        		<button type="button" class="btn btn-default" data-dismiss="modal">算了</button>
		        		<button type="button" class="btn btn-success" @click="publish">发布</button>
		    		</div>
				</div>
			</div>
		</div>
		<!-- publish modal ends -->
	</div>
</template>

<script>

	const username = localStorage.getItem('_username');

	export default {
		data(){
			return {
				infoType: 0,
				bookname: '',
				description: '',
				shareType: 1,
				price: ''
			}
		},

		methods: {

			// check xss
			checkLegal(input){

				let patern = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im;

				let _result = patern.test(input);

				return _result ? false : true;
			},

			// check empty
			checkFilled(input){
				return input == '' ? false : true;
			},

			// check length
			checkLength(input, type){

				let that = this;
				let length = input.length;

				switch(type){
					// bookname description price
					case 'bookname':
						return length > 20 ? false : true;
						break;
					case 'description':
						return length > 240 ? false : true;
						break;
					case 'price':
						return length > 10 ? false : true;
						break;
					default:
						that.showErrorModal('[检测用户长度逻辑意外]','请联系劉凯里解决这个问题 :)');
				}
			},

			// 用户点击“发布”时，先检测输入是否符合规则（非空，没有敏感字符）
			checkAvailable(){
				/*
					1. 非空
					2. 合法性
				*/
				let checkFilled = this.checkFilled;
				let checkLegal = this.checkLegal;
				let checkLength = this.checkLength;

				if (this.shareType == 1){
					// bookname & description & price
					let _filled = checkFilled(this.bookname) && checkFilled(this.description) && checkFilled(this.price);
					let _length = checkLength(this.bookname, 'bookname') && checkLength(this.description, 'description') && checkLength(this.price, 'price');
					let _legal = checkLegal(this.bookname) && checkLegal(this.description) && checkLegal(this.price);

					return _filled && _legal && _length ? true : false;

				} else {
					// bookname & description
					let _filled = checkFilled(this.bookname) && checkFilled(this.description);
					let _length = checkLength(this.bookname, 'bookname') && checkLength(this.description, 'description')
					let _legal = checkLegal(this.bookname) && checkLegal(this.description);
					
					return _filled && _legal && _length ? true : false;
				}
			},

			/*
			return {timestamp: '1231221231', date: '2017年3月10日'}
			*/
			getTimeObj(){
				let currentTime = new Date();
				let timestamp = currentTime.getTime();

				let year = currentTime.getFullYear();
				let month = currentTime.getMonth() + 1;
				let day = currentTime.getDate();
				let hours = currentTime.getHours().toString();
				let minutes = currentTime.getMinutes().toString();
				let date = year + '年' + month + '月' + day + '日 ' + (hours.length > 1 ? hours : '0' + hours) + ':' + (minutes.length > 1 ? minutes : '0' + minutes);

				return {
					timestamp, date
				};
			},

			// 发送成功后，初始化数据
			initData(_this){
				_this.bookname = '';
				_this.description = '';
				_this.price = '';
			},

			// “发布”
			publish(){
				/*
					1. 通过检验
					2. 发布
				*/

				let that = this;

				let available = that.checkAvailable();
				if (!available){
					$('#input_danger').show('fast').delay(5000).hide('fast');
					return;
				}

				let timeObj = that.getTimeObj();

				let publishData = {
					bookId: timeObj.timestamp,
					date: timeObj.date,
					username: username,
					bookname: that.bookname,
					description: that.description,
					shareType: that.shareType,
					infoType: that.infoType,
					price: that.price
				};

				$.ajax({
					url: './php/handle_publish.php',
					type: 'POST',
					data: publishData,
					async: true,
					timeout: 3000,
					success(_response){
						let response = JSON.parse(_response);
						switch (response.ret){
							case '0':
								$('#publish_fail').text('发布失败：' + response.msg).show('fast').delay(3000).hide('fast');
								break;
							case '1':
								$('#publishModal').modal('hide');
								that.$emit('publishBook', publishData);
								that.initData(that);
								break;
							default:
								that.showErrorModal('[发布逻辑意外], 请联系劉凯里解决这个问题 :)');
						}
					},
					error(){
						that.showErrorModal('[请求超时], 请检查设备的网络状况并重试 :)');
					}
				});
			},

			// display error modal
			showErrorModal(msg){
				$('#publishModal').modal('hide');
				$('#errorMsg').text(msg);
				$('#errorModal').modal('show');
			}
		}
	}
</script>

<style scoped>

	.btn-area{
		margin-top: 10px;
		margin-bottom: 5px;
	}

	.show-btn{
		background-color: #42b983;
	}

	.publish-container{
		border: 1px solid #ccc;
		padding: 20px 20px;
		position: relative;
		display: none;
	}

	.hint{
		display: none;
		text-align: center;
	}


</style>