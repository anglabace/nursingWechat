<template>
	<div class="seniorInfo">
		<v-header></v-header>
		<div class="compile" v-on:click="compileClick">{{isUpdateT}}</div>
		<div class="head-portrait">
			<p>头像</p>
			<div class="form-group">
				<img :src="userData.avatar" class="portrait" />
				<img :src="isImage" v-if="isImage" class="portrait">
				<input type="file" class="form-control" accept="image/png,image/gif,image/jpeg" @change="onFileChange">
			</div>
		</div>
		<div v-if="isAdd">
			<mt-cell title="姓名" :value="userData.name"></mt-cell>
			<mt-cell title="电话" :value="userData.phoneNum"></mt-cell>
			<mt-cell title="性别" :value="userData.gender"></mt-cell>
			<mt-cell title="出生日期" :value="userData.birthday"></mt-cell>
			<mt-cell title="身份证号" :value="userData.idCardNum"></mt-cell>
			<mt-cell title="服务经验" :value="userData.exp"></mt-cell>
			<mt-cell title="所在省份/所在城市" :value="userData.curCity"></mt-cell>
			<!--<mt-cell title="所在城市" :value="userData.city"></mt-cell>-->
			<mt-cell title="个人简介" :value="userData.description"></mt-cell>
		</div>
		<div v-if="!isAdd">
			<mt-field label="姓名" placeholder="请输入用户名" v-model="userData.name"></mt-field>
			<mt-field label="电话" placeholder="请输入您的电话" v-model="userData.phoneNum"></mt-field>
			<mt-field label="性别" placeholder="请输入您的性别" v-model="userData.gender" id="input-sex"></mt-field>
			<mt-radio class="page-part" v-model="value1" :options="options1"/>
			<mt-field label="出生日期" placeholder="请输入生日" type="date" v-model="userData.birthday"></mt-field>
			<mt-field id="cardId" label="身份证号" placeholder="请输入您的身份证号码" v-model="userData.idCardNum"></mt-field>
			<mt-field label="服务经验" placeholder="请输入您工作了多少年" v-model="userData.exp" id="input-experience"></mt-field>
			<div class="popup_content">
				<mt-button  @click.native="handleClick('citypopupVisible')" id="input-city1">请选择城市 ></mt-button>
				<mt-cell title="选中的城市" :value="cityvalue"></mt-cell>  
				<mt-popup v-model="citypopupVisible" position="bottom" class="common_popup">
					<div class="common_popup_header">
						<div class="city-operation-btn" @click="hidePopup('citypopupVisible')">
						取消
						</div>
						<div class="city-operation-btn words-black" >
						选择城市
						</div>
						<div class="city-operation-btn" @click="suerResult()">
						确定
						</div>
					</div>
					<mt-picker :slots='addressSlots' @change='onAddressChange' ></mt-picker>
				</mt-popup>

			</div>
			<!--<mt-field label="所在省份/城市" placeholder="请输入您所在的省份" v-model="userData.prov" id="input-city"></mt-field>-->
     		<!--<mt-field label="所在城市" placeholder="请输入您所在的城市" v-model="userData.city"></mt-field>-->
     		<!--<mt-picker :slots="addressSlots" @change="onAddressChange" :visible-item-count="3" id="choose-city">--></mt-picker>
     		<mt-field label="个人简介" placeholder="请输入您的个人简介" v-model="userData.description" style="clear: both;"></mt-field>
			<button class="button infoButton" v-on:click="saveClick">保存</button>
			
			

		</div>
	</div>
