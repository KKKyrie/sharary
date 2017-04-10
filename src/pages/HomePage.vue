<template>
	<div>
		<SearchComponent></SearchComponent>
		<PublishComponent></PublishComponent>
		<WrapComponent></WrapComponent>
	</div>
</template>

<script>
	import SearchComponent from '../components/home/search-component.vue';
	import PublishComponent from '../components/home/publish-component.vue';
	import WrapComponent from '../components/home/wrap-component.vue';

	export default {
		components: { SearchComponent, PublishComponent, WrapComponent }
	}
</script>

<style scoped>

</style>