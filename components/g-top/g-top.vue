<template>
	<view class="g-top hor-center">
		<view class="row ">
			<u-tag text="置顶" type="success" plain size="mini" borderColor="#16B998" color="#16B998"></u-tag>
			<view class="label text-overflow text-overflow1">
				纯享版-想阅读致敬！微信读书产品设计策略alkjhfkahfj
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"g-top",
		data() {
			return {
				
			};
		}
	}
</script>

<style scoped>
	.g-top{
		width: 100%;
		height: 45px;
		border-bottom: 1px solid #F6F6F6 ;
	}
	.label{
		width: calc(100vw - 65px);
		/* #ifdef MP-WEIXIN */
		/* width: calc(100% - 80px); */
		/* #endif */
		font-family: PingFangSC-Regular;
		font-size: 14px;
		font-weight: normal;
		line-height: 20px;
		letter-spacing: 0px;
		color: rgba(0, 0, 0, 0.6);
		margin-left: 10px;
	}
	
</style>