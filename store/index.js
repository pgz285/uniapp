import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	// 全局数据
	state: {
		hasLogin: uni.getStorageSync('hasLogin') || false,
		userInfo: uni.getStorageSync('userInfo') || {
			nickname: '点我登录',
			token: '',
			userid: '',
			headImg: 'https://img1.baidu.com/it/u=1303378338,2744756438&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=417',
		}
	},
	// 修改state中的全局数据的唯一接口，mutations的函数只能是同步函数
	mutations: {
		login(state, userInfo) {
			state.userInfo.userid = userInfo.userid || '默认用户名';
			state.userInfo.nickname = userInfo.nickname || '默认用户名';
			state.userInfo.headImg = userInfo.headImg || '';
			state.userInfo.token = userInfo.token || '';
			state.hasLogin = true;
			
			uni.setStorageSync('hasLogin', state.hasLogin)
			uni.setStorageSync('userInfo', userInfo)
		},
		logout(state) {
			state.userInfo = {
			nickname: '点我登录',
			token: '',
			userid: '',
			headImg: 'https://img1.baidu.com/it/u=1303378338,2744756438&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=417',
		},
				state.hasLogin = false,
				
				uni.clearStorageSync('hasLogin');
				uni.clearStorageSync('userInfo');
		}
	},
	// 修改state中的全局数据的间接接口，可以为异步函数，通过调用mutations中的函数实现对state的修改
	actions: {

	}
})

export default store
