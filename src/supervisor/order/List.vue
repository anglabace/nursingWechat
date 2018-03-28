<template>
    <div class="orderList">
       <v-header></v-header>
       <div class="list" v-for="item in items" v-on:click='go("/supervisor/details")'>
       	 <div class="title">订单编码：{{item.OrderNumber}}</div>
       	 <div v-for="info in item.info" class="line">
       	 	 <h3>{{info.title}}</h3>
             <p>{{info.info}}</p>
       	 </div>
       </div>
       
    </div>
</template>
<script>
    import vHeader from './../common/Header.vue';
    import router from './../../router';
    import util from './../../js/util/util.js';
    import{Cell} from 'mint-ui';
    export default {
    	data(){
    		return {
    			 items:[{
    			  "OrderNumber":'201710161410794007996',
    			  "info":[{
				             "title":"服务时间:",
				             "info":"2017/10/10—2017/10/13",
				             },{
				             "title":"服务医院",
				             "info":"贵州省第一人民医院",
				           },{
				             "title":"综合评价",
				             "info":"态度：3星  ||技能：4星  ||服务很好",
				           }]
    			   },{
    			  "OrderNumber":'201710161410794007996',
    			  "info":[{
				             "title":"服务时间:",
				             "info":"2017/10/10—2017/10/13",
				             },{
				             "title":"服务医院",
				             "info":"贵州省第一人民医院",
				           },{
				             "title":"综合评价",
				             "info":"态度：3星  ||技能：4星  ||服务很好",
				           }]
    			   }]
    		}
    	},
    	  created() {
    		 this.$store.state.isFooterShow=false; //显示底部导航
    		  this.$store.state.headings=this.$router.history.current.name; //修改标题
    		 document.title="我的订单"
         },
        components:{
            vHeader,
            Cell
        },
        methods:{
        	 go:function(url){
		       	util.pushRouter(router,url,{})
		     }
        }
    }
</script>
<style type="text/css" scoped="scoped">
	.orderList{margin-top: 4.5rem; position: relative;}
	.orderList .list{ width:99%; margin:0.5rem auto; box-sizing: border-box; border:1px solid #eee; box-shadow: 0 0 10px 5px #eee; background-color: #fff;}
	.orderList .list h3{font-size: 1.3rem; width:25%; color: #00CC66; margin:0.5rem; box-sizing: border-box; height:2rem; line-height:2rem;}
	.orderList .list p{ padding: 0.5rem;font-size: 1.2rem; overflow: hidden; width: 75%; white-space: nowrap; text-overflow: ellipsis; height:2rem; line-height:2rem;}
	.orderList .title{background: #00CC66; color: #fff; text-align:left; font-size: 1.4rem; padding: 0.5rem; box-sizing: border-box;}
	.orderList .mt-button{margin: 0 auto 1rem;display:block;}
	.orderList .line{ display: flex;}
</style>