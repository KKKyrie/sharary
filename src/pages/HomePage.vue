<template>
	<div>
		<SearchComponent></SearchComponent>
		<PublishComponent @publishBook="publishListener"></PublishComponent>
		<WrapComponent ref="wrapComponent"></WrapComponent>
	</div>
</template>

<script>
	import SearchComponent from '../components/home/search-component.vue';
	import PublishComponent from '../components/home/publish-component.vue';
	import WrapComponent from '../components/home/wrap-component.vue';

	export default {
		components: { SearchComponent, PublishComponent, WrapComponent },

		methods: {
			publishListener(publishData){
				this.$refs.wrapComponent.addBook(publishData);
			}
		}
	}
</script>

<style scoped>

</style>