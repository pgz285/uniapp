<template>
	<view class="discover">
		<u-navbar  :placeholder="true" leftIconColor="#fff">
			<view class="u-nav-slot both-center" slot="left">
				<view class="title">
					发现周边
				</view>
				<!-- #ifdef MP-WEIXIN -->
				<view class="u-nav-slot" >
					<u-icon name="scan" color="#FDA956" size="24"></u-icon>
				</view>
				<!-- #endif -->
			</view>
			<!-- #ifdef APP-PLUS -->
			<view class="u-nav-slot" slot="right" >
				<u-icon name="scan" color="#FDA956" size="30"></u-icon>
			</view>
			<!-- #endif -->
			
		</u-navbar>
		<!-- <view class="status_bar"></view> -->
		<!-- <view class="box pt-2 col ">
			<SubTitle title="热点问题 · 星空问答" label="查看更多" icon="../../static/svg/greenArrow.svg" :showline="false"  @send="go()"/>
			<Suggest label="更高的工资和更有前景的学习机会，应该选择哪个呢?" @send="link()"/>
			<Suggest label="以及，我作为知识星球现有用户，应该怎样使用这款产品？" @send="link()"/>
		</view> -->

	<view>
		<image class="banner"
			src="https://img1.baidu.com/it/u=587102963,2526601009&fm=253&fmt=auto&app=138&f=PNG?w=1371&h=500"
			mode=""></image>
	</view>
		<view class="box">
			<SubTitle title="热门活动" label="换一批" icon="../../static/svg/greyRefresh.svg" :showline="true" @send="go()" />
			<Activity />
			<Activity />
		</view>
		<view class="box pt-2">
			<SubTitle title="你可能感兴趣" label="换一批" icon="../../static/svg/refresh.svg" :showline="true" @send="go()" />
			<Group />
			<Group />
		</view>
		<view class="edgeInsetBottom"></view>
	</view>
</template>

<script>
	import SubTitle from '@/components/sub-title/sub-title.vue'
	import Group from '@/components/group-card/group-card.vue'
	import Suggest from '@/components/Suggest/Suggest.vue'
	import Activity from '@/components/activity-card/activity-card.vue'
	export default {
		props: {},
		components: {
			SubTitle,
			Group,
			Suggest,
			Activity
		},
		data() {
			return {
			}
		},
		onPullDownRefresh() {
			setTimeout(function() {
				uni.showToast({
					title:"刷新成功",
					icon:'none'
				})
				uni.stopPullDownRefresh()
			}, 300);
		},
		methods: {
			go() {
				console.log('loading')
				uni.switchTab({
					url: '../user/user'
				})
			},
		}
	}
</script>

<style scoped>
	.discover {
		width: 100%;
		padding: 0 16px;
	}

	.box {
		padding:10px 0 16px ;
	}

	.pt-2 {
		padding-top: 6px;
	}

	.banner {
		width: 100%;
		height: 136px;
		border-radius: 8px;
		background: #D8D8D8;
	}
	.title {
		font-family: PingFangSC-Semibold;
		font-size: 16px;
		font-weight: normal;
		line-height: 20px;
		/* letter-spacing: 5px; */
		color: rgba(0, 0, 0, 0.8);
		margin-right: 10px;
	}
</style>
