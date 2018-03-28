<template>
	<div class="Workers">
		<mt-swipe :auto="4000">
		  <mt-swipe-item><img src="../../../static/img/updata/slide/u21.jpg"></mt-swipe-item>
		  <mt-swipe-item><img src="../../../static/img/updata/slide/u23.jpg"></mt-swipe-item>
		  <mt-swipe-item><img src="../../../static/img/updata/slide/u21.jpg"></mt-swipe-item>
		</mt-swipe>
		<div class="list">
			<i class="iconfont">&#xe633;</i>
			<h3>陪护医院</h3>
			<p v-on:click='hospitalCilk("/customer/hospital")'><span class="info">{{hospitalName}}</span><i class="iconfont city-icon">&#xe629;</i></p>
		</div>
		<div class="list">
			<i class="iconfont">&#xe607;</i>
			<h3>开始时间</h3>
			<p  v-on:click="open('picker1')" >{{startDate}} <i class="iconfont picker">&#xe609;</i></p>
		</div>
		<div class="list">
			<i class="iconfont">&#xe60f;</i>
			<h3>结束时间</h3>
			<p v-on:click="open('picker2')" >{{endDate}} <i class="iconfont picker">&#xe609;</i></p>
		</div>
		<div class="list">
			<i class="iconfont">&#xe648;</i>
			<h3>服务星级</h3>
			<p> <button v-for="(item,index) in ServiceStar" class="but" :class="{'but-select':flag==index}" v-on:click='serveClik(item.number,index)'>{{item.title}}</button>
			</p>
		</div>
		<div class="list">
			<i class="iconfont">&#xe61b;</i>
			<h3>护工性别</h3>
			<p>
				<button  class="but" :class="{'but-select':isMale}" v-on:click='MaleClik()'>男</button>
				<button  class="but" :class="{'but-select':isFemale}" v-on:click='FemaleClik()'>女</button>
			</p>
		</div>
	<div class="list">
			<i class="iconfont">&#xe630;</i>
			<h3>护工星级</h3>
			<p>
				<i class="iconfont" v-for="(item,index) in 5" v-on:click='starClik(index)' :class="{'on':isStar>=index}">&#xe62f;</i>
			</p>
		</div>
    <div class="total">
    	<div class="price">合计：<span class="orange">￥{{price.total}}</span>元<br>(￥{{price.pricePerDay}}元/天)</div>
    	<div class="fees-and-services" v-on:click='go("/customer/Servicedescription")'>收费与服务</div>
    	<div class="choose-care" v-on:click='ChooseACare("/customer/workersList")'>选护工</div>
    </div>
   <mt-datetime-picker type="date" ref="picker1" v-model="value" year-format="{value}" month-format="{value}月"
      date-format="{value}日" hourFormat="{value}时" minuteFormat="{value}分" @confirm="StartTiemChange">
   </mt-datetime-picker>
      
    <mt-datetime-picker type="date" ref="picker2" v-model="value" year-format="{value}" month-format="{value}月"
      date-format="{value}日" hourFormat="{value}时" minuteFormat="{value}分" @confirm="FinishTiemChange"></mt-datetime-picker>
	</div>
