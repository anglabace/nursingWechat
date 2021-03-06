import Cookie from './cookie'
import axios from 'axios';
import Vue from 'vue'
import { Toast,MessageBox } from 'mint-ui';
var isInit = false
var isDev = process.env.NODE_ENV === 'dev'

export default {
	data() {
		return {
			token: '',
			appid: '',
			role: ''
		}
	},
	verify() {
		var tk = Cookie.getCookie('token')
		if(!tk) {
			if(!isDev || !Cookie.getCookie(this.role)) {
				Cookie.setCookie(this.role, 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + this.appid + '&redirect_uri=' + encodeURIComponent('http://' + document.location.host + '/wechat/auth/' + this.role) + '&response_type=code&scope=snsapi_userinfo&state=' +
					encodeURIComponent(document.location.href) + '#wechat_redirect')
				if(isDev) {
					if(document.location.href.indexOf('worker') > -1) {
						this.token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJvZ0tYZnc2TVNBSDU1SnF4OExxRExmSkZsNDlZIiwiZXhwIjoxNDY0OTQwOTM0MDM1fQ.z427Agu5SCpUF-TuuWtw3_zBtqJgIMAvVa8kFVs4ZO09EwpQmLlPEnGgxO17rIpNBabEg3eWGG6qDgUtD6l4kw'
					} else {
						this.token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOjcsImV4cCI6MTQ2NzM2MDg0MTk1N30.99vuOxptw76uGR11cbI5Kj0rM9zNewYU3r3t5kHazKWBPvpGgEnJ7-PIcwexYIDNPyGCx4d18CPgOera00qucA'
					}
					Cookie.setCookie('token', this.token)
					return true
				} else {
					document.location.replace('https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + this.appid + '&redirect_uri=' + encodeURIComponent('http://' + document.location.host + '/wechat/auth/' + this.role) + '&response_type=code&scope=snsapi_userinfo&state=' + encodeURIComponent(document.location.href) + '#wechat_redirect')
					// document.location.replace('https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + this.appid + '&redirect_uri=' + encodeURIComponent('http://120.27.192.131/wechat/auth/' + this.role) + '&response_type=code&scope=snsapi_userinfo&state=' + encodeURIComponent(document.location.href) + '#wechat_redirect')
				}
				return false
			}
		}
		this.token = tk
		return true
	},
	init(appid, role, callback) {
		if(isInit) {
			return false
		}
		this.appid = appid
		this.role = role
		isInit = true
		var $this = this
		axios.interceptors.request.use(function(req) {
			// Do something before request is sent
			console.log('开始请求')
			if($this.verify()) {
				if(isDev) {
					req.headers['x-access-token'] = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1c2VySWQiOjIwNiwiZXhwIjoxNTA0NTUyMjUwMzEzfQ.RKn-3gayxMzS4uUM2LuMLTFGxMOfNanY8QbeneYGhJVZitWUFL_4nqAJ6j-EDBf7QduXaUPzp01_LrEINoIL3g'
					return req
				}
				req.headers['x-access-token'] = $this.token
				return req
			}
			return null
		}, function(error) {
			// Do something with request error
			console.log('请求失败')
			return Promise.reject(error)
		})
		axios.interceptors.response.use(function(resp) {
			// Do something before request is sent
			console.log('接收响应')
			console.log(resp);
			if(resp.status === 401) {
				Cookie.deleteCookie('token_' + $this.role)
				$this.verify()
				return null
			} else if(resp.status === 403) {
				callback()
				return null
			} else if(resp.status === 404) {
				MessageBox('提示', '网络错误');
				 return null
			} else if(resp.status === 500) {
				if(resp.data.message) {
					MessageBox('提示', resp.data.message);
				} else {
					MessageBox('提示', '网络错误');
				}
				return null
			}
			return resp
		}, function(error) {
			// Do something with request error
			console.log(error.response.status);
			console.log(error.response);
			switch (error.response.status){
				case 401:
					Cookie.deleteCookie('token_' + $this.role);
					$this.verify();
					break;
				case 403:
					callback()
					break;
//				case 404:
//					Toast(error.data.message);
//					break;
//				case 500:
//					if(error.data.message) {
//						MessageBox('提示', error.data.message);
//					} else {
//						MessageBox('提示', '网络错误');
//					}
//					break;
				default:
					break;
			}
//			if(error.response.status === 401) {
//				Cookie.deleteCookie('token_' + $this.role)
//				$this.verify()
//				return null
//			} else if(error.response.status === 403) {
//				callback()
//				return null
//			} else if(error.response.status === 404) {
//				Toast(error.data.message);
//				 return null
//			} else if(error.response.status === 500) {
//				if(error.data.message) {
//					MessageBox('提示', error.data.message);
//				} else {
//					MessageBox('提示', '网络错误');
//				}
//				return null
//			}
			return error.response;
			console.log('响应出错')
			//return Promise.reject(error)
		})
		return true;
	}
}