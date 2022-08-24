<template>
	<view class="suggest" @click="send()">
		<view class="space-between full hor-center">
			<view class="type">
				编辑推荐
			</view>
			<image class="icon" src="../../static/svg/arrowR.svg" mode=""></image>
		</view>
		<view class="label text-overflow2">
			{{label}}
		</view>
	</view>
</template>

<script>
	export default {
		name: "Suggest",
		props:{
			label:String
		},
		data() {
			return {

			};
		},
		methods:{
			send() {
				this.$emit("send")
			}
		}
	}
</script>

<style scoped>
	.suggest {
		width: 100%;
		padding: 14px 12px;
		border-radius: 8px;
		background: #FAFBFB;
		margin-top: 15px;
	}

	.type {
		padding: 2px 6px;
		border-radius: 4px;
		color: #17B99A;
		background: #E7F8F4;
		font-family: PingFangSC-Regular;
		font-size: 11px;
		font-weight: normal;
		line-height: 15px;
		letter-spacing: 0px;
	}

	.icon {
		width: 16px;
		height: 16px;
	}
	.label{
		margin-top: 10px;
		font-family: PingFangSC-Semibold;
		font-size: 14px;
		font-weight: normal;
		line-height: 20px;
		letter-spacing: 0px;
		color: rgba(0, 0, 0, 0.68);
	}
</style>
