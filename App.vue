<script>
	export default {
		onLaunch: function() {
			console.warn('当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！')
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */

	@import '@/static/customicons.css';
	@import '@/static/default.css';
	@import "@/uni_modules/uview-ui/index.scss";
	
	// 设置整个项目的背景色
	page {
		background-color: #fff;
	}

	view {
		box-sizing: border-box;
	}
	image{
		object-fit: cover;
	}

	.main-color {
		color: #17B99A;
	}

	.example-info {
		font-size: 14px;
		color: #333;
		padding: 10px;
	}

	// 状态栏高度
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
		background: #fff !important;
	}

	// 底部高度
	.edgeInsetBottom {
		width: 100%;
		height: var(--window-bottom);
		background-color: #FFFFFF;
	}
</style>
