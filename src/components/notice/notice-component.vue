<template>
    <div class="container-fluid">
        <div class="notice col-md-12 col-sm-12 col-xs-12">
            <span class="username">kyrieliu</span> @ "&nbsp;<p class="book-name">React大姐大姐打卡机发神经空间啊</p>"：
            
            <div class="row">
                <p class="message col-md-8 col-md-offset-2">这本书可以啊</p>
            </div>
            
            <div class="row">
                <p class="time col-md-2 col-md-offset-2">YYYY:HH:MM</p>
            </div>

            <div class="row">
                <div class="col-md-12 col-sm-12 col-xs-12">
                    <ReplyComponent></ReplyComponent>
                </div>
            </div>
        </div>    
    </div>
	
</template>

<script>

    import ReplyComponent from './reply-component.vue';

	export default{
		components: { ReplyComponent }
	}
    
</script>

<style scoped>

	.notice{
        border:1px solid #ccc;
        box-shadow: 0 0 7px #ccc;
        border-radius:8px;
        margin:20px auto;
        position: relative;
        padding-left: 15px;
        padding-top: 5px;
        padding-right: 15px;
    }

    .username{
    	font-weight: bold;
    	cursor: default;
    }

    .book-name{
    	color: gray;
    	max-width: 150px;
    	display: inline-block;
        margin-bottom: -5px;
    	/*取的时候控制字数，超过100字按一百字算，后加省略号*/
    	overflow: hidden;
    	white-space: nowrap;
    	text-overflow: ellipsis;
    }

    .message{
    	margin-top: 10px;
    	background-color: #ccc;
    	position: relative;
    	padding: 3px 10px;
    }

    .time{
        color: gray;
        font-size: 10px;
        position: relative;
    }
</style>