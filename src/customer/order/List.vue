<template>
	<div class="Health">
		<mt-navbar v-model="selected">
		  <mt-tab-item id="1">未开始</mt-tab-item>
		  <mt-tab-item id="2" v-on:click.native="processingOrderList()">进行中</mt-tab-item>
		  <mt-tab-item id="3" v-on:click.native="allCompletedOrderList()">已结束</mt-tab-item>
		</mt-navbar>
		<mt-tab-container v-model="selected">
		  <mt-tab-container-item id="1">
	
	     <template v-for="tiem in NotStarted" v-if="!isShow">
	     	  <div class="list" v-on:click='go("/customer/orderdetails",tiem.order_id,tiem.status)'>
		    	<h3>{{tiem.hospital.name}}</h3>
		    	<p>下单时间：{{tiem.createdAt}}</p>
		    	<p>总价：￥{{tiem.price}}元</p>
		    	<mt-button type="danger" class="danger" v-if="tiem.startStatus==0">未开始</mt-button>
		    	<template v-else>
		    		 <mt-button type="danger" class="danger" v-if='tiem.status=="unpaid"'>未付款</mt-button>
		    		 <mt-button type="danger" class="danger" v-if='tiem.status=="paid"'>已付款</mt-button>
		    		  <mt-button type="danger" class="danger" v-if='tiem.status=="progressing"'>正常进行中</mt-button>
		    		  <mt-button type="danger" class="danger" v-if='tiem.status=="refunding"'>退款进行中</mt-button>
		    		  <mt-button type="danger" class="danger" v-if='tiem.status=="complaints"'>投诉进行中</mt-button>
		    		  <mt-button type="danger" class="danger" v-if='tiem.status=="completed"'>正常已完成</mt-button>
		    		  <mt-button type="danger" class="danger" v-if='tiem.status=="refunded"'>退款已完成</mt-button>
		    		  <mt-button type="danger" class="danger" v-if='tiem.status=="complaints-out"'>投诉已完成</mt-button>
		    	</template>
		    	
		    </div>
	     </template>
	     
	     <div class="no-data" v-if="isShow">
	     	<i class="iconfont">&#xe649;</i>
	     	{{noData}}
	     </div>
	     
	     
		  </mt-tab-container-item>
		  <mt-tab-container-item id="2">
		      <template v-for="tiem in Processing"  v-if="!isHave">
	     	  <div class="list" v-on:click='go("/customer/orderdetails",tiem.order_id,tiem.status)'>
		    	<h3>{{tiem.hospital.name}}</h3>
		    	<p>下单时间：{{tiem.createdAt}}</p>
		    	<p>总价：￥{{tiem.price}}元</p>
		    	<mt-button type="danger" class="danger" v-if="tiem.ratingStatus==0">未评价</mt-button>
		    	<template v-else>
		    		 <mt-button type="danger" class="danger" v-if='tiem.status=="unpaid"'>未付款</mt-button>
		    		 <mt-button type="danger" class="danger" v-if='tiem.status=="paid"'>已付款</mt-button>
		    		  <mt-button type="danger" class="danger" v-if='tiem.status=="progressing"'>正常进行中</mt-button>
		    		  <mt-button type="danger" class="danger" v-if='tiem.status=="refunding"'>退款进行中</mt-button>
		    		  <mt-button type="danger" class="danger" v-if='tiem.status=="complaints"'>投诉进行中</mt-button>
		    		  <mt-button type="danger" class="danger" v-if='tiem.status=="completed"'>正常已完成</mt-button>
		    		  <mt-button type="danger" class="danger" v-if='tiem.status=="refunded"'>退款已完成</mt-button>
		    		  <mt-button type="danger" class="danger" v-if='tiem.status=="complaints-out"'>投诉已完成</mt-button>
		    	</template>
		    </div>
	     </template>
	     
	     		    
		        <div class="no-data" v-if="isHave">
	     	<i class="iconfont">&#xe649;</i>
	     	{{noData}}
	     </div>
	     
		  </mt-tab-container-item>
		  <mt-tab-container-item id="3">
		        <template v-for="tiem in AllCompleted" v-if="!isFinish">
	     	  <div class="list" v-on:click='go("/customer/orderdetails",tiem.order_id,tiem.status)'>
		    	<h3>{{tiem.hospital.name}}</h3>
		    	<p>下单时间：{{tiem.createdAt}}</p>
		    	<p>总价：￥{{tiem.price}}元</p>
		    	<mt-button type="danger" class="danger" v-if="tiem.startStatus==0">未开始</mt-button>
		    	<template v-else>
		    		 <mt-button type="danger" class="danger" v-if='tiem.status=="unpaid"'>未付款</mt-button>
		    		 <mt-button type="danger" class="danger" v-if='tiem.status=="paid"'>已付款</mt-button>
		    		  <mt-button type="danger" class="danger" v-if='tiem.status=="progressing"'>正常进行中</mt-button>
		    		  <mt-button type="danger" class="danger" v-if='tiem.status=="refunding"'>退款进行中</mt-button>
		    		  <mt-button type="danger" class="danger" v-if='tiem.status=="complaints"'>投诉进行中</mt-button>
		    		  <mt-button type="danger" class="danger" v-if='tiem.status=="completed"'>正常已完成</mt-button>
		    		  <mt-button type="danger" class="danger" v-if='tiem.status=="refunded"'>退款已完成</mt-button>
		    		  <mt-button type="danger" class="danger" v-if='tiem.status=="complaints-out"'>投诉已完成</mt-button>
		    		 <mt-button type="danger" class="cancel" v-if='tiem.status=="cancelled"'>已取消</mt-button>
		    		 
		    	</template>
		    </div>
	     </template>
	             <div class="no-data" v-if="isFinish">
	     	<i class="iconfont">&#xe649;</i>
	     	{{noData}}
	     </div>
		  </mt-tab-container-item>
		</mt-tab-container>
	</div>
	
