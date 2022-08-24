<template>
	<view class="groupset">
		<u-navbar :placeholder="true" leftIconColor="#fff" bgColor="#17B99A">
			<view class="u-nav-slot both-center" slot="left" @click="back()">
				<view class="cancel">
					<u-icon name="arrow-left" color="#fff" size="24"></u-icon>
				</view>
			</view>
			<view class="u-nav-slot n-right" slot="right">
				<view class="next op" v-if="ok" @click="go()">
					完成
				</view>
				<view class="next opacity" v-else>
					完成
				</view>
			</view>
		</u-navbar>

		<view class="relative both-center col">
			<view class="bg"></view>
			<view class="boxs">
				<view class="card ">
					<view class="card-top both-center">
						<view class="row">
							<view class="">
								付费星球
							</view>
							<view class="">
								↓
							</view>
						</view>
					</view>
					<view class="card-md col both-center">
						<view class="set">
							设置加入的费用
						</view>
						<view class="input-box both-center row">
							<view class="bold">
								¥
							</view>
							<input class="price" v-model="price" type="number" name="" id="" placeholder="10-5000的整数">
						</view>
					</view>
					<view class="card-bottom space-between hor-center">
						<view class="col stgap">
							<view class="set">
								选择有效期类型
							</view>
							<view class="red">
								所有成员截止日期相同:
							</view>
						</view>
						<image class="arrow" src="../../static/svg/arrowR.svg" mode=""></image>
					</view>
				</view>
				<view class="label">
					包含时政、新闻、盗版、低俗、色情、封建迷信等内容的星球，将会被封停星球和账号。
				</view>
				<view class="read-box hor-center row">
					<view class="radio both-center" :class="{'select' : agree}" @click="change()">
						<image v-if="agree" class="icons" src="../../static/svg/select.svg" mode="scaleToFill"></image>
					</view>
					<view class="">
						我已阅读并同意<text class="read">《兴趣星球星主规则》</text>
					</view>
				</view>
			</view>
		</view>

		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				groupID: '',

				price: 0,
				name: '',
				imgid: '',
				agree: true,
				list: {
					type: 'loading',
					title: '创建中',
					message: "创建中",
					iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/loading.png'
				}
			}
		},
		computed: {
			ok() {
				if (this.price.length != 0) return true
			}
		},
		onLoad(options) {
			this.imgid = options.logo
			this.name = options.name
		},
		methods: {
			change() {
				this.agree = !this.agree
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			go() {
				if (!this.agree) {
					uni.showToast({
						title: "请先阅读并同意相关协议",
						icon: "none"
					})
					return
				}
				this.$refs.uToast.show({
					...this.list,
				})

				let _this = this
				let date = {
					query: `mutation Mutation($info: groupInput) { createGroup(info: $info) { groupID message } }`,
					variables: {
						info: {
							name: _this.name,
							logo: _this.imgid,
							price: parseInt(_this.price)
						}
					}
				}
				console.log("request")
				this.$request('', date).then(res => {
					// 打印调用成功回调
					console.log(res)
					let arr = res.data.createGroup
					if (arr === null) {
						uni.showToast({
							title: '请求失败,请重试',
							icon: 'none'
						})
						return
					}
					if (arr.message == 'ok') {
						uni.showToast({
							title: '创建成功',
							icon: 'none'
						})
						uni.showModal({
							title: arr.groupID
						})
						setTimeout(function() {
							uni.reLaunch({
								url: "../index/index"
							})
						}, 2000);
					} else {
						uni.showModal({
							title: arr.message
						})
					}
				})
			}
		}
	}
</script>

<style scoped>
	.groupset {
		font-family: PingFangSC-Regular;
		font-size: 15px;
		font-weight: normal;
		line-height: 20px;
		letter-spacing: 0px;
		color: rgba(0, 0, 0, 0.8);
	}

	.cancel {
		font-family: PingFangSC-Regular;
		font-size: 17px;
		font-weight: normal;
		line-height: 22px;
		letter-spacing: 0px;
		color: rgba(0, 0, 0, 0.5);
	}

	.next {
		color: #fff;
		background: #17B99A;
		font-family: PingFangSC-Regular;
		font-size: 16px;
		font-weight: normal;
		letter-spacing: 1px;
		padding: 4px 12px;
		border-radius: 20px;
		color: #17B99A;
		background: #fff;
	}

	.opacity {
		opacity: .5;
	}

	.relative {
		width: 100%;
	}

	.bg {
		position: absolute;
		top: -1px;
		left: 0;
		width: 100%;
		height: 180px;
		background: #17B99A;
		border-radius: 0 0 100% 100%;
	}

	/* boxs */
	.boxs {
		width: 100%;
		height: auto;
		background: transparent;
		padding: 30px;
		z-index: 1;
	}

	.card {
		width: 100%;
		height: 300px;
		border-radius: 10px;
		background-color: #fff;
		z-index: 999;
		box-shadow: 0 15px 30px rgb(56 66 104 / 12%);
	}

	/* card */
	.card-top {
		width: 100%;
		height: 70px;
		background: #f5f5f5;
		border-radius: 10px 10px 0 0;
	}

	.card-md {
		padding: 30px 20px;
		background: #fff;
	}

	.input-box {
		width: 100%;
		padding: 20px 0;
		border-bottom: 1px solid #f0f0f0;
	}

	.bold {
		font-size: 22px;
	}

	.set {
		font-size: 13px;
		opacity: .68;
	}

	.price {
		width: 100px;
		margin-left: 8px;
		font-size: 13px;
		font-weight: 600;
		text-align: center;
	}

	.price::placeholder {
		color: #f7f7f7 !important;
	}

	.card-bottom {
		padding: 10px 20px;
	}

	.red {
		color: #df9f81;
		font-size: 14px;
	}

	.arrow {
		width: 16px;
		height: 16px;
	}

	/*  */
	.label {
		font-size: 13px;
		padding: 30px 0 20px 0;
	}

	.read-box {
		font-size: 13px;
	}

	.read {
		margin-left: 5px;
		font-size: 13px;
		color: #17B99A;
	}

	/* check */
	.radio {
		margin-right: 5px;
		width: 15px;
		height: 15px;
		border-radius: 50%;
		border: 1px solid rgba(0, 0, 0, 0.3);
	}

	.select {
		border: none;
	}

	.icons {
		width: 15px;
		height: 15px;
		border-radius: 50%;
		/* #ifdef APP-PLUS */
		border: 1px solid #17B99A;
		/* #endif */
	}
	.n-right{
		/* #ifdef MP-WEIXIN */
			transform: translateX(-100px);
		/* #endif */
	}
</style>
