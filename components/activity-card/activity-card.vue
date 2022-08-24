<template>
	<view class="activity">
		<view class="space-between">
			<view class="label text-overflow3">
				#80天大脑强化 Day1 《断更四年，这次我真的不想半途而废》把一篇公众号
			</view>
			<image class="stamp" src="https://img2.baidu.com/it/u=775842536,3632317727&fm=253&fmt=auto&app=138&f=JPEG?w=504&h=500" mode=""></image>
		</view>
		<view class="text">
			凌子丨黑珍珠
		</view>
	</view>
</template>

<script>
	export default {
		name:"activity-card",
		data() {
			return {
				
			};
		}
	}
</script>

<style scoped>
.activity{
	width: 100%;
	height: auto;
	padding: 20px 0;
	border-bottom: 1px solid #f6f6f6;
}
.label{
	width: calc(100% - 85px);
	font-family: PingFangSC-Regular;
	font-size: 16px;
	font-weight: normal;
	line-height: 22px;
	letter-spacing: 0px;
	color: rgba(0, 0, 0, 0.8);
}
.stamp{
	width: 61px;
	height: 61px;
}
.text{
	margin-top: 8px;
	font-family: PingFangSC-Regular;
	font-size: 12px;
	font-weight: normal;
	line-height: 20px;
	letter-spacing: 0px;
	color: rgba(0, 0, 0, 0.5);
}
</style>