</template>
<script type="text/babel">
	import vHeader from './../common/Header.vue';
	import util from './../../js/util/util.js';
	import { Cell } from 'mint-ui';
	import { Toast } from 'mint-ui';
	import { MessageBox } from 'mint-ui';
	import axios from 'axios';
	var i = {
    '北京': ['北京'],
    '广东': ['广州', '深圳', '珠海', '汕头', '韶关', '佛山', '江门', '湛江', '茂名', '肇庆', '惠州', '梅州', '汕尾', '河源', '阳江', '清远', '东莞', '中山', '潮州', '揭阳', '云浮'],
    '上海': ['上海'],
    '天津': ['天津'],
    '重庆': ['重庆'],
    '辽宁': ['沈阳', '大连', '鞍山', '抚顺', '本溪', '丹东', '锦州', '营口', '阜新', '辽阳', '盘锦', '铁岭', '朝阳', '葫芦岛'],
    '江苏': ['南京', '苏州', '无锡', '常州', '镇江', '南通', '泰州', '扬州', '盐城', '连云港', '徐州', '淮安', '宿迁'],
    '湖北': ['武汉', '黄石', '十堰', '荆州', '宜昌', '襄樊', '鄂州', '荆门', '孝感', '黄冈', '咸宁', '随州', '恩施土家族苗族自治州', '仙桃', '天门', '潜江', '神农架林区'],
    '四川': ['成都', '自贡', '攀枝花', '泸州', '德阳', '绵阳', '广元', '遂宁', '内江', '乐山', '南充', '眉山', '宜宾', '广安', '达州', '雅安', '巴中', '资阳', '阿坝藏族羌族自治州', '甘孜藏族自治州', '凉山彝族自治州'],
    '陕西': ['西安', '铜川', '宝鸡', '咸阳', '渭南', '延安', '汉中', '榆林', '安康', '商洛'],
    '河北': ['石家庄', '唐山', '秦皇岛', '邯郸', '邢台', '保定', '张家口', '承德', '沧州', '廊坊', '衡水'],
    '山西': ['太原', '大同', '阳泉', '长治', '晋城', '朔州', '晋中', '运城', '忻州', '临汾', '吕梁'],
    '河南': ['郑州', '开封', '洛阳', '平顶山', '安阳', '鹤壁', '新乡', '焦作', '濮阳', '许昌', '漯河', '三门峡', '南阳', '商丘', '信阳', '周口', '驻马店'],
    '吉林': ['长春', '吉林', '四平', '辽源', '通化', '白山', '松原', '白城', '延边朝鲜族自治州'],
    '黑龙江': ['哈尔滨', '齐齐哈尔', '鹤岗', '双鸭山', '鸡西', '大庆', '伊春', '牡丹江', '佳木斯', '七台河', '黑河', '绥化', '大兴安岭地区'],
    '内蒙古': ['呼和浩特', '包头', '乌海', '赤峰', '通辽', '鄂尔多斯', '呼伦贝尔', '巴彦淖尔', '乌兰察布', '锡林郭勒盟', '兴安盟', '阿拉善盟'],
    '山东': ['济南', '青岛', '淄博', '枣庄', '东营', '烟台', '潍坊', '济宁', '泰安', '威海', '日照', '莱芜', '临沂', '德州', '聊城', '滨州', '菏泽'],
    '安徽': ['合肥', '芜湖', '蚌埠', '淮南', '马鞍山', '淮北', '铜陵', '安庆', '黄山', '滁州', '阜阳', '宿州', '巢湖', '六安', '亳州', '池州', '宣城'],
    '浙江': ['杭州', '宁波', '温州', '嘉兴', '湖州', '绍兴', '金华', '衢州', '舟山', '台州', '丽水'],
    '福建': ['福州', '厦门', '莆田', '三明', '泉州', '漳州', '南平', '龙岩', '宁德'],
    '湖南': ['长沙', '株洲', '湘潭', '衡阳', '邵阳', '岳阳', '常德', '张家界', '益阳', '郴州', '永州', '怀化', '娄底', '湘西土家族苗族自治州'],
    '广西': ['南宁', '柳州', '桂林', '梧州', '北海', '防城港', '钦州', '贵港', '玉林', '百色', '贺州', '河池', '来宾', '崇左'],
    '江西': ['南昌', '景德镇', '萍乡', '九江', '新余', '鹰潭', '赣州', '吉安', '宜春', '抚州', '上饶'],
    '贵州': ['贵阳', '六盘水', '遵义', '安顺', '铜仁地区', '毕节地区', '黔西南布依族苗族自治州', '黔东南苗族侗族自治州', '黔南布依族苗族自治州'],
    '云南': ['昆明', '曲靖', '玉溪', '保山', '昭通', '丽江', '普洱', '临沧', '德宏傣族景颇族自治州', '怒江傈僳族自治州', '迪庆藏族自治州', '大理白族自治州', '楚雄彝族自治州', '红河哈尼族彝族自治州', '文山壮族苗族自治州', '西双版纳傣族自治州'],
    '西藏': ['拉萨', '那曲地区', '昌都地区', '林芝地区', '山南地区', '日喀则地区', '阿里地区'],
    '海南': ['海口', '三亚', '五指山', '琼海', '儋州', '文昌', '万宁', '东方', '澄迈县', '定安县', '屯昌县', '临高县', '白沙黎族自治县', '昌江黎族自治县', '乐东黎族自治县', '陵水黎族自治县', '保亭黎族苗族自治县', '琼中黎族苗族自治县'],
    '甘肃': ['兰州', '嘉峪关', '金昌', '白银', '天水', '武威', '酒泉', '张掖', '庆阳', '平凉', '定西', '陇南', '临夏回族自治州', '甘南藏族自治州'],
    '宁夏': ['银川', '石嘴山', '吴忠', '固原', '中卫'],
    '青海': ['西宁', '海东地区', '海北藏族自治州', '海南藏族自治州', '黄南藏族自治州', '果洛藏族自治州', '玉树藏族自治州', '海西蒙古族藏族自治州'],
    '新疆': ['乌鲁木齐', '克拉玛依', '吐鲁番地区', '哈密地区', '和田地区', '阿克苏地区', '喀什地区', '克孜勒苏柯尔克孜自治州', '巴音郭楞蒙古自治州', '昌吉回族自治州', '博尔塔拉蒙古自治州', '石河子', '阿拉尔', '图木舒克', '五家渠', '伊犁哈萨克自治州'],
    '香港': ['香港'],
    '澳门': ['澳门'],
    '台湾': ['台北市', '高雄市', '台北县', '桃园县', '新竹县', '苗栗县', '台中县', '彰化县', '南投县', '云林县', '嘉义县', '台南县', '高雄县', '屏东县', '宜兰县', '花莲县', '台东县', '澎湖县', '基隆市', '新竹市', '台中市', '嘉义市', '台南市']
   };
	export default {
		data() {
			return {
				isImage: false,
				isAdd: true,
				userData: {},
				imageFile:'',
				idCardNum:'',
				value1: '',
				value2:'',
				state:'warning',
				isUpdateT:'填写资料',
				curWorkId:'',
				cityvalue:'无选中',
                cityModel: '无选中',   
				citypopupVisible: false,
				 addressSlots: [{
        flex: 1,
        values: Object.keys(i),
        className: 'slot1',
        textAlign: 'center'
      }, {
        divider: !0,
        content: '-',
        className: 'slot2'
      }, {
        flex: 1,
        values: ['北京'],
        className: 'slot3',
        textAlign: 'center'
      }],
        addressProvince: '北京',
        addressCity: '北京'
			}
		},
		created() {
			this.$store.state.headings = this.$router.history.current.name; //修改标题
			this.$store.state.isFooterShow = false; //显示底部导航
			this.options1 = ['女', '男'];
		},
		components: {
			vHeader,
			Cell
		},
		mounted: function() { //加载完成后执行
               var $this=this;
//				  util.Ajax('/api/user/1',{},function(data){
//				    let curData1 = data.data;
//				    console.log("当前性别:"+curData1.gender);
//				      if (curData1.gender=="female") {
//				        $this.userData.gender="女"
//                    }else{
//					    $this.userData.gender="男"
//				    }
//			     });
			     
			     util.Ajax('/api/work/isBasicInfoWork/'+this.$store.state.userId,{},function(data){
                      let curData = data.data;
                      console.log("当前护工信息是否完善？"+curData.basicInfo_desc);
                   if(curData.basicInfo_desc=='护工信息已完善'){
                   	console.log("当前护工的ID"+curData.work_Id);
                   	  $this.curWorkId = curData.work_Id;
                   	util.Ajax('/api/work/'+$this.curWorkId,{},function(data){
                   		 $this.userData=data.data;  	
                   		 console.log(data);
                   		 $this.userData.curCity= $this.userData.prov+"/"+$this.userData.city;
                   		 if ($this.userData.gender=="female") {
                   		 	 $this.userData.gender="女";
                   		 }else{
                   		 	 $this.userData.gender="男";
                   		 };
                   		 
                   		 if($this.userData.level==3) {
                   		 	$this.userData.level="高级";
                   		 }else if($this.userData.level==2){
                   		 	$this.userData.level=="中级";
                   		 }else{
                   		    $this.userData.level=="初级";
                   		 }
                   		 console.log($this.userData.name);
                   		 $this.isUpdateT='更新资料';
                     });
                   }else{
                    	 $this.isUpdateT='填写资料';
                    }
			     });
			     
		},
		methods: {
			compileClick: function() { //编辑
				this.isAdd = false;
			},
			suerResult: function () {
              this.citypopupVisible = false
              this.cityvalue = this.cityModel
            },
            hidePopup: function (citypopupVisible) {
              this[citypopupVisible] = false
            },
            handleClick: function (citypopupVisible) {
               this[citypopupVisible] = true
            },
            onAddressChange: function (picker, value) {
               picker.setSlotValues(1, i[value[0]])
               this.addressProvince = value[0]
               this.addressCity = value[1]
               this.cityModel = this.addressProvince + this.addressCity
            },
			saveClick:function(){ //保存
	        	 
	        	 let $this=this;
	        	 let name = $this.userData.name;
	        	 $this.userData.gender = $this.value1;
	        	 let gender='';
	        	 if ($this.value1=='男') {
	        	 	gender ='male';
	        	 } else{
	        	 	gender = 'female';
	        	 }
	        	 $this.userData.level = $this.value2;
	        	 let level ='';
	        	 if ($this.value2=='高级') {
	        	 	level =3;
	        	 }else if($this.value2=='中级'){
	        	 	level =2;
	        	 }else{
	        	 	level =1;
	        	 }
	        	 let exp =$this.userData.exp;
	        	 let phoneNum=$this.userData.phoneNum; 
	        	 let openId=$this.userData.openId;
	        	 $this.userData.curCity = $this.addressProvince +"/"+$this.addressCity;
	        	 let prov =  $this.addressProvince;
	        	 let city =  $this.addressCity;
	        	 let idCardNum =  $this.userData.idCardNum;
	        	 let description =  $this.userData.description;
	        	 let birthday = $this.userData.birthday;
	        	 let userId = this.$store.state.userId;
	        	 let workId = $this.curWorkId;
	        	 
	        	 if(util.isEmpty(name)) {
	        	 	Toast('请输入您的姓名');
	        	 	console.log("name"+name)
             	    return;
	        	 }else if(!util.isEmpty(name)){
	        	 	 var reg=/^[\u4e00-\u9fa5]{2,4}$/;
                     if(!reg.test(name)){
                        Toast("请正确填写姓名！姓名为两到四个汉字。");
                        return;
                     }
	        	 }
	        	 if(util.isEmpty(phoneNum)){
	        	 	Toast('请输入您的电话号码');
	        	 	console.log("phoneNum"+phoneNum)
	        	 	return
	        	 }else if(!util.isEmpty(phoneNum)){
	        	 	  var reg=/^1[0-9]{10}/;
	        	 	  if(!reg.test(phoneNum)){
                         Toast("请正确填写手机号！"+phoneNum);
                         return
                     }
	        	 }
	        	 if(util.isEmpty(gender)) {
	        	 	Toast('请输入您的性别');
	        	 	console.log("gender"+gender)
	        	 	return
	        	 }
	        	 
	        	 if(util.isEmpty(birthday)){
	        	 	Toast('请输入您的出生年月');
	        	 	return
	        	 }
                 if(util.isEmpty(idCardNum)){
	        	 	Toast('请输入您的身份证号');
	        	 	return
	        	 }else if(!util.isEmpty(idCardNum)){
	        	 	var pattern = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
	        	 	if (pattern.test(idCardNum)==false) {
	        	 		Toast('身份证号输入错误');
	        	 		return
	        	 	}
	        	 }       	 
                 if(util.isEmpty(level)){
	        	 	Toast('请输入您想服务的等级');
	        	 	return
	        	 }
                 if(util.isEmpty(exp)){
	        	 	Toast('请输入您工作了多少年');
	        	 	return
	        	 }else if(!util.isEmpty(exp)){
	        	 	var reg=/^[1-30]/;
	        	 	  if(!reg.test(exp)){
                         Toast("请正确填写工作年份！");
                         return
                     }
	        	 }
                 if(util.isEmpty(description)){
	        	 	Toast('请输入您的个人简介');
	        	 	return
	        	 }

	        	 //param.append('workAvatar',$this.imageFile);//通过append向form对象添加数据
	        	 //其他参数
	        	 //param.append(name,gender,level,exp,phoneNum,prov,city,idCardNum,description,birthday);//添加form表单中其他数据
	        	 let formData = new FormData();
	        	 formData.append("workAvatar",$this.imageFile);
	        	  formData.append("name",name);
	        	  formData.append("gender",gender);
	        	  if ($this.isUpdateT=='更新资料') {
	        	   	 formData.append("workId",workId);
	        	   	 console.log("更新用户资料:"+workId);
	        	  }else{
	        	  	 formData.append("userId",userId);
	        	  }       	 
	        	  formData.append("level",level);
	        	  formData.append("exp",exp);
	        	  formData.append("phoneNum",phoneNum);
	        	  formData.append("prov",prov);
	        	  formData.append("city",city);
	        	  formData.append("idCardNum",idCardNum);
	        	  formData.append("description",description);
	        	  formData.append("birthday",birthday);
	        	 let config = {
                            heaers:{'enctype':'multipart/form-data'}
                 };  //添加请求头
                  //"workAvatar":$this.imageFile,"name":name,"gender":gender,"level":level,"exp":exp,"phoneNum":phoneNum,"prov":prov,"city":city,"idCardNum":idCardNum,"description":description
//                 util.ajax('/api/work/addWork/'+36+'?_method=PATCH',{"workAvatar":$this.imageFile,"name":name,"gender":gender,"level":level},);
//                console.log("param:"+param);
//	             util.Ajax('/api/work/addWork/'+'?_method=POST',formData,config,function(data){
//			     	$this.userData=data.data;
//			       })
                  if ($this.isUpdateT=='填写资料') {
                  	  axios.post('/api/work/addWork/',formData,config)  
                      .then(response=>{  
                           console.log(response.data);  
                          if (response.status == 200) {
			                 Toast("资料填写成功");
			                 this.isAdd=true;
			              }else{
			                 Toast("服务器打盹了,再试一次叫醒它！");
			              }
				       }).catch(function (error) {
				          console.log(error);
                      });      
                  }else if($this.isUpdateT=='更新资料'){
                  	   axios.post('api/work/updateWork/',formData,config)  
                       .then(response=>{  
                           console.log(response.data);  
                          if (response.status == 200) {
			                 Toast("资料更新成功");
			                 this.isAdd=true;
			              }else{
			                 Toast("服务器打盹了,再试一次叫醒它！");
			              }
				        }).catch(function (error) {
				          console.log(error);
                       });      
                  }
//	        	  util.Ajax('/api/user/'+this.$store.state.userId+'?_method=PATCH',{"phoneNum":phoneNum,"openId":openId},function(data){
//			     	$this.userData=data.data;
//			       })
        	},
			onFileChange(e) { //头像处理 在提交的方法里，通过 this.isImage 即可
				this.isAdd = false;
				var files = e.target.files || e.dataTransfer.files;
				if(!files.length)
					return;
				this.createImage(files[0]);
				
				//上传图片【
				//console.log("可以过了?????????")
	             //$this.state = 'error';
                  let file = e.target.files[0];           
                  this.imageFile = file;
                  console.log(this.imageFile);
			},
			createImage(file) {
				var isImage = new Image();
				var reader = new FileReader();
				var vm = this;
				reader.onload = (e) => {
					vm.isImage = e.target.result;
				};
				reader.readAsDataURL(file);
			},
//			onAddressChange(picker, values) {
//		        picker.setSlotValues(1, address[values[0]]);
//		        this.addressProvince = values[0];
//		        this.addressCity = values[1];
//		      }
		}
	}
