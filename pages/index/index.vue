<template>
	<view class="container">
		<u-navbar :placeholder="true" leftIconColor="#fff">
			<view class="u-nav-slot both-center" slot="left">
				<view class="title">
					兴趣星球
				</view>
			</view>
			<!-- #ifdef APP-PLUS -->
			<view class="u-nav-slot" slot="right" @click="open()">
				<view class="relative">
					<image class="add" src="../../static/svg/add.svg" mode=""></image>
				</view>
			</view>
			<!-- #endif -->
		</u-navbar>

		<view class="relative hor-center ">
			<!-- <image src="../../static/svg/search.svg" mode="" class="s-icon"></image>
			<input class="s-box" placeholder="搜索星球、用户或内容" disabled="true" /> -->
			<u-search placeholder="搜索星球、用户或内容" margin="0 10px 0 0" :showAction="false"></u-search>
			<!-- #ifdef MP-WEIXIN -->
			<view class="relative" @click="open()">
				<image class="add" src="../../static/svg/add.svg" mode=""></image>
			</view>
			<!-- #endif -->
		</view>
		<!-- <view >
			<image class="banner" src="https://img1.baidu.com/it/u=587102963,2526601009&fm=253&fmt=auto&app=138&f=PNG?w=1371&h=500" mode=""></image>
		</view> -->
		<view class="grid">
			<view class="" v-for="(item,index) in list" :key="index">
				<view class="" @click="details(item)">
					<Card :data="item" />
				</view>
			</view>
		</view>

		<!-- <Team /> -->

		<LoginPopup :show="show" @send="close" />
		<view class="edgeInsetBottom"></view>
	</view>
</template>

<script>
	import LoginPopup from '@/components/login-popup/login-popup.vue'
	import Card from '@/components/index-card/index-card.vue'
	// import Team from '@/components/team-card/team-card.vue'
	export default {
		data() {
			return {
				show: false,
				href: 'https://uniapp.dcloud.io/component/README?id=uniui',
				list: {}
			}
		},
		components: {
			Card,
			// Team,
			LoginPopup
		},
		onShow() {
			this.getDate()
		},
		mounted() {
			this.getDate()
		},
		methods: {
			open() {
				if (uni.getStorageSync('hasLogin')) {
					uni.navigateTo({
						url: '../newGroup/newGroup'
					})
				} else {
					this.show = true
				}

			},
			close() {
				this.show = false
			},
			details(e) {
				uni.navigateTo({
					url: "../groupsDetail/groupsDetail?groupID=" + e.id + "&logo=" + e.logo
				})
			},
			getDate() {
				let date = {
					query: `query AllGroup {
					  AllGroup {
						id
						u_id
						name
						logo
						userinfo {
						  id
						  headimg
						  username
						}
					  }
					}`,
					variables: {}
				}
				this.$request('', date).then(res => {
					// 打印调用成功回调
					this.list = res.data.AllGroup
				})
			}
		}
	}
</script>

<style scoped>
	.container {
		width: 100%;
		padding: 0 16px;
		font-size: 14px;
		line-height: 24px;
		background: #fff;
		box-sizing: border-box;
	}

	.title {
		font-family: PingFangSC-Semibold;
		font-size: 16px;
		font-weight: normal;
		line-height: 20px;
		letter-spacing: 5px;
		color: rgba(0, 0, 0, 0.8);
	}

	.add {
		width: 30px;
		height: 30px;
		margin-top: 5px;
	}

	/* search */
	.fix {
		/* position: sticky;
		top: 0;
		background: #fff;
		padding-bottom: 15px;
		z-index: 999; */
	}

	.s-box {
		width: 100%;
		height: 40px;
		background: #F5F6F6;
		border-radius: 8px;
		text-indent: 40px;
		/* #ifdef MP-WEIXIN */
		margin-right: 10px;
		/* #endif */
	}

	input::placeholder {
		font-family: PingFangSC-Regular;
		font-size: 28px;
		font-weight: normal;
		line-height: 40px;
		letter-spacing: 0px;
		color: rgba(0, 0, 0, 0.3);
	}

	.s-icon {
		width: 20px;
		height: 20px;
		position: absolute;
		left: 12px;
		top: 10px;
	}

	/*  */
	.banner {
		width: 100%;
		height: 136px;
		border-radius: 8px;
		background: #D8D8D8;
		margin-bottom: 10px;
	}

	/* grid-list */
	.grid {
		width: 100%;
		display: grid;
		grid-template-columns: 1fr 1fr;
		row-gap: 5px;
		column-gap: 12px;
		padding-top: 15px;
	}
</style>
