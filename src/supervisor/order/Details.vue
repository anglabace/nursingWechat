<template>
    <div class="o-details">
	
       <v-header></v-header>
       <div class="list" v-for="item in items">
       	 <div class="title">订单编码：{{item.OrderNumber}}</div>
       	 <template v-for="info in item.info">
       	 	 <h3>{{info.title}}</h3>
             <p>{{info.info}}</p>
             <div  v-for="items in info.list">
             	  <div class="personal-info">
             	  	 <div class="personal-head"><img :src="items.headPortrait" class="head-info"></div>
             	  	 <div>
             	  	 	<h3>{{items.name}}</h3>
             	  	    <p>{{items.ag}} {{items.gender}}</p>
             	  	 </div>
             	  </div>
             	  <div class="detalis-price">
             	  	共{{items.sky}}天：<span class="red">￥{{items.price}}</span>元
             	  </div>
             	 
             </div>
       	 </template>
       </div>
            <div class="red tiem" v-if="isShow">剩余支付时间：04:00</div>
            <mt-button type="danger" class="mt-button" v-if="isShow"  v-on:click="palyClick">立即支付</mt-button>
            
            <mt-button type="danger" class="mt-button mt10" v-if="isSatrt">待开始</mt-button>
       	    <mt-button type="default" class="mt-button" v-if="isCancel" v-on:click="cancellationOfOrder">取消订单</mt-button>
       	    
       	     <mt-button type="primary" class="mt-button mt10 bg-red" v-on:click="open('picker1')" v-if="isExchange">延长服务</mt-button>
       	    <mt-button type="primary" class="mt-button" v-if="isExchange" v-on:click='go("/customer/workersList")'>申请换护工</mt-button>
       	    <mt-button type="default" class="mt-button" v-if="isTermination" v-on:click="OrderToTerminate">订单终止</mt-button>
       	    <div class="cancellation-button" v-if="isTocomplete">服务-已完成</div>
            <div class="cancellation-button" v-if="isCancellation">取消-已完成</div>
            
             <mt-datetime-picker type="datetime" ref="picker1" v-model="value" year-format="{value}" month-format="{value}月"
      date-format="{value}日" hourFormat="{value}时" minuteFormat="{value}分" @confirm="StartTiemChange"></mt-datetime-picker>
    </div>
</template>
<script>
    import vHeader from './../common/Header.vue';
    import router from './../../router';
    import util from './../../js/util/util.js';
    import{Cell,Toast,MessageBox } from 'mint-ui';
    export default {
    	data(){
    		return {
    			 StartTiem:'',
    			 value:'',
    			 Type:'',
    			 isSatrt:false,
    			 isCancel:false,
    			 isShow:false,
    			 isExchange:false,
    			 isTermination:false,
    			 isCancellation:false,
    			 isTocomplete:false,
    			 items:[{
    			  "OrderNumber":'201710161410794007996',
    			  "info":[{
				             "title":"服务内容",
				             "info":"陪护",
				             },{
				             "title":"服务地址",
				             "info":"贵阳市—贵阳中医学院第二附属医院",
				           },{
				             "title":"服务时间",
				             "info":"2017/10/17—2017/10-19",
				           },{
				             "title":"服务星级",
				             "info":"III星",
				           },{
				             "title":"护工信息",
				             "list":[{
				             	"headPortrait":'/static/img/css/common/col_0_icon_0.gif',
				             	"gender":'女',
				             	"name":"李春花",
				             	"ag":"60岁",
				             	"sky":"3",
				             	"price":"360"
				             }]
				           }]
    		    }]
    		}
    	},
    	  created() {
    		 this.$store.state.isFooterShow=false; //显示底部导航
    		  this.$store.state.headings=this.$router.history.current.name; //修改标题
    		 document.title="我的订单";
    		
         },
        components:{
            vHeader,
            Cell,
            MessageBox
        },
       methods:{
       	     open(picker) {
		      	console.log(picker)
		        this.$refs[picker].open();
		      },
		      StartTiemChange(value){
		      	console.log(value)
		      	var DateInfo = new Date(value);
		        let  Tiem= DateInfo.getFullYear() + '-' + (DateInfo.getMonth() + 1) + '-' + DateInfo.getDate() + ' ' + DateInfo.getHours() + ':' + DateInfo.getMinutes() + ':' + DateInfo.getSeconds();
		        this.StartTiem=Tiem;
		      },
       	  palyClick:function(){ //支付成功
       	  	   MessageBox.confirm('￥360确定支付成功?', '提示').then(
       	  	   	action => {
       	  	   	   Toast("支付成功")
				},
       	  	   	 action => {
       	  	   	   Toast("取消支付")
				}
       	  	   );
       	  },
       	  cancellationOfOrder:function(){ //取消订单
       	  	 this.isCancellation=true;
       	  	 this.isShow=false;
       	  	 this.isSatrt=false
	    	 this.isCancel=false
       	  },
       	  OrderToTerminate:function(){ //订单终止
       	  	this.isCancellation=true;
       	  	this.isExchange=false;
       	  	this.isTermination=false;
       	  },
       	  go:function(url){
       	  	 util.pushRouter(router, url);
       	  }
       },
       mounted: function () { //加载完成后执行
    		 //
      		 var Type=this.$route.query.type
	    		  if(Type==0){ //未支付
	    			this.isShow=true;
	    			this.isCancel=true
		    	   }else if(Type==1){ //未开始
		    	    	this.isSatrt=true
		    	    	this.isCancel=true
		    	   }else if(Type==2){ //订行中
		    	    	this.isExchange=true;
		    	    	this.isTermination=true
		    	    }else if(Type==3){ //已完成
		    	    	  this.isTocomplete=true
		    	    }else if(Type==4){ //已取消
		    	    	this.isCancellation=true;
		    	    }

        }
    }
</script>
<style type="text/css" scoped="scoped">
	.o-details{margin-top: 4.5rem; position: relative;}
	.o-details .list{ width:99%; margin:0 auto; box-sizing: border-box; border:1px solid #eee; box-shadow: 0 0 10px 5px #eee; background-color: #fff;}
	.o-details .list h3{font-size: 1.4rem; color: #00CC66; margin:0.5rem;}
	.o-details .list p{ padding:0 0.5rem;font-size: 1.2rem; }
	.o-details .title{background: #00CC66; color: #fff; text-align: center; font-size: 1.4rem; padding: 0.5rem 0;}
	.o-details .mt-button{margin: 0 auto 1rem;display:block; width: 8rem; font-size: 1.2rem;}
	.o-details .personal-info{ display: flex;}
	.o-details .personal-head{ padding: 0 1rem 0 0.5rem;}
	.o-details .head-info{width:80px; height:80px; background: #eee; border-radius: 5px;}
	.o-details .detalis-price{font-size: 1.2rem; padding: 0.5rem;}
	.o-details .detalis-price .red{font-size: 1.4rem;}
	.o-details .tiem{font-size: 1.4rem; text-align: center; padding: 1rem 0;}
	.o-details .btn-cancellation{ border: 1px solid #E02828; margin-top: 2rem; width:10rem; background: #fff; color:#E02828;}
	.o-details .cancellation-button{border: 1px solid #F32043;background:#fff;font-size: 1.2rem; display: block; padding:1rem 0.5rem; color:#F32043; text-align: center; margin: 2rem auto; border-radius:5px; width:10rem;}
    .o-details .mt10{margin-top:2rem;}
    .o-details .bg-red{background: #FF0000;}
</style>