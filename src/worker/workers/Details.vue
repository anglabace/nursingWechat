<template>
	<div class="workersDetails">
		<v-header></v-header>
		<!--<div class="list" v-for="item in items">-->
		<div class="list" v-for="item in items">
			<div class="title">订单编码：{{item.tradeNum}}</div>
			<h3>服务地址</h3>
			<p>{{item.hospital}}</p>
			<h3>服务时间</h3>
			<p>服务时间：{{item.startDate}}—{{item.endDate}}|| 共计：{{item.duration }}天</p>
			<h3>服务星级</h3>
			<p>星级：{{item.starLevel}}星</p>
			<h3>付款状态</h3>
			<p>{{item.status}}</p>
			<h3>客户信息</h3>
			<p>姓名：{{item.username}}</p>
			<p>电话：{{item.phoneNum}}</p>
			<p>性别：{{item.patientGender}}</p>
		</div>
		<div class="state">待开始</div>
		<div class="fr">
			<mt-button type="danger" class="mt-button get" v-on:click="palyClick">接单</mt-button>
			<mt-button type="default" class="mt-button" v-on:click="cancellationOfOrder">拒单</mt-button>
		</div>
	</div>
</template>
<script>
	import vHeader from './../common/Header.vue';
	import { Cell } from 'mint-ui';
	import router from './../../router';
	import util from './../../js/util/util.js';
	export default {
		data() {
			return {
				items: [{
						"id": "1",
						"hospital": "",
						"startDate": "",
						"endDate": "",
						"starLevel": "0",
						"patientGender": "",
						"status": "",
						"duration": "",
						"username": "",
						"tradeNum": "",
						"phoneNum": "",
				}
				]
			}
		},
		created() {
			this.$store.state.headings = this.$router.history.current.name; //修改标题
			this.$store.state.isFooterShow = false; //显示底部导航
		},
		components: {
			vHeader,
			Cell
		},
		methods: {
			palyClick: function(id) { //接单
				console.log("接单")
			},
			cancellationOfOrder: function() { //拒单
				console.log("拒单")
			},
		},
		mounted: function() {
			let $this = this;
			let workId = this.$store.state.workId;
			let curItem = $this.items[0];
			util.Ajax('/api/orderwork/?_method=GET', {
				'workId': workId
			}, function(data) {
				let curData = data.data[0].order
				curItem.hospital = curData.hospital.name;
				curItem.starLevel = curData.work.star;
				let curS = curData.startDate
				let curD = curData.endDate;
				curItem.startDate = curS.substring(0, 10);
				curItem.endDate = curD.substring(0, 10);
				curItem.duration = curData.estimatedTime;
				curItem.username = curData.customer.name;
				curItem.tradeNum = curData.tradeNum;
				curItem.phoneNum = curData.customer.phoneNum;
				if(curData.customer.gender == 'male') {
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
<style type="text/css" scoped="scoped">
	.workersDetails {
		margin-top: 4rem;
		position: relative;
	}
	
	.workersDetails .list {
		width: 100%;
	}
	
	.workersDetails .list h3 {
		font-size: 1.4rem;
		color: #94ca52;
		padding: 0 1.2rem;
		margin-top: 12px;
	}
	
	.workersDetails .list p {
		font-size: 1.2rem;
		padding: 0.15rem 1.2rem;
	}
	
	.workersDetails .list .on {
		color: #94ca52;
	}
	
	.workersDetails .list .iconfont {
		padding-right: 1rem;
	}
	
	.workersDetails .title {
		background: #94ca52;
		color: #fff;
		font-size: 1.4rem;
		padding: 0.5rem 1.2rem;
	}
	
	.state {
		width: 100%;
		color: #fd6f37;
		font-size: 1.2rem;
		padding: 1rem 1.2rem;
	}
	
	.mt-button {
		width: 90px;
		height: 32px;
		margin: 1rem 1.2rem 0 0;
	}
	
	.get {
		background-color: #94ca52;
	}
</style>