</template>
<style type="text/css" scoped>
    .Workers{background: #fff;position: absolute;top:0;left:0;right: 0; bottom: 0; width: 100%; min-height: 100%;padding-bottom: 100px;}
    .Workers .mint-swipe{ margin-bottom:1rem;height: 120px; overflow: hidden;}
    .Workers .mint-swipe img{ width: 100%; height:auto;}
    .Workers .list{display: flex; box-sizing: border-box; width: 100%;margin: 0 auto; padding:1rem 2rem; background: #fff;}
    .Workers .list h3{font-size: 1.3rem; padding: 0 1rem; min-width:25%;}
    .Workers .list .iconfont{font-size:1.8rem;}
    .Workers .list p{height: 100%; width: 80%; line-height:1.9rem; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;position: relative;}
    .Workers .list p i{color: #ddd;}
    .Workers .list .info{ width:80%; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; display: inline-block;}
    .Workers .work-info{background: #fff; color:#F32043; text-indent:9rem; padding:0.5rem 0; font-size: 1.2rem;}
    .Workers .but{border-radius: 5px; border:1px solid #eee;background: #fff; padding: 0.5rem 0; width:3.5rem; margin-right: 0.5rem;}
    .Workers .but-select{background:#94ca52;color: #fff;}
    .Workers .total{ position:fixed;left:0;bottom:4.4rem; background: #fcfcfc; height: 4rem;width: 100%; box-sizing: border-box; display: flex;border-top: 1px solid #eee;}
    .Workers .price{ width:50%; text-align: center; box-sizing: border-box;line-height: 1.5rem;padding-top:4px;font-size: 1.2rem;}
    .Workers .price .orange{font-size: 1.4rem;}
    .Workers .fees-and-services{ height: 100%; line-height: 4rem; width:25%;color: #5aa6e6; text-align: center; font-size: 1.2rem;}
    .Workers .choose-care{height: 100%; line-height: 4rem; width:25%;background:#94ca52; color: #fff; text-align: center; font-size: 1.6rem;}
    .Workers .list p .on{color:#94ca52}
    .Workers .iconfont{ margin-right: 0.5rem;}
    .Workers .list .picker{font-size: 1.2rem; color: #4E4E4E; margin-left: 1rem;}
    .Workers .list  .city-icon{font-size: 1.2rem; color: #94ca52;margin-left: 1rem;position: absolute; top:0; right: 0;}
    @media screen and (max-width: 320px){
      .Workers .list{padding:0.7rem 2rem;}
    }
</style>
<script>
import router from './../../router';
import util from './../../js/util/util.js';
import{Swipe, SwipeItem,DatetimePicker,Toast} from 'mint-ui';
export default {
    data () {
      return {
      	isWorke:true,
      	hospitalId:'',
      	hospitalName:'',
      	Longitude:'',
        Latitude:'',
      	Star:1,
      	isStar:0,
      	flag:0,
      	isMale:true,
        isFemale:false,
      	ison:false,
      	series:'1',
      	male:'male',
      	female:'',
      	price:'',
      	ServiceStar:[{
             "title":"初级",
             "number":"1"
           },{
             "title":"中级", 
             "number":"2"
           },{
             "title":"高级",
             "number":'3'
           }],
      	value:'',
      	startDate:"",
      	endDate:""
      }
    },
    components: {
      Swipe,
      SwipeItem
    },
    created() {
    		 this.$store.state.isFooterShow=true; //显示底部导航
    		 this.$store.state.flag=0;
    		 document.title="找护工"
    		 var $this=this;
	  		util.getSessionLocation(function (location) { //获取经度
	            	    $this.longitude = location.Longitude;
	                   $this.latitude = location.Latitude;
	            
	          });
    	},
    methods: {
    serveClik:function(num,index){ //选择高级
  		   this.flag=index;
  		   this.series=num;
  		   this.priceInfo()
  	  },
  	starClik:function(index){ //点击选中星级
  			this.isStar=index;
  			let indexs=index+1
  			this.Star=indexs;
  			this.priceInfo();
  			console.log("当前星级:"+this.Star);
  	},
  	MaleClik:function(){ //男
  		if(this.isMale){
  			this.isMale=false
  			this.male=""
  		}else{
  		   this.isMale=true
  		    this.male="male"
  		}
  		this.priceInfo()
  	},
  	FemaleClik:function(){ //女
  		if(this.isFemale){
  			this.isFemale=false
  			   this.female=""
  		}else{
  		   this.isFemale=true
  		   this.female="female"
  		}
  		this.priceInfo();
  	},
  	hospitalCilk:function(url){
  		util.pushRouter(router,url,{"page":"workers"});
  	},
     go:function(url){
       	util.pushRouter(router,url,{})
     },
     ChooseACare:function(url){ //选择护工
     	let level=this.series; //等级
	    let src=this.male+","+this.female; //性别
	    let gender=src.replace(/^,+|,+$/g,"");
	    let startDate=this.startDate; //开始时间
        let endDate=this.endDate; //结束时间
        let star = this.Star;
     	util.pushRouter(router,url,{"gender":gender,"level":level,"hospitalId":this.hospitalId,"startDate":startDate,"endDate":endDate,"star":star});
     },
     priceInfo:function(){ //通过条件查询价格
     	  let $this=this;
     	  let level=this.series; //等级
     	  let startDate=this.startDate //开始时间
          let endDate=this.endDate //结束时间
          let star=this.Star //星级
          let src=this.male+","+this.female; //性别
	      let gender=src.replace(/^,+|,+$/g,"");
     	   util.Ajax('/api/price?_method=POST',{"startDate":startDate,"endDate":endDate,"level":level,"star":star},function(data){
    		  	   console.log(data);
                	$this.price=data.data;
		      })
     	   
     	    util.Ajax('/api/work/list?_method=POST',{"gender":gender,"level":level,"star":star},function(data){ //显示是否有护工
                    if(data.data.length<=0){
                    	$this.isWorke=false;
                    }
		      }) 
     },
      open(picker) {
        this.$refs[picker].open();
      },
      StartTiemChange(value){
      	console.log(value)
      	var DateInfo = new Date(value);
        let  Tiem= DateInfo.getFullYear() + '-' + (DateInfo.getMonth() + 1) + '-' + DateInfo.getDate();
        this.startDate=Tiem;
        console.log(this.startDate)
        this.priceInfo()
      },
       FinishTiemChange(value){
      	console.log(value)
      	var DateInfo = new Date(value);
        let  Tiem= DateInfo.getFullYear() + '-' + (DateInfo.getMonth() + 1) + '-' + DateInfo.getDate();
        this.endDate=Tiem;
//      if(this.endDate>this.startDate){
//      	Toast("开始时间必须小于结束时间")
//      }
        this.priceInfo()
      }
  },
   mounted:function(){
   	 if(this.$route.query.hospitalName==undefined){
   	 	 var $this=this;
           	 util.Ajax('/api/hospital/distance?_method=GET',{"lng":$this.longitude,"lat":$this.latitude},function(data){
    		  	  	  $this.hospitalName=data.data.name;
    		  	  	  $this.hospitalId=data.data.hospital_id;
		      })
   	 }else{
   	 	this.hospitalId=this.$route.query.hospitalId;
   	 	this.hospitalName=this.$route.query.hospitalName
   	 }
   	 var myDate = new Date(); //时间
   	 var myYear=myDate.getFullYear();        //获取当前年份(2位)
   	 var myMonth= myDate.getMonth();      //获取当前月份(0-11,0代表1月)
   	 var myDate= myDate.getDate();        //获取当前日(1-31)
   	 this.startDate=myYear + "-" + (myMonth + 1)+ "-" +myDate
   	 this.endDate=myYear + "-" + (myMonth + 1)+ "-" +myDate
   	 this.priceInfo();
   	 this.value= this.startDate;
   }
  }
</script>
