<template>
	<div>
		<div class="publish-container">
			<select class="form-control inline-element info-type" v-model="infoType">
				<option value="0">我有这本书</option>
				<option value="1">我要这本书</option>
			</select>
			
			<span><label>书名：</label><input class="form-control inline-element book-name" type="text" v-model="bookName" placeholder="无需添加书名号" />
</span>
			<span><label>分类：</label><input class="form-control inline-element tags" type="text" v-model="tags" placeholder="至少添加一个，用分号隔开" />
</span>
			<br/>

			<input type="text" class="form-control description" v-model="description" placeholder="谈谈你对这本书的感受 / 你为什么想要这本书？">

			<label for="">共享方式：</label>
			<select class="form-control inline-element share-type" v-model="shareType">
				<option value="0">我要交换</option>
				<option value="1">我要交易</option>
			</select>
			<span v-if="shareType == 1"><label for="">期望价格：</label><input type="text" class="form-control inline-element price" placeholder="0" v-model="price">元</span>
			<br />
			<button class="btn btn-success publish-btn">发布</button>
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
				description: '',
				shareType: 1,
				price: ''
			}
		}
	}
</script>

<style scoped>

	.publish-container{
		border: 1px solid #ccc;
		width:60%;
		margin: auto;
		padding: 10px 20px;
	}

	.inline-element{
		display: inline;
		margin-bottom: 20px;
	}

	.info-type{
		width: 150px;
		margin-right: 50px;
	}

	.book-name{
		width: 200px;
		margin-right: 50px;
	}

	.tags{
		width: 250px;
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

	.publish-btn{
		margin-left: 90%;
	}




</style>