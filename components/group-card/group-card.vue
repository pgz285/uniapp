<template>
	<view class="group-card hor-center">
		<view class="space-between full">
			<view class="both-center">
				<image class="left"
					src="https://img0.baidu.com/it/u=2081143585,1289666532&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
					mode=""></image>
			</view>
			<view class="right col ver-center">
				<view class="title">
					小幕和他的铁杆住友
				</view>
				<view class="label">
					成员2000+
				</view>
				<view class="label text-overflow text-overflow1">
					圈内设计服务：《户型布局设计》价格:149........
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "group-card",
		data() {
			return {

			};
		}
	}
</script>

<style scoped>
	.group-card {
		width: 100%;
		height: 98px;
		background: #fff;
	}

	.left {
		width: 66px;
		height: 66px;
		border-radius: 6px;
		background: #D8D8D8;
	}

	.right {
		width: calc(100% - 75px);
	}

	.title {
		font-family: PingFangSC-Semibold;
		font-size: 16px;
		font-weight: normal;
		line-height: 20px;
		letter-spacing: 0px;
		color: rgba(0, 0, 0, 0.8);
	}

	.label {
		font-family: PingFangSC-Regular;
		font-size: 13px;
		font-weight: normal;
		line-height: 20px;
		letter-spacing: 0px;
		margin-top: 2px;
		color: rgba(0, 0, 0, 0.5);
	}
</style>
