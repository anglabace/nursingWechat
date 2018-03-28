<template>
	<div class="o-details">

		<v-header></v-header>
		<div class="list" v-for="item in items">
			<div class="title">订单编码：{{item.tradeNum}}</div>
			<h3>服务内容</h3>
			<p>陪护</p>
			<h3>服务地址</h3>
			<p>{{item.hospital.name}}</p>
			<h3>服务时间</h3>
			<p>{{item.startDate}}—{{item.endDate}}<br/>共{{item.estimatedTime}}</p>
			<h3>服务星级</h3>
			<p><i class="iconfont" v-for="(i,index) in 5" :class="{'on':item.work.star-1>=index}">&#xe62f;</i></p>
			<h3>护工信息</h3>
			<div>
				<div class="personal-info">
					<div class="personal-head"><img :src="item.work.avatar" class="head-info"></div>
					<div>
						<h3>{{item.work.name}}</h3>
						<p>年龄:{{item.work.age}}岁 </p>
						<p>性别:{{item.work.gender_desc}}</p>
					</div>
				</div>
			</div>
			<div class="detalis-price">共{{item.duration}}：<span class="red">￥{{item.price}}</span>元</div>
		</div>

		<div class="red tiem" v-if="isShow"></div>
		<div class="appraise" v-if="showAppraise">
			<p>太度</p>
			<i class="iconfont" v-for="(item,index) in 5" :class="{'on':5>index}">&#xe62f;</i>
			<p>技能</p>
			<i class="iconfont" v-for="(item,index) in 5" :class="{'on':5>index}">&#xe62f;</i>
		</div>
		<mt-button type="danger" class="mt-button" v-if="isShow" v-on:click="palyClick" style="margin-top: 20px;">立即支付</mt-button>

		<mt-button type="danger" class="mt-button mt10" v-if="isSatrt">待开始</mt-button>
		<mt-button type="default" class="mt-button" v-if="isCancel" v-on:click="cancellationOfOrder">取消订单</mt-button>

		<mt-button type="primary" class="mt-button mt10 bg-red" v-on:click="open('picker1')" v-if="isExchange">延长服务</mt-button>
		<mt-button type="primary" class="mt-button" v-if="isExchange" v-on:click='go("/customer/workersList")'>申请换护工</mt-button>
		<mt-button type="default" class="mt-button" v-if="isTermination" v-on:click="OrderToTerminate">订单终止</mt-button>
		<mt-button type="default" class="mt-button" v-if="isAppraise" v-on:click="OrderAppraise">订单评价</mt-button>
		<div class="cancellation-button" v-if="isTocomplete">服务-已完成</div>
		<div class="cancellation-button" v-if="isCancellation">取消-已完成</div>
		<div class="cancellation-button" v-if="isPayation">支付-已完成</div>

		<mt-datetime-picker type="datetime" ref="picker1" v-model="value" year-format="{value}" month-format="{value}月" date-format="{value}日" hourFormat="{value}时" minuteFormat="{value}分" @confirm="StartTiemChange"></mt-datetime-picker>

		<modal v-if="showView">
			<h3 slot="header">订单评价</h3>
			<div slot="body">
				<h3>态度</h3>
				<p>
					<i class="iconfont" v-for="(item,index) in 5" v-on:click='starClikManner(index)' :class="{'on':isStarManner>=index}">&#xe62f;</i>
				</p>
				<h3>技能</h3>
				<p>
					<i class="iconfont" v-for="(item,index) in 5" v-on:click='starClikSkill(index)' :class="{'on':isStarSkill>=index}">&#xe62f;</i>
				</p>
				<mt-field  placeholder="请输入您的建议"></mt-field>
				<button class="button infoButton" v-on:click="quiteClick">保存</button>
			</div>
			<div slot="footer">
			</div>
		</modal>
	</div>
