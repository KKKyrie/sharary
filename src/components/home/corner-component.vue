<template>
	<div class="corner-container">我有</div>
</template>

<script>
	export default {}
</script>

<style scoped>
	.corner-container{
		position: absolute;
		top: 5px;
		right: -30px;
		width: 100px;
		padding: 3px;
		transform: rotate(45deg);
		background-color: #42b983;
		/* #ae2e2e */
		color: white;
		text-align: center;

		box-shadow: 0px 5px 5px #ccc;
	}
</style>