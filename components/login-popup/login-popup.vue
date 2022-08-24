<template>
	<view>
		<u-popup :safeAreaInsetBottom="true" :safeAreaInsetTop="true" :mode="popupData.mode" :show="show"
			:round="popupData.round" :overlay="popupData.overlay" :borderRadius="popupData.borderRadius"
			:closeable="popupData.closeable" :closeOnClickOverlay="popupData.closeOnClickOverlay" @close="close">
			<view class="u-popup-slot both-center col">
				<image class="img" src="../../static/logintip2.png" mode="scaleToFill"></image>

				<!-- #ifdef APP-PLUS -->
				<view class="green-bnt row both-center " @click="login_weixin()">
					<image class="wx" src="../../static/svg/wx.svg" mode=""></image>
					<view class="">
						微信登录
					</view>
				</view>
				<!-- #endif -->
					
				<!-- #ifdef MP-WEIXIN -->
				<view class="green-bnt row both-center " @click="wxGetUserInfo()">
					<image class="wx" src="../../static/svg/wx.svg" mode=""></image>
					<view class="">
						微信授权登录
					</view>
				</view>
				<!-- #endif -->
				<view class="row label check-box hor-center">
					<view class="radio both-center" :class="{'select' : agree}" @click="change()">
						<image v-if="agree" class="icons" src="../../static/svg/select.svg" mode="scaleToFill"></image>
					</view>
					已阅读并同意
					<view class="main-color">《用户协议》 </view>
					和
					<view class="main-color">《隐私政策》 </view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		name: "login-popup",
		data() {
			return {
				agree: false,
				code: '',
				popupData: {
					isshow: false,
					overlay: true,
					mode: 'bottom',
					borderRadius: '',
					round: '20',
					closeable: true,
					closeOnClickOverlay: true
				}
			};
		},
		props: {
			show: Boolean
		},
		mounted() {
			this.popupData.isshow = this.show
		},
		methods: {
			change() {
				this.agree = !this.agree
			},
			close() {
				this.popupData.isshow = false
				this.$emit("send")
			},
			// 小程序登录
			wxGetUserInfo() {
				var that = this
				if (!this.agree) {
					uni.showToast({
						title: "请先阅读并同意相关协议",
						icon: "none"
					})
					return
				}

				wx.login({
					success: function(r) {
						// console.log(r.code)
						that.code = r.code; //登录凭证
					}
				})
				wx.getUserProfile({
					desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
					success: (res) => {
						// console.log(res)
						var arr = res
						that.push(arr)
					}
				})
			},
			push(arr) {
				let date = {
					query: `mutation WxLogin($code: String!, $date: String!, $iv: String!) {
					  wxLogin(code: $code, date: $date, iv: $iv) {
						token
						headimgurl
						uid
						nickname
					  }
					}`,
					variables: {
						code: this.code,
						date: arr.encryptedData,
						iv: arr.iv
					}
				}
				this.$request('', date).then(res => {
					// 打印调用成功回调
					var list = res.data.wxLogin

					let pram = {
						nickname: list.nickname,
						token: list.token,
						userid: list.uid,
						headImg: list.headimgurl
					}
					this.$store.commit("login", pram)
					uni.showToast({
						title: '登录成功',
						icon: 'none'
					})
					this.close() 
				})

			},

			//微信登录
			login_weixin() {
				if (!this.agree) {
					uni.showToast({
						title: "请先阅读并同意相关协议",
						icon: "none"
					})
					return
				}

				let _this = this;
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						// 获取用户信息
						uni.getUserInfo({
							provider: 'weixin',
							success: function(infoRes) {
								_this.other_login(loginRes, infoRes, 'wx');
							}
						});
					},
					fail: (res) => {
						uni.showToast({
							title: '登录失败,请重试',
							icon: 'none'
						})
						console.log(res);
					}
				});
			},
			//授权登录
			other_login(loginRes, infoRes, type) {
				this.close()
				let _this = this;
				let url;
				let infos = {};
				// _this.loginRes=JSON.stringify(loginRes).toString();
				// _this.infoRes=JSON.stringify(infoRes).toString();
				switch (type) {
					case 'wx':
						url = '/token/sys/login-wechat';
						infos = {
							openid: loginRes.authResult.openid,
							nickname: infoRes.userInfo.nickName,
							sex: infoRes.userInfo.gender,
							headimgurl: infoRes.userInfo.avatarUrl,
							refreshToken: loginRes.authResult.refresh_token
						}
						break;
					default:
				}

				let date = {
					query: `mutation Mutation($info: wxInput) { wxRegister(info: $info) { token uid headimgurl nickname } }`,
					variables: {
						info: infos
					}
				}
				this.$request('', date).then(res => {
					// 打印调用成功回调
					let list = res.data.wxRegister
					console.log(res)
					let pram = {
						nickname: list.nickname,
						token: list.token,
						userid: list.uid,
						headImg: list.headimgurl
					}
					this.$store.commit("login", pram)
					uni.showToast({
						title: '登录成功',
						icon: 'none'
					})
					uni.switchTab({
						url: '../index/index'
					})
				})
			},
		}
	}
</script>

<style scoped>
	.u-popup-slot {
		height: 280px;
	}

	.img {
		/* #ifndef APP-PLUS */
		margin-top: 5px;
		/* #endif */
		/* #ifndef APP-PLUS */
		margin-top: 25px;
		/* #endif */
		width: 140px;
		height: 111px;
	}

	.label {
		font-family: PingFangSC-Regular;
		font-size: 26px;
		font-weight: normal;
		line-height: 40px;
		letter-spacing: 0px;
		color: rgba(0, 0, 0, 0.3);
	}

	/*  */
	.green-bnt {
		margin-top: 20px;
		width: 80%;
		height: 50px;
		border-radius: 30px;
		background: #17B99A;
		box-shadow: 0 15px 30px #E7F8F5;
		color: #fff;
		font-family: PingFangSC-Semibold;
		font-size: 15px;
		font-weight: normal;
		line-height: 20px;
		letter-spacing: 0px;
	}

	.wx {
		width: 24px;
		height: 24px;
		margin-right: 6px;
	}

	.check-box {
		padding-top: 5px;
		font-size: 12px;
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
</style>
