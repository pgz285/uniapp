// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import store from './store/index.js'
import uView from '@/uni_modules/uview-ui'
import request from 'common/request.js'

Vue.prototype.$store = store
Vue.prototype.$request = request
Vue.config.productionTip = false

App.mpType = 'app'
Vue.use(uView);

const app = new Vue({
	...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
import App from './App.vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
