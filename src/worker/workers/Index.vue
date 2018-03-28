<template>
	<div class="Workers">
		<mt-swipe :auto="4000" class="swipe-box">
			<mt-swipe-item><img src="../../../static/img/updata/slide/u21.jpg"></mt-swipe-item>
			<mt-swipe-item><img src="../../../static/img/updata/slide/u23.jpg"></mt-swipe-item>
			<mt-swipe-item><img src="../../../static/img/updata/slide/u21.jpg"></mt-swipe-item>
		</mt-swipe>
		<div class="bnt-box">
			<button class="button" v-on:click='go("/supervisor")'><img src="../../assets/dudao.png" alt="">督导管理</button>
			<button class="button" v-on:click='go("/worker/totals")'><img src="../../assets/sezhi.png" alt="">接单设置</button>
		</div>
		<div class="title"><i class="iconfont">&#xe647;</i>{{OrderTitle}}</div>
		<div class="workers-list-box" v-if="isOrder">
			<ul>
				<li v-for="item in items" >
					<!-- // v-on:click='go("/worker/workersDetails")'-->
					<div class="workers-list">
						<div> 
						<h3>{{item.hospital}}</h3>
						<p>服务时间：{{item.startDate}}—{{item.endDate}}|| 共计：{{item.duration }}天</p>
						<p>星级：{{item.starLevel}}星 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;性别：{{item.patientGender}}<span class="fr">付款状态：<font class="orange">{{item.status}}</font></span> </p>
						</div>
						<div class="bnt-con">
							<button class="bnt" v-if="!isReceive" v-on:click="FromAsingle(item.orderWorkId)"><img src="../../assets/no1.png" alt="">拒单</button>
							<button class="bnt bnt-guide" v-if="!isReceive" v-on:click="orderReceiving(item.orderWorkId)"><img src="../../assets/yes.png" alt="">接单</button>
							<button class="bnt  bnt-state" v-if="isReceive">{{Hint}}</button>
						</div>
					</div>
				</li>
			</ul>
		</div>

		<!--老款接单设置-->
		<!-- <div v-if="isStart" class="work-start" v-on:click="startClick"><span>开始<br>接单</span></div>
	   <div v-if="isFinish" class="work-start finish"><span>接单<br>结束</span></div> -->
	</div>
</template>

<script type="text/javascript">
	import router from './../../router';
	import util from './../../js/util/util.js';
	
	import { Swipe, SwipeItem, DatetimePicker,Toast } from 'mint-ui';
	export default {
		data() {
			return {
				isReceive: false,
				isStart: true,
				isFinish: false,
				Hint: '已接受',
				OrderTitle:'订单通知：完成认证后，才可以接受订单',
				isOrder:false,
				items: [{
						"id": "1",
						"hospital": "",
						"startDate": "",
						"endDate": "",
						"starLevel": "0",
						"patientGender": "",
						"status": "",
						"duration": "",
						"orderWorkId":"",
					}
					//				, {
					//					"hospital": "bbb",
					//					"id": "2"
					//				}, {
					//					"hospital": "ccc",
					//					"id": "3"
					//				}
				]
			}
		},
		components: {
			Swipe,
			SwipeItem
		},
		created() {
			this.$store.state.isFooterShow = true; //显示底部导航
			this.$store.state.flag = 0;
			document.title = "护工端"
		},
		methods: {
			go: function(url) {
				util.pushRouter(router, url, {})
			},
			orderReceiving: function(orderWork_id) { //接单
				//console.log("orderReceiving:" + id);
				//				this.isReceive = true;
				//				this.Hint = "已接受"
				//				this.isStart = false;
				//				this.isFinish = true
				let $this = this;
				let orderWorkId = orderWork_id;
			    console.log("接受的订单为"+orderWorkId+"护工ID为:"+this.$store.state.workId)
				util.Ajax('/api/orderwork/' + orderWorkId + '/accept/' + '?_method=PUT', {
					'workId': this.$store.state.workId
				}, function(data) {
					console.log(data.data);
					if(data.data.status == "accept") {
						console.log("该订单已接受");
						location.reload();
					}
				})
			},
			FromAsingle: function(orderWork_id) { //拒单
				let $this = this;
				let orderWorkId = orderWork_id;
				let workId = this.$store.state.workId;
				util.Ajax('/api/orderwork/' + orderWorkId + '/reject/' + '?_method=PUT', {
					'workId': workId
				}, function(data) {
					console.log(data.data);
					if(data.data.status == "reject") {
						console.log("该订单已拒绝");
						location.reload();
					}
				})
			},
			startClick: function() {
				this.isStart = false;
				this.isFinish = true;
			}
		},
		mounted: function() {
			let $this = this;
			let workId =  this.$store.state.workId;
			let curItem = $this.items[0];
			//			util.Ajax('/api/orderwork/86', {}, function(data) {
			//				console.log(data)
			//				$this.userData = data.data;
			//			})
			util.Ajax('/api/orderwork/?_method=GET', {
				'workId': workId
			}, function(data) {
				
				//				console.log(curData.hospital.name);
				//				console.log(curData.startDate);
				//				console.log(curData.endDate);
				//				console.log(curData.work.star);
				//				console.log(curData.patientGender); 
				//				curItem.hospital = curData.hospital.name;
				//				//curData.startDate;
				if(util.isEmpty(data.data[0])) {
					Toast('您当前还没有订单');
					//console.log("dasasdsda"+curData);
					$this.isOrder = false;
					return
				}
				console.log(data);
			    $this.isOrder = true;
				let curData = data.data[0].order
				curItem.starLevel = curData.work.star;
				let curS = curData.startDate
				let curD = curData.endDate;
				curItem.startDate = curS.substring(0, 10);
				curItem.endDate = curD.substring(0, 10);
				curItem.duration = curData.estimatedTime;
				console.log("我要的OrderWork"+ curData.orderWork_id);
				curItem.orderWorkId = data.data[0].orderWork_id;
				if(curData.patientGender == 'male') {
					curItem.patientGender = "男";
				} else {
					curItem.patientGender = "女";
				}
				if(curData.status == 'paid') {
					curItem.status = "已付款";
				} else {
					curItem.status = "未付款";
				}
			})
		},
	}
