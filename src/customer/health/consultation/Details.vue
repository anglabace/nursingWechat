<template>
    <div class="healthConsultationDetails">
       <v-header></v-header>
       <h3>如何防范于未然</h3>
       <div class="h-title">
       	<span class="fl">发布：2017-10-17</span>
       	<span>阅读：253</span>
       	<i class="iconfont fr blue">&#xe625;</i>
       </div>
       <p>每到秋冬季节，雾霾就会有所加重，人体长时间暴露在PM2.5较多的地方，可增加很多疾病的发病风险。而这个时候，饮食防霾的说法就会流传开来，那么，防霾究竟能不能靠“吃”？</p>
        <p>每到秋冬季节，雾霾就会有所加重，人体长时间暴露在PM2.5较多的地方，可增加很多疾病的发病风险。而这个时候，饮食防霾的说法就会流传开来，那么，防霾究竟能不能靠“吃”？</p>
         <p>每到秋冬季节，雾霾就会有所加重，人体长时间暴露在PM2.5较多的地方，可增加很多疾病的发病风险。而这个时候，饮食防霾的说法就会流传开来，那么，防霾究竟能不能靠“吃”？</p>
          <p>每到秋冬季节，雾霾就会有所加重，人体长时间暴露在PM2.5较多的地方，可增加很多疾病的发病风险。而这个时候，饮食防霾的说法就会流传开来，那么，防霾究竟能不能靠“吃”？</p>
    </div>
</template>
<script>
    import vHeader from './../../common/Header.vue';
    import{Cell,CellSwipe} from 'mint-ui';
    export default {
    	data(){
    		return {
    		
    		}
    	},
    	created() {
    		  this.$store.state.headings=this.$router.history.current.name; //修改标题
    		  this.$store.state.isFooterShow=false; //显示底部导航
    	},
        components:{
            vHeader,
            CellSwipe,
            Cell
        },
       methods: {
	
      },mounted: function () { //加载完成后执行
            
      }
    }
</script>
<style scoped="scoped">
	.head-portrait{ position: relative; width: 100%; display: flex; box-sizing: border-box; padding:3rem 1rem; background: #fff;font-size: 16px;}
	.portrait{ width: 60px; height: 60px;border-radius: 50%; overflow: hidden; float: right; position: absolute; top:1rem; right:1rem;}
	.healthConsultationDetails{position: absolute;top:0;left: 0; bottom: 0; right: 0; box-sizing: border-box; padding: 1rem; padding-top: 4rem; height: 100%; background: #fff;}
    .healthConsultationDetails h3{ text-align: center;font-size: 1.4rem; padding: 1rem;font-weight: 700;}
    .healthConsultationDetails .h-title{border-bottom: 1px solid #eee; margin-bottom: 1rem; text-align: center; padding-bottom:0.3rem;}
    .healthConsultationDetails p{font-size: 1.2rem; line-height: 20px; text-indent: 2rem; text-align: justify;}
</style>