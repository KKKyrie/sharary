<template>
	<div class="container-fluid">
		<div class="row">
			<div class="publish-container col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1 col-sm-12 col-xs-12">
				<!-- row 1 -->
				<div class="row-1 row">
					<span class="col-lg-3 col-md-3 col-sm-4 col-xs-6">
						<label for="infoType">类型：</label>
						<select name="infoType" class="form-control inline-element padding-control" v-model="infoType">
							<option value="0">我有这本书</option>
							<option value="1">我要这本书</option>
						</select>
					</span>

					<span class="col-lg-3 col-md-3 col-sm-3 col-xs-6"><label for="bookName">书名：</label><input class="form-control inline-element padding-control" type="text" v-model="bookName" placeholder="无需添加书名号" /></span>
					<span class="col-lg-3 col-md-3 col-sm-3 col-xs-6"><label for="tags">分类：</label><input class="form-control inline-element padding-control" type="text" v-model="tags" placeholder="计算机；互联网" /></span>
				</div>
					
				<!-- row 2 -->
				<div class="row">
					<span class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						<label for="message">留言：</label>
						<input name="message" type="text" class="form-control description" v-model="message" placeholder="谈谈你对这本书的感受 / 你为什么想要这本书？">
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
					<span v-if="shareType == 1" class="col-lg-2"><label for="">期望价格（元）:</label><input type="text" class="form-control inline-element price" placeholder="0" v-model="price"></span>
				</div>

				<div class="row-4">
					<button class="btn btn-success">发布</button>
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
				tags: '',
				message: '',
				shareType: 1,
				price: ''
			}
		}
	}
</script>

<style scoped>



	.publish-container{
		border: 1px solid #ccc;
		padding: 20px 20px;
		position: relative;
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