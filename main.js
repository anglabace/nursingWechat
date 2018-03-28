// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import iconfontcss from './fonts/iconfont.css';
import commoncss from './css/common.css';    // 共用样式
import Vue from 'vue';
import App from './App';
import router from './router';
import util from './js/util/util';
import "babel-polyfill";
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import Vuex from 'vuex';
Vue.config.productionTip = false
Vue.use(MintUI)
Vue.use(Vuex);

var isTest=true;
// 如果在模块化构建系统中，请确保在开头调用了 Vue.use(Vuex)
//this.$store.state.token  子组件能通过 this.$store 访问到
const store = new Vuex.Store({
  state: {
    headings:'标题',
    isFooterShow:false,
    flag:3,
    userId:15, 
    customer_appid: isTest ? 'wx9e64c093244fb42b' : 'wx059ae8af2befce8d', //微信ID
    worker_appid: isTest ? 'wxc623feee9451eb31': 'wx8d52e52502d04610',
    imgUrl:'http://192.168.0.56:8139/'     //图片地址
  },
   mutations: {
    token(state) {
      // 变更状态
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})

//处理登录~~~拦截器
router.beforeEach((to, from, next) => {
	  var matchedLength=to.matched.length;
	  if(matchedLength<=0){
	  	// util.pushRouter(router,'Error',{error:"404"}); //404错误页	
	  }else{
	  if(to.name!="注册"){ //判断该路由是否需要登录权限
  	     let accessToken=true //sessionStorage.getItem("accessToken");
	  	  if (accessToken) {  // 通过vuex state获取当前的token是否存在
            next();
       }else{
        	util.pushRouter(router,'/customer/registration'); //登录页  	
        }
		  }else{
		  	  next();
		  }
	  }
});

//1.获取TokeenID
//2.同意进入首页
//3.不同意进入登录页
//判断显否登录
   util.Ajax('/api/user/me?_method=PATCH',{"phoneNum":18285533808},function(data){
			         if(data){
			         	  sessionStorage.setItem('accessToken', false);
                  sessionStorage.setItem('userName',"18285533808");
			         	  Toast("登陆成功");
			         	  util.pushRouter(router, '/customer/workers'); //首页
			          }
   })