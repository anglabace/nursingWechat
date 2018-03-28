<template>
  <div class="supervisor">
  	 <ul class="addrlist">
		 	<li v-on:click='go("/supervisor/announce")'>
		 		<i class="iconfont" style="color: #00B7FF;">&#xe62b;</i>
		 	 	<p>发布公告</p>
		 	</li>
		 	<li v-on:click='go("/supervisor/sendorders")'>
		 		<i class="iconfont">&#xe618;</i>
		 	 	<p>派单</p>
		 	</li>
		 	<li v-on:click='go("/supervisor/complainthandling")'>
		 		<i class="iconfont" style="color: #F32043;">&#xe616;</i>
		 	 	<p>投诉处理</p>
		 	</li>
		 </ul>
		 
		<h3 class="title">医院订单</h3>
     	<ul class="Quick-entry">
	     		<li v-on:click='go("/supervisor/List")'>
	     			<i class="iconfont">&#xe610;</i>
	     			<p>最新订单12</p>
	     		</li>
	     		<li style="background: #649dfc;" v-on:click='go("/supervisor/List")'>
	     			<i class="iconfont">&#xe63a;</i>
	     			<p>未开始订单1</p>
	     		</li>
	     		<li style="background: #F44336;" v-on:click='go("/supervisor/List")'>
	     			<i class="iconfont">&#xe62a;</i>
	     			<p>进行中订单2</p>
	     		</li>
	     			<li v-on:click='go("/supervisor/List")'>
	     			<i class="iconfont" style="background:#00CC66;">&#xe63d;</i>
	     			<p>快结束12</p>
	     		</li>
	     </ul>
	     <h3  class="title cl">护工状态</h3>
    <div class="page-loadmore-wrapper" ref="wrapper">
      <mt-loadmore :bottom-method="loadBottom"  :bottom-all-loaded="allLoaded" ref="loadmore">
           <table class="table">
		       	<tr>
		       		<td>护工</td>
		       		<td>状态</td>
		       	</tr>
	       	   	<tr v-for="item in list">
		       		<td>李兰花{{item}}</td>
		       		<td>体息</td>
	       	  </tr>
       </table>
      </mt-loadmore>
    </div>
  </div>
</template>
<style>
	.supervisor{background: #fff; position:absolute; top:0;left:0; right: 0; bottom: 0; width: 100%; height: 100%; padding-top:4rem; overflow-y: scroll;}
    .supervisor .title{padding:1rem;font-size: 1.4rem;}
	.supervisor .Quick-entry{ width: 100%;text-align: center; margin:0 0.5rem;}
	.supervisor .Quick-entry li{width:90px;text-align: center; background:#384862; margin:0.5rem; color: #fff; margin-bottom: 10px; display: inline-block;float: left;}
	.supervisor .Quick-entry li i{ display: block;font-size:30px; padding: 10px;}
	.supervisor .Quick-entry li p{background:#F0F0F0; color:#333;padding: 10px;}
	.supervisor .table{width:98%;border: 1px solid #eee; margin: 1rem auto 0;}
    .supervisor .table tr{border-bottom: 1px solid #eee; }
    .supervisor .table td{border-right: 1px solid #eee; text-align: center; padding: 1rem 0;}
    .supervisor .table tr:first-child{font-size: 1.2rem;font-weight: 700;}
    .supervisor .table tr td:first-child{ width: 30%;}
    .supervisor .addrlist{ text-align: center; width: 100%; margin:0 auto; padding:1rem 0; background:#F6F6F6;}
    .supervisor .addrlist li{ display: inline-block; width: 30%;font-size: 1.2rem;}
    .supervisor .addrlist li .iconfont{font-size:2.5rem; color: #00CC66;}
    .page-loadmore-wrapper{overflow-y:scroll; position: relative;padding-bottom:20px;}
</style>

<script>
	import router from './../../router';
import util from './../../js/util/util.js';
	import {Loadmore} from 'mint-ui';
  export default {
    data() {
      return {
      	isStart:true,
      	isFinish:false,
        list: [],
        allLoaded: false,
        bottomStatus: '',
      };
    },

    methods: {
    	go:function(url){
    		 util.pushRouter(router,url,{});
    	},
      handleBottomChange(status) {
        this.bottomStatus = status;
      },
      loadBottom() {
        setTimeout(() => {
          let lastValue = this.list[this.list.length - 1];
          if (lastValue < 40) {
            for (let i = 1; i <= 10; i++) {
              this.list.push(lastValue + i);
            }
          } else {
            this.allLoaded = true;
          }
          this.$refs.loadmore.onBottomLoaded();
        }, 1500);
      }
    },
    created() {
      for(let i = 1; i <= 10; i++) {
         this.list.push(i);
        }
    },
    mounted() {
    
    }
  };
</script>
