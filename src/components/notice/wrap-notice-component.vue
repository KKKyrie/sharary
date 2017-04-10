<template>
	<div class="container-fluid wrap">
		<div class="row">
			<h2 class="wrap-title">收到的消息</h2>
			<h3 class="hint">加载中...</h3>
		</div>
		<div class="row">
			<div class="wrap-container col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1 col-sm-12 col-xs-12">
				<NoticeComponent></NoticeComponent>
			</div>
		</div>
	</div>
</template>

<script>
		
	import NoticeComponent from './notice-component.vue';

	export default {
		components: { NoticeComponent }

	};


</script>

<style scoped>
	.wrap{
        margin:30px auto;
        padding:20px;
    }


    .wrap-title{
    	font-weight: bold;
    }

    .hint{
    	text-align: center;
    	color: gray;
    	font-size: 20px;
    }
</style>