</script>
<style>
	.seniorInfo {
		margin-top: 4rem;
		padding: 0 1rem 4rem 1rem;
	}

	.mint-cell-value {
		max-width: 70%;
		padding: 12px 0;
	}
	
	#input-city>.mint-cell-wrapper>.mint-cell-value>input{
		display: none;
	}

	#input-sex>.mint-cell-wrapper>.mint-cell-value>input{
		display: none;
	}

	#input-level>.mint-cell-wrapper>.mint-cell-value>input{
		display: none;
	}

	.popup_content .mint-cell-wrapper{
		height: 60px;
	}

	.popup_content .mint-popup{
		width: 100%;
	}

	.popup_content .city-operation-btn{
		float: left;
		width: 33%;
		text-align: center;
		font-size: 1.6rem;
		padding: 10px 0 12px 0;
		color: #94ca52;
	}
	
	.words-black{
		color: #323232 !important; 
	}

	.popup_content .picker{
		clear: both;
	}

	#input-city1{
		position: absolute;
		z-index: 9;
		margin-top: 8px;
	}

	#choose-city{
		width: 50%;
		float: right;
		margin-top: -42px;
		margin-right: 10px;
	}

	.compile {
		position: fixed;
		top: 1.2rem;
		right: 1.2rem;
		z-index: 1000;
		color: #fff;
		font-size: 1.2rem;
	}
	
	.head-portrait {
		position: relative;
		width: 100%;
		display: flex;
		box-sizing: border-box;
		padding: 3rem 1rem;
		background: #fff;
		font-size: 16px;
	}
	
	.portrait {
		width: 60px;
		height: 60px;
		border-radius: 50%;
		overflow: hidden;
		float: right;
		position: absolute;
		top: 1rem;
		right: 1rem;
	}
	
	.seniorInfo .mint-field-core {
		text-align: right;
		color: #ccc;
		border: 1px solid #eee;
		padding: 0.3rem;
	}
	
	.infoButton {
		/*position: fixed;
		left: 50%;
		bottom: 8%;*/
		background: #94ca52;
		color: #fff;
		width: 10rem;
		border: 0;
		/*margin-left: -5rem;*/
		font-size: 1.3rem;
		margin: 40px auto;
		display:block ;
	}
	
	.form-control {
		position: absolute;
		top: 2rem;
		right: 0;
		width: 80px;
		opacity: 0;
	}
	
	.mint-cell-wrapper{
		border-bottom: 1px solid #f5f5f5;
	}
	
	#input-city{
		margin-top: 40px;
	}

	#input-city>.mint-cell-wrapper>.mint-cell-value>input{
		display: none;
	}

	#choose-city{
		width: 50%;
		float: right;
		margin-top: -76px;
		margin-right: 10px;
	}

	#input-city>.mint-cell-wrapper{
		border-bottom: none;
	}
	
	 @component-namespace page {
	    @component toast {
	      @descendent wrapper {
	        padding: 0 20px;
	        position: absolute 50% * * *;
	        width: 100%;
	        transform: translateY(-50%);
	        button:not(:last-child) {
	          margin-bottom: 20px;
	        }
	      }
	    }
	  }

	.page-part{
		width: 60%;
		float: right;
		margin-top: -56px;
	}

	.page-part>.mint-cell{
		width: 50%;
		float: left;
	}

	#radio-level>.mint-cell{
		width: 33%;
	}
	
	#radio-level{
		width: 72%;
	}

	#radio-level .mint-radiolist-label{
		padding: 0;
	}

	#radio-level .mint-radio-core{

	}

	#radio-level .mint-radio-label{
		float: right;
		margin: 2px 16px 0 0;
	}

	@media screen and (max-width: 384px){
		#radio-level .mint-radio-label{
			margin: 2px 6px 0 0;
		}
	}

	@media screen and (max-width: 360px){
		#radio-level .mint-radio-label{
			margin: 2px 2px 0 0;
		}
	}

	@media screen and (max-width: 320px){
		#radio-level .mint-radio-label{
			margin: 3px -8px 0 0;
		}
	}

</style>