</script>
<style type="text/css" scoped>
	.Workers {
		background: #fff;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
	}
	
	.Workers>.swipe-box{
		height: 240px;
	}

	.workers-list-box {
		padding-bottom: 80px;
	}
	
	.Workers .workers-list {
		width: 88%;
		margin: 12px auto;
		padding: 1rem;
		border-radius: 8px;
		box-shadow: 0 0 12px rgba(0, 0, 0, 0.2);
	}
	
	.Workers .workers-list h3 {
		font-size: 1.3rem;
		color: #323232;
		margin-bottom: 1rem;
	}
	
	.Workers .workers-list p {
		margin-bottom: 0.8rem;
	}
	
	.Workers .workers-list .bnt-con {
		text-align: center;
		padding: 0.5rem 0;
	}
	
	.Workers .title {
		position: relative;
		height: 2.5rem;
		line-height: 2.5rem;
		color: #fff;
		background: #94ca52;
		margin-bottom: 0;
		padding-left: 3.5rem;
	}
	
	.Workers .iconfont {
		font-size: 2rem;
		position: absolute;
		top: 0;
		left: 0.5rem
	}
	
	.Workers .workers-list .bnt-con {
		text-align: right;
	}
	
	.Workers .workers-list .bnt {
		border: 1px solid #94ca52;
		border-radius: 4px;
		width: 10rem;
		height: 3rem;
		background-color: transparent;
		font-size: 1.6rem;
		color: #94ca52;
		display: inline-block;
		margin-left: 10px;
		line-height: 3rem;
	}
	
	.Workers .workers-list .bnt img {
		height: 1.8rem;
		margin-right: 8px;
		margin-top: -6px;
	}
	
	.Workers .workers-list .bnt-state {
		color: #45acee;
		border: none;
	}
	
	.Workers .workers-list .bnt-guide {
		background-color: #94ca52;
		color: white;
	}
	
	.Workers .work-start {
		width: 13rem;
		height: 13rem;
		line-height: 2.2rem;
		background-size: 100%;
		text-align: center;
		margin: 1rem auto;
		overflow: hidden;
		border-radius: 50%;
	}
	
	.Workers .work-start span {
		display: inline-block;
		font-size: 1.8rem;
		color: #fff;
		margin-top: 4.3rem;
	}
	
	.Workers .finish {}
	
	.bnt-box {
		width: 100%;
		height: 40px;
		text-align: center;
		margin: 0 auto;
	}
	
	.bnt-box .button {
		width: 50%;
		height: 100%;
		float: left;
		background: white;
		color: #94ca52;
		font-size: 1.5rem;
		margin: 0;
		padding: 0;
		border-radius: 0;
		border: none;
		border-bottom: 1px solid #eee;
	}
	
	.bnt-box .button:hover {
		box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
	}
	
	.bnt-box .button img {
		height: 1.5rem;
		margin: -4px 6px 0 0;
	}
	
	@media screen and (max-width: 384px) {
		.Workers>.swipe-box{
			height: 220px;
		}
		.Workers .workers-list {
			width: 86%;
			padding: 0.8rem 1rem;
		}
		.Workers .workers-list .bnt {
			width: 9rem;
			height: 2.5rem;
			font-size: 1.4rem;
			line-height: 2.5rem;
		}
		.Workers .workers-list .bnt img {
			height: 1.5rem;
			margin-top: -4px;
		}
		.Workers .work-start {
			width: 12rem;
			height: 12rem;
			line-height: 2rem;
			margin: 0.8rem auto;
		}
		.Workers .work-start span {
			font-size: 1.6rem;
			margin-top: 4.1rem;
		}
		.bnt-box .button {
			font-size: 1.35rem;
		}
		.bnt-box .button img {
			height: 1.4rem;
			margin-top: -3px;
		}
	}

	@media screen and (max-width: 375px) {
		.Workers>.swipe-box{
			height: 200px;
		}
	}
	
	@media screen and (max-width: 320px) {
		.Workers>.swipe-box{
			height: 180px;
		}
		.Workers .workers-list {
			width: 85%;
			padding: 0.5rem 1rem;
		}
		.Workers .workers-list .bnt {
			width: 8rem;
			height: 2.2rem;
			font-size: 1.3rem;
			line-height: 2.2rem;
		}
		.Workers .workers-list .bnt img {
			height: 1.4rem;
			margin-top: -5px;
		}
		.Workers .work-start {
			width: 11rem;
			height: 11rem;
			line-height: 1.8rem;
			margin: 0.2rem auto;
		}
		.Workers .work-start span {
			font-size: 1.4rem;
			margin-top: 3.8rem;
		}
		.bnt-box {
			height: 32px;
		}
		.bnt-box .button {
			font-size: 1.2rem;
		}
		.bnt-box .button img {
			height: 1.2rem;
		}
	}
</style>