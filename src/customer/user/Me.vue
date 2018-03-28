<template>
	<div class="Me">
	<div class="me" v-on:click='go("/customer/info",userData.openId)'>
		<div class="user-img"><img :src="userData.avatar"></div>
		<div class="title">
			<p class="name">{{userData.name}}</p>
			<p>{{userData.phoneNum}}</p>
		</div>
	</div>
	<div class="me-tab">
	  	<!--<mt-cell to='/customer/thewallet' title="钱包">
     <i slot="icon" classF="iconfont" style="background:#FF4F2D;">&#xe623;</i>
    </mt-cell>-->
    <mt-cell to='/customer/coupons' title="优惠券">
      <i slot="icon" class="iconfont" style="background:#009BF7;">&#xe638;</i>
    </mt-cell>	
    <mt-cell to='/customer/complaints' title="投诉建议">
      <i slot="icon" class="iconfont" style="background:#FDAA3B;">&#xe62b;</i>
    </mt-cell>	
    <mt-cell  title="服务热线" to="tel:96028">
     <i slot="icon" class="iconfont" style="background:#AE5BFE;">&#xe616;</i>
     <span class="red" style="margin-right:3rem;">96028</span>
    </mt-cell>	
    <mt-cell to='/customer/sharing' title="分享">
      <i slot="icon" class="iconfont" style="background:#F32043;">&#xe618;</i>
    </mt-cell>	
    <mt-cell to='/customer/collect' title="收藏">
       <i slot="icon" class="iconfont" style="background:#00B7FF;">&#xe62f;</i>
    </mt-cell>	
     <mt-cell to='/customer/config' title="设置">
      <i slot="icon" class="iconfont" style="background:#F32043;">&#xe656;</i>
    </mt-cell>	
	</div>
	</div>
</template>

<script>
import router from './../../router';
import util from './../../js/util/util.js';
import{Indicator,Cell} from 'mint-ui';
export default {
    data () {
      return {
      	    userData:{},
      	      /*{
				    "id": 1,
				    "openId": "oDAEOv4aV21upSgx7JLZPbhdEYbU",
				    "username": "oDAEOv4aV21upSgx7JLZPbhdEYbU@nursingWork",
				    "name": "晖",
				    "birthday": "1997-12-07",
				    "phoneNum": "13985160123",
				    "gender": "male",
				    "avatar": "http://image.baidu.com/search/detail?ct=503316480&z=0&ipn=false&word=%E5%A4%B4%E5%83%8F&hs=0&pn=3&spn=0&di=169813820110&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&ie=utf-8&oe=utf-8&cl=2&lm=-1&cs=547138142%2C3998729701&os=1840643701%2C1875487181&simid=3533872911%2C354593644&adpicid=0&lpn=0&ln=30&fr=ala&fm=&sme=&cg=head&bdtype=0&oriquery=%E5%A4%B4%E5%83%8F&objurl=http%3A%2F%2Fwww.hnlywz.com%2Fa%2Fupload%2Fbd118381382.jpg&fromurl=ippr_z2C%24qAzdH3FAzdH3Fooo_z%26e3Bigsyoz_z%26e3Bv54AzdH3F8da9bld_z%26e3Bip4s&gsm=0",
				    "createdById": null
				},*/
	      }
	   },
	   created() {
	    		 this.$store.state.isFooterShow=true; //显示底部导航
	    		 this.$store.state.flag=3;
	    		 document.title="我的"
	    	},
	    components: {
	      Cell
	    },
	    methods: {
	      go:function(url,openId){
	      	console.log(openId)
	      	util.pushRouter(router,url,{"openId":openId})
	      },
	    getUser:function(id){
	      	let $this = this;
	      	util.Ajax('/api/user/'+id+'?_method=GET',{},function(data){
		     	console.log(data)
		     	$this.userData=data.data;
		      })
	      }
	    },
	    mounted:function(){
			var $this=this;
	    //微信
//		util.Ajax('/api/user/me?_method=GET',{},function(data){
//	     	console.log(data)
//	     	$this.$store.state.userId = data.data.user_id;
//	     	console.log("userId:"+$this.$store.state.userId)
//	     	$this.getUser($this.$store.state.userId);
//	      })
         //本地
         $this.getUser($this.$store.state.userId);
	    }
  }





</script>
<style>
	.Me .me{ width: 100%; margin: 0 auto 1rem; padding: 1rem 0; background: #fff; display: flex; box-sizing: border-box; text-align:left;border-bottom: 8px solid #eee;}
	.Me .user-img{width:80px;text-align:left; padding:0 10px;}
	.Me .name{font-size:1.4rem; margin-bottom:1rem; font-weight: 700;}
	.Me .title{ padding-left:1.5rem;font-size:1.4rem;}
	.Me .user-img img{ width:80px; height:80px; border-radius: 50%;display: block;}
	.Me .mint-cell:before{
		   content:" ";
		   position: absolute;
		   top:20px;
		   right:15px;
		   display: block;
		   width: 10px;
		   height: 10px;
		   border-top: 1px solid #d9d9d9;
		   border-right: 1px solid #d9d9d9;
		   transform:rotate(45deg);
	}
	.mint-cell-wrapper{border-bottom: 4px solid #f5f5f5;}
	.Me .mint-cell-title{position: relative;}
	.Me .mint-cell-title .mint-cell-text{ margin-left:4rem;}
	.Me .mint-cell .iconfont{ margin-right:1.2rem;font-size:1.4em;
	  position: absolute; top:-0.4rem;left:0; 
	  background:#ccc;
	  padding: 0.2rem; text-align: center;
	  color: #fff;
	  border-radius: 5px;
	  display: block;
	  overflow: hidden;
     width: 2rem;
	}
	.me-tab .mint-cell:first-child{
		    background-image: -webkit-linear-gradient(bottom, #d9d9d9, #d9d9d9 50%, transparent 50%);
		    background-image: linear-gradient(0deg, #d9d9d9, #d9d9d9 50%, transparent 50%);
		    background-size: 100% 1px;
		    background-repeat: no-repeat;
		    background-position: top;
     }
</style>