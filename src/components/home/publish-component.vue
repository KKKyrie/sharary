<template>
	<div class="container-fluid">
		<div class="row btn-area">
			<button class="btn pull-right hide-btn" @click="hidePublish"><span class="glyphicon glyphicon-minus" style="color: white"></span></button>
			<button class="btn pull-right show-btn" @click="showPublish"><span class="glyphicon glyphicon-plus" style="color: white"></span></button>
		</div>
		<div class="row">
			<div class="publish-container col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1 col-sm-12 col-xs-12">
				<div class="alert alert-danger" role="alert" style="display: none;">输入不完整或含有非法字符！</div>
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
					<!-- <span class="col-lg-3 col-md-3 col-sm-3 col-xs-6"><label for="tags">分类：</label><input class="form-control inline-element padding-control" type="text" v-model.trim="tags" placeholder="计算机；互联网" /></span> -->
				</div>
					
				<!-- row 2 -->
				<div class="row">
					<span class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						<label for="message">留言：</label>
						<input name="message" type="text" class="form-control description" v-model.trim="message" placeholder="谈谈你对这本书的感受 / 你为什么想要这本书？" />
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
	export default {
		data(){
			return {
				infoType: 0,
				bookName: '',
				message: '',
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

			checkAvailable(){
				/*
					1. 非空
					2. 合法性
				*/
				let checkFilled = this.checkFilled;
				let checkLegal = this.checkLegal;

				if (this.shareType == 1){
					// bookname & message & price
					let isEmpty = checkFilled(this.bookName) && checkFilled(this.message) && checkFilled(this.price);
					let isLegal = checkLegal(this.bookName) && checkLegal(this.message) && checkLegal(this.price);

					return isEmpty && isLegal ? true : false;

				} else {
					// bookname & message
					let isEmpty = checkFilled(this.bookName) && checkFilled(this.message);
					let isLegal = checkLegal(this.bookName) && checkLegal(this.message);
					
					return isEmpty && isLegal ? true : false;
				}
			},

			publish(){
				/*
					1. 通过检验
					2. 发布
				*/

				let available = this.checkAvailable();
				if (!available){
					$('.alert-danger').show('fast').delay(2500).hide('fast');
					return;
				}

				console.log('publish !');

				
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
		/* when done, switch to none ↓*/
		display: block;
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