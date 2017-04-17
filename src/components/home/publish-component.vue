<template>
	<div class="container-fluid">
		<div class="row btn-area">
			<button class="btn pull-right hide-btn" @click="hidePublish"><span class="glyphicon glyphicon-minus" style="color: white"></span></button>
			<button class="btn pull-right show-btn" @click="showPublish"><span class="glyphicon glyphicon-plus" style="color: white"></span></button>
		</div>
		<div class="row">
			<div class="publish-container col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1 col-sm-12 col-xs-12">
				<div class="alert alert-danger" role="alert" style="display: none;" id="input_danger">你的输入不合法！（输入不完整、长度过长或含有非法字符）</div>
				<div class="alert alert-danger" role="alert" style="display: none;" id="publish_fail"></div>
				<div class="alert alert-success" role="alert" style="display: none;" id="publish_success">发布成功</div>
				<!-- row 1 -->
				<div class="row-1 row">
					<span class="col-lg-3 col-md-3 col-sm-4 col-xs-6">
						<label for="infoType">类型：</label>
						<select name="infoType" class="form-control inline-element padding-control" v-model="infoType">
							<option value="0">我有这本书</option>
							<option value="1">我要这本书</option>
						</select>
					</span>

					<span class="col-lg-3 col-md-3 col-sm-3 col-xs-6"><label for="bookName">书名：</label><input class="form-control inline-element padding-control" type="text" v-model.trim="bookName" placeholder="无需添加书名号" /></span>
				</div>
					
				<!-- row 2 -->
				<div class="row">
					<span class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						<label for="description">留言：</label>
						<input name="description" type="text" class="form-control description" v-model.trim="description" placeholder="谈谈你对这本书的感受 / 你为什么想要这本书？" />
					</span>
				</div>
					
				<!-- row 3 -->
				<div class="row-3 row">
					<span class="col-lg-3">
						<label for="">共享方式：</label>
						<select class="form-control inline-element share-type" v-model="shareType">
							<option value="0">我要交换</option>
							<option value="1">我要交易</option>
						</select>	
					</span>
					<span v-if="shareType == 1" class="col-lg-2"><label for="">期望价格（元）:</label><input type="text" class="form-control inline-element price" placeholder="0" v-model.trim.number="price"></span>
				</div>

				<div class="row-4">
					<button class="btn btn-success" @click="publish">发布</button>
					<span>&nbsp;&nbsp;&nbsp;</span>
					<button class="btn btn-default">取消</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

	const username = localStorage.getItem('_username');

	export default {
		data(){
			return {
				infoType: 0,
				bookName: '',
				description: '',
				shareType: 1,
				price: ''
			}
		},

		methods: {
			showPublish(){
				$('.publish-container').show(300);
				$('.show-btn').hide(300);
				$('.hide-btn').show(300);
			},

			hidePublish(){
				$('.publish-container').hide(300);
				$('.hide-btn').hide(300);
				$('.show-btn').show(300);
			},

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

				let length = input.length;

				switch(type){
					// bookname description price
					case 'bookName':
						return length > 20 ? false : true;
						break;
					case 'description':
						return length > 240 ? false : true;
						break;
					case 'price':
						return length > 10 ? false : true;
						break;
					default:
						alert('检验用户输入长度时出现问题，请联系劉凯里 :)');
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
					let _filled = checkFilled(this.bookName) && checkFilled(this.description) && checkFilled(this.price);
					let _length = checkLength(this.bookName, 'bookName') && checkLength(this.description, 'description') && checkLength(this.price, 'price');
					let _legal = checkLegal(this.bookName) && checkLegal(this.description) && checkLegal(this.price);

					return _filled && _legal && _length ? true : false;

				} else {
					// bookname & description
					let _filled = checkFilled(this.bookName) && checkFilled(this.description);
					let _length = checkLength(this.bookName, 'bookName') && checkLength(this.description, 'description')
					let _legal = checkLegal(this.bookName) && checkLegal(this.description);
					
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
			initDate(_this){
				_this.bookName = '';
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
					$('#input_danger').show('fast').delay(2500).hide('fast');
					return;
				}

				let timeObj = that.getTimeObj();

				let publishData = {
					bookId: timeObj.timestamp,
					date: timeObj.date,
					username: username,
					bookName: that.bookName,
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
								$('#publish_fail').text('发布失败：' + response.msg).show('fast').delay(2500).hide('fast');
								break;
							case '1':
								that.initDate(that);
								$('#publish_success').show('fast').delay(2500).hide('fast');
								break;
							default:
								alert('出现了一点意外，请联系劉凯里 :)');
						}
					},
					error(){
						alert('发布请求失败，请重试或联系劉凯里 :)');
					}
				});
			}
		},

		watch: {
			price(val, preVal){
				console.log('之前：'+ preVal + ', 之后: ' + val);
			}
		}
	}
</script>

<style scoped>

	.btn-area{
		margin-top: 10px;
		margin-bottom: 5px;
	}

	.hide-btn{
		background-color: #ae2e2e;
		margin-left: 5px;
		display: none;
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

	.row-1{
		display: flex;
		-webkit-display: flex;
		justify-content: space-start;
	}





	.row-3{
		display: flex;
		-webkit-display: flex;
		justify-content: flex-start;
	}

	.row-4{
		display: flex;
		-webkit-display: flex;
		justify-content: center;
	}

	.inline-element{
		display: inline;
		margin-bottom: 20px;
	}

	.padding-control{
		padding: 0px 2px;
		margin-right: 10%;
	}

	.description{
		margin-bottom: 20px;
	}

	.share-type{
		/*width: 130px;*/
		margin-right: 50px;
	}

	.price{
		/*width: 100px;*/
	}





</style>