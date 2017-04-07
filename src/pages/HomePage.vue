<template>
	<div>
		<PublishComponent></PublishComponent>
		<WrapComponent></WrapComponent>
	</div>
</template>

<script>
	import PublishComponent from '../components/home/publish-component.vue';
	import WrapComponent from '../components/home/wrap-component.vue';

	export default {
		components: { PublishComponent, WrapComponent }
	}
</script>

<style scoped>

</style>