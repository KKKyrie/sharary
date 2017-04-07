<template>
	<div class="tag-container">
		<TagComponent></TagComponent>
	</div>
</template>

<script>
	
	import TagComponent from './tag-component.vue';

	export default {
		components: { TagComponent }
	}
</script>

<style scoped>
	.tag-container{
		border: 1px solid blue;
		display: inline-block;
		padding: 2px;
	}
</style>