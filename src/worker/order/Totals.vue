<template>
    <div class="order-totals">
       <v-header></v-header>
        <div class="list">
			<i class="iconfont">&#xe633;</i>
			<h3>添加医院</h3>
			<div>
				<p>贵州省第一人民医院</p>
			    <p  v-on:click='go("/worker/hospital")' class="addhospital"><i class="iconfont">&#xe63e;</i>还可以添加2家医院</p>
			</div>
		</div>
			<div class="list">
			<i class="iconfont">&#xe630;</i>
			<h3>护理等级</h3>
			<p> <button v-for="(item,index) in ServiceStar" class="but" :class="{'but-red':flag==index}" v-on:click='serveClik(item.number,index)'>{{item.title}}</button>
			</p>
		</div>
		<div class="list">
			<i class="iconfont">&#xe61b;</i>
			<h3>病人性别</h3>
			<p>
				<button v-for="(item,index) in gender" class="but" :class="{'but-red':genderflag>=index}" v-on:click='genderClik(item.number,index)'>{{item.title}}</button>
			</p>
		</div>
		  <div class="list">
			<i class="iconfont">&#xe615;</i>
			<h3>陪护时间</h3>
			<div class="mt-radio">
				
				<mt-checklist v-model="value" :options="options1"></mt-checklist>
			</div>
		</div>
		<button class="button button-green">确认设置</button>
    </div>
</template>
<style>
	.head-portrait{ position: relative; width: 100%; display: flex; box-sizing: border-box; padding:3rem 1rem; background: #fff;font-size: 16px;}
	.portrait{ width: 60px; height: 60px;border-radius: 50%; overflow: hidden; float: right; position: absolute; top:1rem; right:1rem;}
    .order-totals{position: absolute;top:0;left:0;bottom: 0;top:0;width: 100%; height: 100%; background: #fff; padding-top: 4rem;}
    .order-totals .list{display: flex; box-sizing: border-box; width: 100%;margin: 0 auto; padding: 1rem; background: #fff;}
    .order-totals .list h3{font-size: 1.2rem; padding: 0 1rem;}
    .order-totals .list .iconfont{font-size:1.6rem;}
    .order-totals .list p{ margin-bottom:3px;}
    .order-totals .but{border-radius: 5px; border:1px solid #eee;background: #fff; padding: 0.5rem 0; width:3.5rem; margin-right: 0.5rem;}
    .order-totals .but-red{background:#94ca52;color: #fff;}
    .order-totals .button-green{ display: block; margin:5rem auto; background: #94ca52;border-color: #94ca52;font-size: 1.2rem;}
    .order-totals .addhospital{border: 1px solid #94ca52; margin-top:1rem; border-radius: 5px; 
    display: block; width: 100%; text-align: center; height: 2rem; line-height: 2rem; overflow: hidden;
    padding:5px 5px;font-size: 1.2rem;
    }
    .mt-radio .mint-cell-wrapper,.mt-radio .mint-cell:last-child{background: none; padding: 0;}
     .mt-radio .mint-cell{min-height:35px; margin-top: -4px;}
    .mt-radio .mint-radiolist-title,.mt-radio  .mint-checklist-title{ display:none}
    .mt-radio .mint-checklist-label{padding: 0;}
    .mt-radio .mint-checkbox-input:checked + .mint-checkbox-core{    background-color: #94ca52;
    border-color: #94ca52;}
</style>
<script>
	import router from './../../router';
    import util from './../../js/util/util.js';
    import vHeader from './../common/Header.vue';
    import{Cell,Checklist } from 'mint-ui';
    export default {
    	data(){
    		return {
    			    value:["07:30—19:30"],
    			    flag:0,
      	            genderflag:0,
    	        	ServiceStar:[{
			             "title":"初级",
			             "number":"160"
			           },{
			             "title":"中级", 
			             "number":"220"
			           },{
			             "title":"高级",
			             "number":'250'
			           }],
			        gender:[{
			        	"title":"男",
			             "number":"0"
			        },{
			        	"title":"女",
			             "number":"1"
			        }]
    		}
    	},
    	created() {
    		  this.$store.state.headings=this.$router.history.current.name; //修改标题
    		  this.$store.state.isFooterShow=false; //显示底部导航
    		  this.options1 = ["07:30—19:30","19:30—07:30","00:00—24:00"];
    	},
        components:{
            vHeader,
            Cell,
            Checklist
        },methods:{
        	   go:function(url){
	       	    util.pushRouter(router,url,{})
	          },
	           serveClik:function(num,index){ //选择高级
			  		this.flag=index;
			  	  },
			  	starClik:function(index){ //点击选中
			  			this.isStar=index
			  	},
			  	genderClik:function(num,index){ //男女
			  		this.genderflag=index;
			  	},
        },mounted: function () { //加载完成后执行
      }
    }
</script>