</template>
<style>
	.Health  .mint-navbar{position: fixed; width: 100%; z-index: 999;box-sizing: border-box;box-shadow: 0 2px 4px #eee;}
	.Health .mint-tab-container{box-sizing: border-box; position: absolute; width:100%; height:100%; overflow-y: scroll; padding-bottom:6rem; top:4rem;}
	.Health .list{ position: relative; border-radius:5px; width:95%; box-sizing: border-box;padding: 1rem; background: #fff; margin: 1rem auto 0;box-shadow: 0 5px 10px #eee;}
	.Health .danger{position: absolute;bottom:1rem; right:2rem; font-size: 1rem; padding:0 0.5rem;height:30px; width:6rem; white-space: nowrap; text-overflow: ellipsis; overflow: hidden; }
	.Health .payment{position: absolute;bottom:1rem; right:2rem; font-size: 1rem; padding:0 0.5rem;height:30px;background: #94ca52;width: 5rem;}
	.Health  .cancel{position: absolute;bottom:1rem; right:2rem; font-size: 1rem; padding:0 0.5rem;height:30px;background:#C8C8CD;width: 5rem;}
	.Health .list h3{font-size:1.2rem; margin-bottom:1rem;color:#94ca52;}
	.Health .mint-tab-item-label{font-size: 1.2rem;}
	.Health .list p{ margin-bottom:0.5rem;}
	.Health .mint-navbar .mint-tab-item.is-selected{color:#94ca52;border-bottom:3px solid #94ca52}
</style>
<script>
import router from './../../router';
import util from './../../js/util/util.js';
import { Navbar, TabItem } from 'mint-ui';
export default {
    data () {
      return {
      	isShow:false,
      	isHave:false,
      	isFinish:false,
      	noData:'',
      	selected: '1',
      	NotStarted:[],
      	Processing:[],
      	AllCompleted:[]
      }
    },
    components: {
      Navbar,
      TabItem
    },
    methods: {
      go:function(url,orderId,status){
      	 util.pushRouter(router,url,{"orderId":orderId,"status":status})
      },
      notStartOrderList:function(){//未开始订单
    	     let $this=this;
    		  util.Ajax('/api/order/notStartOrderList?_method=GET',{"userId":this.$store.state.userId},function(data){
    		  	    console.log(data.data)
    		  	    if(data.data.length>0){
    		  	    	$this.NotStarted=data.data
    		  	    }else{
    		  	    	$this.isShow=true;
    		  	    	$this.noData="您没有未开始订单"
    		  	    }
                	
		      })
      },
        processingOrderList:function(){//进行中
    	     let $this=this;
    		  util.Ajax('/api/order/processingOrderList?_method=GET',{"userId":this.$store.state.userId},function(data){
    		  	   console.log(data)
                  if(data.data.length>0){
    		  	    	$this.Processing=data.data
    		  	    }else{
    		  	    	$this.isHave=true;
    		  	    	$this.noData="您没有进行中订单"
    		  	    }
		      })
      },
        allCompletedOrderList:function(){//获取已完成
    	      let $this=this;
    		  util.Ajax('/api/order/allCompletedOrderList?_method=GET',{"userId":this.$store.state.userId},function(data){
                	if(data.data.length>0){
    		  	       $this.AllCompleted=data.data
    		  	    }else{
    		  	    	$this.isFinish=true;
    		  	    	$this.noData="您没有已结束订单"
    		  	    }
		      })
      }
    },
    created() {
    		 this.$store.state.isFooterShow=true; //显示底部导航
    		 this.$store.state.flag=2;
    		 document.title="我的订单"
    },
    mounted: function () { //加载完成后执行
    	   this.notStartOrderList(); //未开始订单
    }
  }
</script>