</template>
<style type="text/css" scoped="scoped">
	.o-details {
		margin-top: 4.5rem;
		position: relative;
	}
	
	.o-details .list {
		width: 99%;
		margin: 0 auto;
		box-sizing: border-box;
		border: 1px solid #eee;
		box-shadow: 0 0 10px 5px #eee;
		background-color: #fff;
	}
	
	.o-details .list h3 {
		font-size: 1.4rem;
		color: #00CC66;
		margin: 0.5rem;
	}
	
	.o-details .list p {
		padding: 0 0.5rem;
		font-size: 1.2rem;
	}
	
	.o-details .list .on {
		color: #00CC66;
	}
	
	.o-details .list .iconfont {
		padding-right: 1rem;
	}
	
	.o-details .title {
		background: #00CC66;
		color: #fff;
		text-align: center;
		font-size: 1.4rem;
		padding: 0.5rem 0;
	}
	
	.o-details .mt-button {
		margin: 10rem auto 1rem;
		display: block;
		width: 8rem;
		background: #00CC66;
		font-size: 1.2rem;
		color: #FFF;
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
		border: 1px solid #FF6633;
		background: #fff;
		font-size: 1.2rem;
		display: block;
		padding: 1rem 0.5rem;
		color: #FF6633;
		text-align: center;
		margin: 1rem auto;
		border-radius: 5px;
		width: 7rem;
	}
	
	.o-details .mt10 {
		margin-top: 2rem;
	}
	
	.o-details .bg-red {
		background: #FF0000;
	}
	
	.o-details .on{
		color: #94ca52
	}
</style>
<script>
	import vHeader from './../common/Header.vue';
	import router from './../../router';
	import util from './../../js/util/util.js';
	import { Cell, Toast, MessageBox } from 'mint-ui';
	import modal from './../common/modal';
	export default {
		data() {
			return {
				StartTiem: '',
				value: '',
				Type: '',
				isSatrt: false,
				isCancel: false,
				isShow: false,
				isExchange: false,
				isTermination: false,
				isCancellation: false,
				isPayation: false,
				isTocomplete: false,
				isAppraise: true,
				showAppraise: false,
				items: [],
				showView: false,
				isStarManner: 0,
				isStarSkill: 0,
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
			MessageBox,
			'modal': modal,
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
			palyClick: function() { //支付成功
				MessageBox.confirm('￥360确定支付成功?', '提示').then(
					action => {
						var $this = this;
						let orderId = this.$route.query.orderId;
						console.log("支付订单" + orderId + "支付用户ID" + this.$store.state.userId);

						util.Ajax('api/order/payOrder/' + orderId + '?_method=GET', {
							"userId": this.$store.state.userId
						}, function(data) {
							console.log(data.data);
							if(data.data.status == "paid") {
								Toast("支付成功")
								$this.isPayation = true;
								$this.isShow = false;
								$this.isSatrt = false;
								$this.isCancel = false;
							};
						})
					},
					action => {
						Toast("取消支付")
					}
				);
			},
			cancellationOfOrder: function() { //取消订单
				var $this = this;
				let orderId = this.$route.query.orderId;
				console.log("您要取消的订单为" + orderId);
				util.Ajax('/api/order/cancelOrder/' + orderId + '?_method=GET', {
					"userId": this.$store.state.userId
				}, function(data) {
					console.log(data.data);
					if(data.data.status == "cancelled") {
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

			OrderAppraise: function() {
				console.log("订单评价");
				this.showView = true;
			},
			go: function(url) {
				util.pushRouter(router, url);
			},
			getOrder: function() { //获取订单
				let $this = this;
				let orderId = this.$route.query.orderId;
				util.Ajax('/api/order?_method=GET', {
					"orderId": orderId
				}, function(data) {
					$this.items = data.data;
					console.log(data);
					if($this.items[0].ratingStatus == 1) {
						$this.showAppraise = true;
						$this.isAppraise = false;
					} else {
						$this.showAppraise = false;
						$this.isAppraise = true;
					}

				})
			},
			starClikManner: function(index) {
				this.isStarManner = index ;
				console.log("态度评星" + this.isStarManner);
			},
			starClikSkill: function(index) {
				this.isStarSkill = index;
				console.log("技能评星" + this.isStarSkill);
			},
			quiteClick: function() {
				this.showAppraise = true;
				this.isAppraise = false;
				this.showView = false;
			}
		},
		mounted: function() { //加载完成后执行
			this.getOrder();
			var Type = this.$route.query.status
			if(Type == "unpaid") { //未支付
				this.isShow = true;
				this.isCancel = true;
			} else if(Type == "paid") { //未开始
				this.isSatrt = true
				this.isCancel = false
				this.isPayation = true
			} else if(Type == "progressing") { //订行中
				this.isExchange = true;
				this.isCancel = false;
				this.isTermination = true
			} else if(Type == "completed") { //已完成
				this.isTocomplete = true
				console.log("服务已完成")
			} else if(Type == "refunded" || Type == "cancelled") { //已取消
				this.isCancellation = true;
			}

		}
	}
</script>