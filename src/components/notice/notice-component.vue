<template>
    <transition name="bounce">
    <div class="container-fluid">
        <div class="notice col-md-12 col-sm-12 col-xs-12">
            <span class="username">{{ notice.sender }}</span> @ "&nbsp;<p class="book-name">{{ notice.bookname }}</p>"：
            
            <div class="row">
                <p class="message col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1 col-xs-10 col-xs-offset-1">{{ notice.message }}</p>
            </div>
            
            <div class="row">
                <p class="time col-md-2 col-md-offset-2 col-sm-10 col-sm-offset-1 col-xs-10 col-xs-offset-1">{{ notice.date }}</p>
            </div>

            <div class="row">
                <div class="col-md-12 col-sm-12 col-xs-12">
                    <ReplyComponent :receiver="notice.sender" :bookname="notice.bookname"></ReplyComponent>
                </div>
            </div>
        </div>    
    </div>
    </transition>
	
</template>

<script>

    import ReplyComponent from '../home/contact-component.vue';

	export default{
		components: { ReplyComponent },

        props: ['notice']
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
        width: auto;
        padding: 0px;
    }

    /* transition */
    .bounce-enter-active {
      animation: bounce-in .5s;
    }
    .bounce-leave-active {
      animation: bounce-out .5s;
    }
    @keyframes bounce-in {
      0% {
        transform: scale(0);
      }
      50% {
        transform: scale(1.5);
      }
      100% {
        transform: scale(1);
      }
    }
    @keyframes bounce-out {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.5);
      }
      100% {
        transform: scale(0);
      }
    }

</style>