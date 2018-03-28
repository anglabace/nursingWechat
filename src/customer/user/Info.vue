<template>
    <div class="info">
       <v-header></v-header>
       <div class="compile" v-on:click="compileClick">编辑</div>
       <div class="head-portrait">
       	  <p>头像</p> 
       	  <div class="form-group">
       	  	 <img :src="userData.avatar" class="portrait" />
       	  	 <img  :src="isImage" v-if="isImage" class="portrait" >
		     <input type="file" class="form-control" @change="onFileChange">
		 </div>
       </div>
      <div v-if="isAdd">
      	<mt-cell  title="姓名" :value="userData.phoneNum"></mt-cell>
	   	  <mt-cell  title="性别" :value="userData.gender"></mt-cell>
	   	  <mt-cell  title="出生日期" :value="userData.birthday"></mt-cell> 
      </div>
   	  <div v-if="!isAdd">
   	  	  <mt-field label="姓名"    placeholder="请输入用户名" v-model="userData.phoneNum"></mt-field>
	   	  <mt-field label="性别"    placeholder="请输入用户名" v-model="userData.gender"></mt-field>
          <mt-field label="出生日期"  placeholder="请输入生日" type="date" v-model="userData.birthday"></mt-field>
          <button class="button infoButton" v-on:click="saveClick">保存</button>
      </div>
    </div>
</template>
<style>
	.info{margin-top: 4rem;}
	.head-portrait{ position: relative; width: 100%; display: flex; box-sizing: border-box; padding:3rem 1rem; background: #fff;font-size: 16px;}
	.portrait{ width: 60px; height: 60px;border-radius: 50%; overflow: hidden; float: right; position: absolute; top:1rem; right:1rem;}
    .compile{position:fixed; top:1.2rem;right:1.2rem; z-index: 1000; color:#fff;font-size: 1.2rem;}
    .info .mint-field-core{text-align:right; color: #ccc;border: 1px solid #eee; padding: 0.3rem;}
    .infoButton{position: fixed;left:50%;bottom: 10%;background: #94ca52; color: #fff;width:10rem;border:0; margin-left:-5rem; font-size: 1.3rem;}
    .form-control{position: absolute; top:2rem; right: 0;width:80px; opacity: 0;}
</style>
<script>
	import router from './../../router';
    import util from './../../js/util/util.js'; 
    import vHeader from './../common/Header.vue';
    import{Cell,Toast} from 'mint-ui';
    export default {
    	data(){
    		return {
    			 isImage:false,
    			 isAdd:true,
    			 userData:{}
    			  /*{
				    "id": 1,
				    "openId": "oDAEOv4aV21upSgx7JLZPbhdEYbU",
				    "compileusername": "oDAEOv4aV21upSgx7JLZPbhdEYbU@nursingWork",
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
    		 this.$store.state.headings=this.$router.history.current.name; //修改标题
    		 this.$store.state.isFooterShow=false; //显示底部导航
    	},
        components:{
            vHeader,
            Cell
        },
        methods:{
        	compileClick:function(){ //编辑
        		this.isAdd=false;
        	},
        	saveClick:function(){ //保存
	        	 this.isAdd=true;
	        	 let $this=this;
	        	 let phoneNum=$this.userData.phoneNum;
	        	 let openId=$this.userData.openId;
	        	  util.Ajax('/api/user/'+this.$store.state.userId+'?_method=PATCH',{"phoneNum":phoneNum,"openId":openId},function(data){
			     	$this.userData=data.data;
			       })
        	},
        	onFileChange(e) { //头像处理 在提交的方法里，通过 this.isImage 即可
        		this.isAdd=false;
			  var files = e.target.files || e.dataTransfer.files;
			  if (!files.length)
			    return;
			   this.createImage(files[0]);
			  },
			createImage(file) {
			  var isImage = new Image();
			  var reader = new FileReader();
			  var vm = this;
			  reader.onload = (e) => {
			    vm.isImage = e.target.result;
			  };
			   reader.readAsDataURL(file);
			}
        },mounted: function () { //加载完成后执行
        	 var $this=this;
		     util.Ajax('/api/user/'+this.$store.state.userId+'?_method=GET',{},function(data){
		     	console.log(data)
		     	$this.userData=data.data;
		      })
      }
    }
</script>
