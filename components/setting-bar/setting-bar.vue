<template>
	<view class="setting-bar" v-if="info">
		<view class="space-between hor-center" @click="go(info)">
			<view class="row hor-center">
				<image class="icon" :src="info.icon" mode=""></image>
				<view class="menu">
					{{info.title}}
				</view>
			</view>
			<view class="row">
				<view v-if="info.showNumber" class="label">
					1
				</view>
				<image class="arrow" src="../../static/svg/arrowR.svg" mode=""></image>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		name: "setting-bar",
		data() {
			return {

			};
		},
		props: {
			info: Object
		},
		methods: {
			send() {
				this.$emit("send")
			},
			go(e) {
				if (e.id === 4) {
					this.$store.commit("logout")
				}
				uni.navigateTo({
					url: e.page
				})
			}
		}
	}
</script>

<style scoped>
	.setting-bar {
		width: 100%;
		height: 56px;
		background: #fff;
		padding: 16px 20px 16px 28px;
	}
	.setting-bar:active{
		background: #f9f9f9;
	}
	/* .setting-bar:hover{
		background: #f5f5f5;
	} */

	.icon {
		width: 28px;
		height: 28px;
		border-radius: 6px;
		/* background: #F3F7F8; */
	}

	.menu {
		font-family: PingFangSC-Regular;
		font-size: 15px;
		font-weight: normal;
		line-height: 20px;
		margin-left: 10px;
		letter-spacing: 1px;
		color: rgba(0, 0, 0, 0.8);
	}

	.label {
		font-family: PingFangSC-Regular;
		font-size: 16px;
		font-weight: normal;
		line-height: 20px;
		letter-spacing: 0px;
		color: rgba(0, 0, 0, 0.5);
		margin-right: 8px;
	}

	.arrow {
		width: 20px;
		height: 20px;
	}
</style>
