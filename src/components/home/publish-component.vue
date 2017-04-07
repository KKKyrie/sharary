<template>

	<div class="publish-container">
		<!-- row 1 -->
		<div class="row-1">
			<span>
				<label for="infoType">类型：</label>
				<select name="infoType" class="form-control inline-element info-type" v-model="infoType">
					<option value="0">我有这本书</option>
					<option value="1">我要这本书</option>
				</select>
			</span>

			<span><label for="bookName">书名：</label><input class="form-control inline-element book-name" type="text" v-model="bookName" placeholder="无需添加书名号" /></span>
			<span><label for="tags">分类：</label><input class="form-control inline-element tags" type="text" v-model="tags" placeholder="计算机；互联网" /></span>
		</div>
			
		<!-- row 2 -->
		<div class="row-2">
			<span>
				<label for="message">留言：</label>
				<input name="message" type="text" class="form-control description" v-model="message" placeholder="谈谈你对这本书的感受 / 你为什么想要这本书？">
			</span>
		</div>
			
		<!-- row 3 -->
		<div class="row-3">
			<span>
				<label for="">共享方式：</label>
				<select class="form-control inline-element share-type" v-model="shareType">
					<option value="0">我要交换</option>
					<option value="1">我要交易</option>
				</select>	
			</span>
			<span v-if="shareType == 1"><label for="">期望价格：</label><input type="text" class="form-control inline-element price" placeholder="0" v-model="price">&nbsp;元</span>
		</div>

		<div class="row-4">
			<button class="btn btn-success">发布</button>
			<span>&nbsp;&nbsp;&nbsp;</span>
			<button class="btn btn-default">取消</button>
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
		width: 61.8%;
		margin: auto;
		padding: 10px 20px;
		position: relative;
	}

	.row-1{
		display: flex;
		-webkit-display: flex;
		justify-content: space-around;
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

	.info-type{
		width: 120px;
		margin-right: 50px;
	}

	.book-name{
		width: 150px;
		margin-right: 50px;
	}

	.tags{
		width: 150px;
	}

	.description{
		margin-bottom: 20px;
	}

	.share-type{
		width: 130px;
		margin-right: 50px;
	}

	.price{
		width: 100px;
	}





</style>