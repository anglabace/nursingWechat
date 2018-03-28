<template>
	<div class="o-details">

		<v-header></v-header>
		<div class="list" v-for="item in items">
			<div class="title">订单编码：{{item.tradeNum}}</div>
			<h3>服务地址</h3>
			<!--<p>{{item.hospital.city}}—{{item.hospital.region}}{{item.hospital.name}}</p>-->
			<p>{{item.hospital.name}}</p>
			<h3>服务时间</h3>
			<p>{{item.startDate}}—{{item.endDate}}|| 共计：{{item.estimatedTime}}天</p>
			<h3>服务星级</h3>
			<p><i class="iconfont" v-for="(i,index) in 5" :class="{'on':item.work.star-1>=index}">&#xe62f;</i></p>
			<h3>付款状态</h3>
			<p>
				<template v-if='item.status=="progressing"'>已付款</template>
				<template v-else>未付款</template>
			</p>
			<h3>客户信息</h3>
			<p>姓名：{{item.customer.name}}</p>
			<p>电话：{{item.customer.phoneNum}}</p>
			<p>性别：
				<template v-if='item.patientGender=="male"'>男</template>
				<template v-else>女</template>
			</p>

			<div class="fr">
				<!--<mt-button type="danger" class="mt-button get" v-on:click="starOrder">开始服务</mt-button>-->
				<!--<mt-button type="default" class="mt-button" v-if="isCancel" v-on:click="cancellationOfOrder">取消订单</mt-button>-->
				<mt-button class="mt-button get" v-on:click="orderClick">{{btnText}}</mt-button>
				<!--<template v-else>
					<mt-button class="mt-button get"  type="danger"  v-if='item.status=="0"' plain >正常进行</mt-button>
				</template>-->
			</div>
		</div>
		<!--<mt-button type="danger" class="mt-button mt10" v-if="isSatrt">待开始</mt-button>-->

		<!--<mt-button type="primary" class="mt-button mt10 bg-red" v-on:click="open('picker1')" v-if="isExchange">延长服务</mt-button>
		<mt-button type="primary" class="mt-button" v-if="isExchange" v-on:click='go("/customer/workersList")'>申请换护工</mt-button>
		<mt-button type="default" class="mt-button" v-if="isTermination" v-on:click="OrderToTerminate">订单终止</mt-button>
		<div class="cancellation-button" v-if="isTocomplete">服务-已完成</div>
		<div class="cancellation-button" v-if="isCancellation">取消-已完成</div>-->

		<mt-datetime-picker type="datetime" ref="picker1" v-model="value" year-format="{value}" month-format="{value}月" date-format="{value}日" hourFormat="{value}时" minuteFormat="{value}分" @confirm="StartTiemChange"></mt-datetime-picker>
	</div>
</template>
<style type="text/css" scoped="scoped">
	.o-details {
		margin-top: 4rem;
		position: relative;
	}
	
	.o-details .list {
		width: 100%;
	}
	
	.o-details .list h3 {
		font-size: 1.4rem;
		color: #94ca52;
		padding: 0 1.2rem;
		margin-top: 12px;
	}
	
	.o-details .list p {
		font-size: 1.2rem;
		padding: 0.15rem 1.2rem;
	}
	
	.o-details .list .on {
		color: #94ca52;
	}
	
	.o-details .list .iconfont {
		padding-right: 1rem;
	}
	
	.o-details .title {
		background: #94ca52;
		color: #fff;
		font-size: 1.4rem;
		padding: 0.5rem 1.2rem;
	}
	
	.o-details .mt-button {
		margin: 0 auto 1rem;
		display: block;
		width: 8rem;
		font-size: 1.2rem;
	}
	
	.o-details .personal-info {
		display: flex;
	}
	
	.o-details .personal-head {
		padding: 0 1rem 0 0.5rem;
	}
	
	.o-details .head-info {
		width: 80px;
		height: 80px;
		background: #eee;
		border-radius: 5px;
	}
	
	.o-details .detalis-price {
		font-size: 1.2rem;
		padding: 0.5rem;
	}
	
	.o-details .detalis-price .red {
		font-size: 1.4rem;
	}
	
	.o-details .tiem {
		font-size: 1.4rem;
		text-align: center;
		padding: 1rem 0;
	}
	
	.o-details .btn-cancellation {
		border: 1px solid #E02828;
		margin-top: 2rem;
		width: 10rem;
		background: #fff;
		color: #E02828;
	}
	
	.o-details .cancellation-button {
		border: 1px solid #F32043;
		background: #fff;
		font-size: 1.2rem;
		display: block;
		padding: 1rem 0.5rem;
		color: #F32043;
		text-align: center;
		margin: 2rem auto;
		border-radius: 5px;
		width: 10rem;
	}
	
	.o-details .mt10 {
		margin-top: 2rem;
	}
	
	.o-details .bg-red {
		background: #FF0000;
	}
	
	.o-details .mt-button {
		width: 90px;
		height: 32px;
		float: left;
		margin: 1rem 1.2rem 0 0;
	}
	
	.get {
		background-color: #94ca52;
	}
