<template>
	<div class="wrap-container">
		<BookComponent></BookComponent>
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
		margin: 30px auto;
		border: 1px solid #ccc;
		padding: 20px;
		width: 61.8%;
	}



</style>