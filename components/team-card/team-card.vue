<template>
	<view class="team-card">
		<view class="space-between">
			<view>
				<image class="left"
					src="https://img2.baidu.com/it/u=1894984736,2787247854&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
					mode=""></image>
			</view>
			<view class="right col ver-center">
				<view class="title">
					智享汽车圈
				</view>
				<view class="row hor-center mt-8">
					<view class="label">
						智享圈主编
					</view>
					<text class="label"> | </text>
					<view class="label text-overflow text-overflow1">
						4800+人加入学习
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "team-card",
		data() {
			return {

			};
		}
	}
</script>

<style scoped>
	.team-card {
		width: 100%;
		height: 98px;
		background: #fff;
		padding: 16px 25px 32px 20px;
	}


	.left {
		width: 66px;
		height: 66px;
		border-radius: 6px;
		background: #D8D8D8;
	}

	.right {
		width: calc(100% - 81px);
		height: 66px;
	}
	.mt-8{
		margin-top: 8px;
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
		margin-right: 6px;
		color: rgba(0, 0, 0, 0.5);
	}
</style>