</style>
<script>
	import vHeader from './../common/Header.vue';
	import router from './../../router';
	import util from './../../js/util/util.js';
	import { Cell, Toast, MessageBox } from 'mint-ui';
	export default {
		data() {
			return {
				value: '',
				Type: '',
				isStart: false,
				isEnd: false,
				isCancel: false,
				isShow: false,
				isExchange: false,
				isTermination: false,
				isCancellation: false,
				isTocomplete: false,
				patientGender: "",
				isStatus: "未付款",
				btnText: "开始服务",
				items: [],
			}
		},
		created() {
			this.$store.state.isFooterShow = false; //显示底部导航
			this.$store.state.headings = this.$router.history.current.name; //修改标题
			document.title = "我的订单";

		},
		components: {
			vHeader,
			Cell,
			MessageBox
		},
		methods: {
			open(picker) {
				console.log(picker)
				this.$refs[picker].open();
			},
			StartTiemChange(value) {
				console.log(value)
				var DateInfo = new Date(value);
				let Tiem = DateInfo.getFullYear() + '-' + (DateInfo.getMonth() + 1) + '-' + DateInfo.getDate() + ' ' + DateInfo.getHours() + ':' + DateInfo.getMinutes() + ':' + DateInfo.getSeconds();
				this.StartTiem = Tiem;
			},
			orderClick: function() {
				if(this.btnText == "开始服务") {
					if(this.isStart == false) {
						if(this.$route.query.status == true) {
							Toast("服务时间未到");
						} else {
							Toast("等待用户付款");
						}
						return;
					}
					MessageBox.confirm('确定开始服务?', '提示').then(
						action => {
							let orderId = this.$route.query.orderId;
							console.log("开始的订单为：" + orderId);
							util.Ajax('api/order/startOrder/' + orderId + '?_method=GET', {
								"userId": this.$store.state.userId,
							}, function(data) {
								console.log(data.data)
								if(data.data.status == "progressing") {
									Toast("服务已开始");
								} else {
									Toast("服务未开始");
								}
							})
						},
						action => {
							//						Toast("已取消")
						}
					);
				};
				if(this.btnText == "结束服务") {
					if(this.isEnd == false) {
						Toast("服务时间未到,不能结束");
						return;
					}
					MessageBox.confirm('确定结束服务?', '提示').then(
						action => {
							let orderId = this.$route.query.orderId;
							console.log("开始的订单为：" + orderId);
							util.Ajax('api/order/endOrder/' + orderId + '?_method=GET', {
								"userId": this.$store.state.userId,
							}, function(data) {
								console.log(data.data)
								if(data.data.status == "completed") {				
									//location.reload();
									let url= "/worker/order";
									util.pushRouter(router, url)
									Toast("服务已结束");
								} else {
									//								Toast("服务未开始");
								}
							})
						},
						action => {
							//						Toast("已取消")
						}
					);
				}
			},
			cancellationOfOrder: function() { //取消订单
				var $this = this;
				let orderId = this.$route.query.orderId;
				util.Ajax('/api/order/orderEnd?_method=PUT', {
					"orderId": orderId,
					"userId": this.$store.state.userId
				}, function(data) {
					if(data.data.status == "0") {
						$this.isCancellation = true;
						$this.isShow = false;
						$this.isSatrt = false;
						$this.isCancel = false;
					}
				})
			},
			OrderToTerminate: function() { //订单终止
				this.isCancellation = true;
				this.isExchange = false;
				this.isTermination = false;
			},
			go: function(url) {
				util.pushRouter(router, url);
			},
			getOrder: function() { //获取订单
				let $this = this;
				let orderId = this.$route.query.orderId;
				let canStar = this.$route.query.canStart;
				console.log("订单id" + orderId);
				console.log("是否开始" + canStar);
				util.Ajax('/api/order?_method=GET', {
					"orderId": orderId
				}, function(data) {
					console.log(data);
					$this.items = data.data;
					console.log("性别" + $this.items[0].patientGender);
				})
			}
		},
		mounted: function() { //加载完成后执行
			this.getOrder();
			var $this = this;
			var Type = this.$route.query.status
			//			if(Type == "unpaid") { //未支付
			//				this.isShow = true;
			//				this.isCancel = true;
			//			} else if(Type == "paid") { //未开始
			//				this.isSatrt = true
			//				this.isCancel = true
			//			} else if(Type == "progressing") { //订行中
			//				this.isExchange = true;
			//				this.isTermination = true
			//			} else if(Type == "complaints-out") { //已完成
			//				this.isTocomplete = true
			//			} else if(Type == "refunded" || Type == "cancelled") { //已取消
			//				this.isCancellation = true;
			//			}
			this.isStart = this.$route.query.canStart;
			//			console.log("能否可以开始" + this.isStart);
			this.isEnd = this.$route.query.canEnd;
			console.log("能否可以结束" + this.isEnd);
			var Type = this.$route.query.status
			if(Type == "unpaid") {
				$this.isStatus == "未付款";
				console.log("付款1" + Type);
			} else {
				$this.isStatus == "已付款";
				console.log("1" + $this.isStatus);
				console.log("付款2" + Type);
			}
			if(this.isEnd == undefined) {
				this.btnText = "开始服务";
			} else {
				this.btnText = "结束服务";
			}
		}
	}
</script>