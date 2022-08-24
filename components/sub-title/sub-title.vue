<template>
	<view class="sub-title" :class="{'line' : showline}">
		<view class="space-between hor-center">
			<view class="title">
				{{title}}
			</view>
			<view class="row hor-center" @click="send()">
				<view class="label">
					{{label}}
				</view>
				<image class="icon" :src="icon" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "sub-title",
		props: {
			title: String,
			label: String,
			icon: String,
			showline: Boolean
		},
		data() {
			return {

			};
		},
		methods: {
			send() {
				this.$emit("send")
			}
		}
	}
</script>

<style scoped>
	.sub-title {
		width: 100%;
		height: 20px;
	}

	.line {
		height: 35px;
		/* padding-bottom: 15px; */
		border-bottom: 1px solid #F6F6F6;
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
		line-height: 24px;
		letter-spacing: 0px;
		color: #17B99A;
		margin-right: 3px;
	}

	.icon {
		width: 15px;
		height: 15px;
		margin-top: -1px;
	}
</style>
