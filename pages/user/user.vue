<template>
	<view class="user-page">
		<view class="user-hd">
			<view class="status_bar"></view>
			<view class="hd-box ">
				<view class="hd-top space-between">
					<!-- #ifdef APP-PLUS -->
					<view class=""></view>
					<view class="row hor-center slgap1">
						<view class="green-bnt row both-center slgap">
							<image class="icon" src="../../static/svg/book.svg" mode=""></image>
							<view class="">
								浏览记录
							</view>
						</view>
						<view class="notice both-center">
							<image class="tip" src="../../static/svg/tip.svg" mode=""></image>
						</view>
					</view>
					<!-- #endif -->
				</view>
				<view class="hd-user">
					<view class="space-between hor-center">
						<view class="row hor-center">
							<image class="stamp" :src="userInfo.headImg" mode=""></image>
							<view class="col stgap" v-if="hasLogin">
								<view class="name">
									{{userInfo.nickname}}
								</view>
								<view class="row hor-center">
									<image class="rz" src="../../static/rz2.png" mode=""></image>
									<view class="label ml-1">
										微信用户
									</view>
								</view>
							</view>
							<view class="col stgap" v-else @click="showlogin()">
								<view class="name">
									{{userInfo.nickname}}
								</view>
								<view class="row hor-center">
									<!-- <image class="rz" src="../../static/rz2.png" mode=""></image> -->
									<view class="label">
										游客用户
									</view>
								</view>
							</view>
						</view>
						<image class="icon" src="../../static/svg/arrowR.svg" mode=""></image>
					</view>
					<view class="hd-bottom space-between">
						<view class="col stgap both-center">
							<view class="name"> 1 </view>
							<view class="label"> 好友 </view>
						</view>
						<view class="col stgap both-center">
							<view class="name"> 2 </view>
							<view class="label"> 关注 </view>
						</view>
						<view class="col stgap both-center">
							<view class="name"> 1 </view>
							<view class="label"> 收藏 </view>
						</view>
					</view>
				</view>
			</view>
			<view class="line"></view>
		</view>
		<view class="" v-for="(item,index) in list" :key="index">
			<Bar :info="item" />
		</view>
		<view class="line"></view>
		<view class="" v-for="(item1,id) in list2" :key="item1.id">
			<Bar :info="item1" />
		</view>
		{{hasLogin}}

		<LoginPopup :show="show" @send="close" />
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import Bar from '@/components/setting-bar/setting-bar.vue'
	import LoginPopup from '@/components/login-popup/login-popup.vue'
	export default {
		components: {
			Bar,
			LoginPopup
		},
		computed: {
			...mapState(['hasLogin', 'userInfo'])
		},
		data() {
			return {
				show:false,
				list: [{
					id: 0,
					icon: '../../static/svg/mine.svg',
					title: '个人资料',
					page: '',
					showNumber: false
				}, {
					id: 1,
					icon: '../../static/svg/group.svg',
					title: '我的社群',
					page: '',
					showNumber: true
				}],
				list2: [{
					id: 2,
					icon: '../../static/svg/joined.svg',
					title: '我的参与',
					page: '',
					showNumber: true
				}, {
					id: 3,
					icon: '../../static/svg/set.svg',
					title: '设置',
					page: '',
					showNumber: false
				}, {
					id: 4,
					icon: '../../static/svg/change.svg',
					title: '切换账号',
					page: '../login/login',
					showNumber: false
				}, {
					id: 5,
					icon: '../../static/svg/kefu.svg',
					title: '帮助与客服',
					page: '../../login/login',
					showNumber: false
				}]
			}
		},
		methods: {
			login() {
				uni.navigateTo({
					url: "../login/login"
				})
			},
			showlogin(){
				this.show = true
			},
			close(){
				this.show = false
			}
		}
	}
</script>

<style scoped>
	.user-page {
		width: 100%;
		height: 100vh;
		background: #F5F6F6 !important;
	}

	.hd-box {
		width: 100%;
		height: auto;
		background: #fff;
	}

	.hd-top {
		height: 48px;
		padding: 10px 16px 0 0;
	}

	.green-bnt {
		height: 24px;
		padding: 4px 8px;
		border-radius: 12px;
		background: #EDFCF8;
		font-family: PingFangSC-Regular;
		font-size: 12px;
		font-weight: normal;
		line-height: 20px;
		letter-spacing: 0px;
		color: #55B396;
	}

	.rz {
		width: 15px;
		height: 15px;
	}

	.ml-1 {
		margin-left: 5px;
	}

	.icon {
		width: 20px;
		height: 20px;
	}

	.tip {
		width: 24px;
		height: 24px;
		/* #ifdef MP-WEIXIN */
		width: 18px;
		height: 18px;
		margin-right: 8px;
		/* #endif */
	}

	/* hd-user */
	.hd-user {
		width: 100%;
		padding: 16px 16px 24px 16px;
	}

	.stamp {
		width: 74px;
		height: 74px;
		border-radius: 50%;
		border: 1px solid #EEEEEE;
		margin-right: 15px;
	}

	.name {
		font-family: PingFangSC-Semibold;
		font-size: 17px;
		font-weight: normal;
		line-height: 20px;
		letter-spacing: 0px;
		color: rgba(0, 0, 0, 0.8);
	}

	.label {
		font-family: PingFangSC-Regular;
		font-size: 14px;
		font-weight: normal;
		line-height: 20px;
		letter-spacing: 0px;
		color: rgba(0, 0, 0, 0.3);
	}

	/* hd-bottom */
	.hd-bottom {
		margin-top: 24px;
		padding: 0 24px;
	}

	.line {
		height: 12px;
		background: #F5F6F6;
	}
	.ml{
		margin-left: 16px;
	}
</style>
