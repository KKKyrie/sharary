<template>
	<div class="container-fluid">
		<div class="row">
			<div class="wrap-container col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1 col-sm-12 col-xs-12">
				<BookComponent></BookComponent>
			</div>
		</div>
	</div>
</template>

<script>
	
	import BookComponent from './book-component.vue';

	export default {

		components: { BookComponent }

	}
</script>

<style scoped>
	
	.wrap-container{
		margin-top: 30px;
		margin-bottom: 30px;
		border: 1px solid #ccc;
		padding: 20px;
		/*width: 61.8%;*/
	}



</style>