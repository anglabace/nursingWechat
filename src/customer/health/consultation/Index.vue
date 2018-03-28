<template>
    <div class="healthConsultation">
       <v-header></v-header>
       <p>每到秋冬季节，雾霾就会有所加重，人体长时间暴露在PM2.5较多的地方，可增加很多疾病的发病风险。而这个时候，饮食防霾的说法就会流传开来，那么，防霾究竟能不能靠“吃”？</p>
        <p>每到秋冬季节，雾霾就会有所加重，人体长时间暴露在PM2.5较多的地方，可增加很多疾病的发病风险。而这个时候，饮食防霾的说法就会流传开来，那么，防霾究竟能不能靠“吃”？</p>
       <img src="/static/img/css/common/col_cover_2.jpg">
         <p>每到秋冬季节，雾霾就会有所加重，人体长时间暴露在PM2.5较多的地方，可增加很多疾病的发病风险。而这个时候，饮食防霾的说法就会流传开来，那么，防霾究竟能不能靠“吃”？</p>
          <p>每到秋冬季节，雾霾就会有所加重，人体长时间暴露在PM2.5较多的地方，可增加很多疾病的发病风险。而这个时候，饮食防霾的说法就会流传开来，那么，防霾究竟能不能靠“吃”？</p>
           <p>每到秋冬季节，雾霾就会有所加重，人体长时间暴露在PM2.5较多的地方，可增加很多疾病的发病风险。而这个时候，饮食防霾的说法就会流传开来，那么，防霾究竟能不能靠“吃”？</p>
          <p>每到秋冬季节，雾霾就会有所加重，人体长时间暴露在PM2.5较多的地方，可增加很多疾病的发病风险。而这个时候，饮食防霾的说法就会流传开来，那么，防霾究竟能不能靠“吃”？</p>
           <p>每到秋冬季节，雾霾就会有所加重，人体长时间暴露在PM2.5较多的地方，可增加很多疾病的发病风险。而这个时候，饮食防霾的说法就会流传开来，那么，防霾究竟能不能靠“吃”？</p>
          <p>每到秋冬季节，雾霾就会有所加重，人体长时间暴露在PM2.5较多的地方，可增加很多疾病的发病风险。而这个时候，饮食防霾的说法就会流传开来，那么，防霾究竟能不能靠“吃”？</p>
          <div class="sever" v-on:click="popupVisible4 = true"><i class="iconfont">&#xe63e;</i>申请服务</div>
      <mt-popup v-model="popupVisible4" position="bottom" class="mint-popup-4">
         <div class="popbottom">
         	 <div class="input-list">
         	 	<label>姓名</label>
         	 	<input value="" placeholder="留下您的姓名" />
         	 </div>
         	 <div class="input-list">
         	 	<label>电话</label>
         	 	<input value="" placeholder="留下您的电话" />
         	 </div>
         	 <button class="button" style="background-color: #94ca52;color: white;font-size: 1.2rem;">申请服务</button>
         </div>
    </mt-popup>
    </div>
</template>
<script>
    import vHeader from './../../common/Header.vue';
    import{Cell,CellSwipe,Popup} from 'mint-ui';
    export default {
    	data(){
    		return {
    		  popupVisible4:false
    		}
    	},
    	created() {
    		  this.$store.state.headings=this.$router.history.current.name; //修改标题
    		  this.$store.state.isFooterShow=false; //显示底部导航
    	},
        components:{
            vHeader,
            CellSwipe,
            Cell,
            Popup
        },
       methods: {
	        
      },mounted: function () { //加载完成后执行
            
      }
    }
</script>
<style scoped="scoped">
	.head-portrait{ position: relative; width: 100%; display: flex; box-sizing: border-box; padding:3rem 1rem; background: #fff;font-size: 16px;}
	.portrait{ width: 60px; height: 60px;border-radius: 50%; overflow: hidden; float: right; position: absolute; top:1rem; right:1rem;}
	.healthConsultation{position: absolute;top:0;left: 0; bottom: 0; right: 0; box-sizing: border-box; padding: 1rem; padding-top: 4rem; height: 100%; overflow-y: scroll; background: #fff;}
    .healthConsultation p{font-size: 1.2rem; line-height: 20px; text-indent: 2rem; text-align: justify; box-sizing: border-box;}
    .healthConsultation .sever{ position:fixed;right:0.5rem;bottom:1rem; padding: 0; text-align:center;
    background:#94ca52; width:80px; height:80px; color: #fff; border-radius: 50%;font-size:1.2rem; box-shadow: 0 5px 10px #fff;}
    .healthConsultation .sever .iconfont{font-size:2.5rem;display: block; margin-top:10px;}
    .healthConsultation  .popbottom,.healthConsultation  .mint-popup{width:100%; margin: 0 auto; background: #fff; text-align: center; box-sizing: border-box;}
    .healthConsultation  .popbottom{ padding: 2rem;}
    .healthConsultation  .input-list{font-size: 1.4rem; margin-bottom: 2rem;}
    .healthConsultation  .input-list input{ padding:10px; margin-left: 1rem;border-radius: 5px; border:1px solid #eee; font-size: 1.2rem;}
</style>