<template>
	<div class="contact-container">
		<span class="contact-btn" title="直接向 TA 发送你想对 TA 说的话" @click.stop="showDialog">
			<span v-if="!displayInput" class="glyphicon glyphicon-menu-down">&nbsp;</span>
			<span v-else class=" glyphicon glyphicon-menu-up">&nbsp;</span>
			联系 TA
		</span>
		<hr v-if="displayInput" />
		<div class="contact-dialog" v-if="displayInput">
			<input type="text" class="form-control input-area" placeholder="向 TA 发送你想说的话..." />
			&nbsp;
			<span class="glyphicon glyphicon-send send-btn" title="发送"></span>
		</div>

	</div>
	
</template>

<script>
	
	export default {
		data(){
			return {
				displayInput: false
			}
		},

		methods: {
			showDialog(){
				this.displayInput = !this.displayInput;
			}
		}
	}

</script>

<style scoped>
	
	.contact-container{
		margin-top: 10px;
		padding: 10px;
	}

	.contact-btn{
		width: 100px;
		text-align: center;
		display: inline-block;
		margin-left: 50%;
		transform: translateX(-50px);

		cursor: pointer;
	}

	.contact-btn:hover{
		color: #42b983;
	}

	hr{
		color: #2c3e50;
		margin: 10px 5px;
	}


	.contact-dialog{
		margin: 5px auto;
		width: 70%;
	}

	.input-area{
		width: 80%;
		display: inline-block;
	}

	.send-btn{
		cursor: pointer;
	}

	.send-btn:hover{
		color: #42b983;
	}

</style>