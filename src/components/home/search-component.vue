<template>
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-8 col-md-offset-2 col-sm-12 col-xs-12">
					<div class="form-control search-container">
					    <input type="text" class="search-input" placeholder="搜索你想要的书">
					    <span class="glyphicon glyphicon-search pull-right search-btn"></span>
					</div>
			</div>
		</div>
	</div>
</template>

<script>
	
	export default {
		
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