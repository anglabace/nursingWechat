<template>
	<div class="Health">
			<mt-swipe :auto="4000" style="height: 100px;">
		  <mt-swipe-item><img src="/static/img/updata/slide/u21.jpg"></mt-swipe-item>
		  <mt-swipe-item><img src="/static/img/updata/slide/u23.jpg"></mt-swipe-item>
		  <mt-swipe-item><img src="/static/img/updata/slide/u21.jpg"></mt-swipe-item>
		</mt-swipe>
		<div class="info">
			<div class="ti"><i class="iconfont icon">&#xe61c;</i>资讯
			 <i class="iconfont right" v-on:click='go("/worker/healthconsultationList")'>&#xe600;</i>
			</div>
			<ul>
				<li v-on:click='go("/worker/healthconsultationDetails")'><a>如何防范于未然如何防范于未然如何防范于未然如何防范于未然如何防范于未然</a></li>
				<li v-on:click='go("/worker/healthconsultationDetails")'><a>如何防范于未然如何防范于未然如何防范于未然如何防范于未然如何防范于未然</a></li>
				<li v-on:click='go("/worker/healthconsultationDetails")'><a>如何防范于未然如何防范于未然如何防范于未然如何防范于未然如何防范于未然</a></li>
				<li v-on:click='go("/worker/healthconsultationDetails")'><a>如何防范于未然如何防范于未然如何防范于未然如何防范于未然如何防范于未然</a></li>
				<li v-on:click='go("/worker/healthconsultationDetails")'><a>如何防范于未然如何防范于未然如何防范于未然如何防范于未然如何防范于未然</a></li>
				<li v-on:click='go("/worker/healthconsultationDetails")'><a>如何防范于未然如何防范于未然如何防范于未然如何防范于未然如何防范于未然</a></li>
				<li v-on:click='go("/worker/healthconsultationDetails")'><a>如何防范于未然如何防范于未然如何防范于未然如何防范于未然如何防范于未然</a></li>
				<li v-on:click='go("/worker/healthconsultationDetails")'><a>如何防范于未然如何防范于未然如何防范于未然如何防范于未然如何防范于未然</a></li>
				<li v-on:click='go("/worker/healthconsultationDetails")'><a>如何防范于未然如何防范于未然如何防范于未然如何防范于未然如何防范于未然</a></li>
				<li v-on:click='go("/worker/healthconsultationDetails")'><a>如何防范于未然如何防范于未然如何防范于未然如何防范于未然如何防范于未然</a></li>
				<li v-on:click='go("/worker/healthconsultationDetails")'><a>如何防范于未然如何防范于未然如何防范于未然如何防范于未然如何防范于未然</a></li>
				<li v-on:click='go("/worker/healthconsultationDetails")'><a>如何防范于未然如何防范于未然如何防范于未然如何防范于未然如何防范于未然</a></li>
				<li v-on:click='go("/worker/healthconsultationDetails")'><a>如何防范于未然如何防范于未然如何防范于未然如何防范于未然如何防范于未然</a></li>
				<li v-on:click='go("/worker/healthconsultationDetails")'><a>如何防范于未然如何防范于未然如何防范于未然如何防范于未然如何防范于未然</a></li>
				<li v-on:click='go("/worker/healthconsultationDetails")'><a>如何防范于未然如何防范于未然如何防范于未然如何防范于未然如何防范于未然</a></li>
				<li v-on:click='go("/worker/healthconsultationDetails")'><a>如何防范于未然如何防范于未然如何防范于未然如何防范于未然如何防范于未然</a></li>
				<li v-on:click='go("/worker/healthconsultationDetails")'><a>如何防范于未然如何防范于未然如何防范于未然如何防范于未然如何防范于未然</a></li>
				<li v-on:click='go("/worker/healthconsultationDetails")'><a>如何防范于未然如何防范于未然如何防范于未然如何防范于未然如何防范于未然</a></li>
				<li v-on:click='go("/worker/healthconsultationDetails")'><a>如何防范于未然如何防范于未然如何防范于未然如何防范于未然如何防范于未然</a></li>
				<li v-on:click='go("/worker/healthconsultationDetails")'><a>如何防范于未然如何防范于未然如何防范于未然如何防范于未然如何防范于未然</a></li>
				<li v-on:click='go("/worker/healthconsultationDetails")'><a>如何防范于未然如何防范于未然如何防范于未然如何防范于未然如何防范于未然</a></li>
				<li v-on:click='go("/worker/healthconsultationDetails")'><a>如何防范于未然如何防范于未然如何防范于未然如何防范于未然如何防范于未然</a></li>
				<li v-on:click='go("/worker/healthconsultationDetails")'><a>如何防范于未然如何防范于未然如何防范于未然如何防范于未然如何防范于未然</a></li>
				<li v-on:click='go("/worker/healthconsultationDetails")'><a>如何防范于未然如何防范于未然如何防范于未然如何防范于未然如何防范于未然</a></li>
				
			</ul>
		</div>
		
	</div>
</template>
<style type="text/css" scoped="scoped">
	.Healthtitle{width: 96%; height: 40px; line-height:40px;box-sizing: border-box; margin:1rem auto; background-color: #94ca52; border-radius: 5px; color: #fff; font-size: 1.4rem;}
    .Healthtitle .navigation{font-size: 2rem; padding:0 0.5rem 0 1rem;}
    
    .Health{position: absolute;top:0;left:0;bottom: 0; right: 0; width: 100%; height: 100%;}
    .Health .info{width:96%;min-height:400px; margin:1rem auto; border-radius:10px; display: block; }
    .Health .info .ti{font-size: 1.2rem;border-bottom: 1px solid #eee; padding:1rem 0;position: relative; padding-left:4rem;}
    .Health .info .icon{font-size: 1.6rem; background: #00C1DE; padding:0.3rem; color: #fff;position: absolute; top:0.5rem;left:1rem;border-radius:2px;}
    .Health .info .right{font-size: 1.6rem; color: #00C1DE;position: absolute;top:1rem;right: 1rem;}
    .Health .info ul{ width: 90%;height: 100%; margin:0 auto; overflow-y: scroll; padding:1rem 0;padding-bottom: 80px;}
    .Health  .info ul li{ line-height:27px;font-size: 1.2rem;padding: 8px 0;border-bottom: 1px dashed #eee;}
    .Health  .info ul li a{ color:#646464;}
    .Health .info ul li:before {
    content: "";
    display: inline-block;
    width: 10px;
    height: 10px;
    background-color: #94ca52;
    border-radius: 50%;
    margin-right: 1rem;
}
</style>
<script>
import router from './../../router';
import util from './../../js/util/util.js';
import{Swipe, SwipeItem,DatetimePicker  } from 'mint-ui';
export default {
    data () {
      return {
      	
      }
    },
    components: {
      Swipe,
      SwipeItem
    },
      created() {
    		 this.$store.state.isFooterShow=true; //显示底部导航
	    		 this.$store.state.flag=2;
	    		 document.title="护工端-我的"
    },
    methods: {
      go:function(url){
      	util.pushRouter(router,url,{})
      }
    }
  }
</script>
