<template>
	<div class="corner-container" :style="{backgroundColor: color}">{{ wording }}</div>
</template>

<script>
	export default {
		props: ['type'],

		created(){
			let _type = this.type;
			if (_type == '0'){
				this.color = '#42b983';
				this.wording = '我有';
			}else if (_type == '1'){
				this.color = '#ae2e2e';
				this.wording = '我要';
			}
		},

		data(){
			return {
				color: '',
				wording: ''
			}
		}
	}
</script>

<style scoped>
	.corner-container{
		position: absolute;
		top: 5px;
		right: -30px;
		width: 100px;
		padding: 3px;
		transform: rotate(45deg);
		color: white;
		text-align: center;
		box-shadow: 0px 5px 5px #ccc;
	}
</style>