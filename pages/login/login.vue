<template>
	<view class="relative">
		<u-toast ref="uToast"></u-toast>

		<view class="box both-center col stgap2">
			<image class="icon"
				src="https://img2.baidu.com/it/u=3329909549,3409014845&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
				mode=""></image>
			<view class="col stgap1 both-center">
				<view class="title">
					兴趣星球
				</view>
				<view class="label spacing">
					社群兴趣化工具
				</view>
			</view>

			<!-- #ifdef APP-PLUS -->
			<view class="green-bnt row both-center " @click="login_weixin()">
				<image class="wx" src="../../static/svg/wx.svg" mode=""></image>
				<view class="">
					微信登录
				</view>
			</view>
			<!-- #endif -->

			<!-- #ifdef MP-WEIXIN -->
			<button class="green-bnt row both-center " @click="wxGetUserInfo()">
				<image class="wx" src="../../static/svg/wx.svg" mode=""></image>
				<view class="">
					微信授权登录
				</view>
			</button>
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

		<view class="bottom row both-center label">
			<view class="padding">
				短信登录
			</view>
			|
			<view class="padding">
				注册
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				agree: false,
				code: '',
				list: {
					type: 'loading',
					title: '登录中',
					message: "登录中",
					iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/loading.png'
				}
			}
		},
		methods: {
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
				console.log("loging")
				wx.login({
					success: function(r) {
						console.log(r.code)
						that.code = r.code; //登录凭证
					}
				})
				wx.getUserProfile({
					desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
					success: (res) => {
						console.log(res)
						var arr = res
						that.push(arr)
					}
				})
			},
			push(arr) {
				let date = {
					query: `mutation Mutation($code: String!, $date: String!, $iv: String!) {
							  wxLogin(code: $code, date: $date, iv: $iv) {
								token
								uid
								headimgurl
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
					console.log(res)
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
					setTimeout(function() {
						uni.switchTab({
							url: '../index/index'
						})
					}, 1500);
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
					}
				});
			},
			//授权登录
			other_login(loginRes, infoRes, type) {
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
				console.log(infos)
				this.$refs.uToast.show({
					...this.list,
				})

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
			change() {
				this.agree = !this.agree
			}
		},
	}
</script>

<style scoped>
	.box {
		position: fixed;
		width: 100%;
		top: 25%;
		/* #ifdef MP-WEIXIN */
		top: 18%;
		/* #endif */
	}

	.icon {
		width: 120px;
		height: 120px;
		border-radius: 12px;
		background: #F5F6F6;
		border: 1px solid #F5F6F6;
		box-shadow: 0 10px 20px rgb(56 66 104 / 6%);
	}

	.title {
		font-family: PingFangSC-Semibold;
		font-size: 18px;
		font-weight: normal;
		line-height: 20px;
		text-align: center;
		letter-spacing: 5px;
		color: rgba(0, 0, 0, 0.8);
	}

	.bottom {
		position: fixed;
		width: 100%;
		bottom: 40px;
		height: 120px;
		/* #ifdef MP-WEIXIN */
		bottom: 20px;
		height: 80px;
		/* #endif */
	}

	.label {
		font-family: PingFangSC-Regular;
		font-size: 14px;
		font-weight: normal;
		line-height: 20px;
		letter-spacing: 0px;
		color: rgba(0, 0, 0, 0.3);
	}

	.padding {
		padding: 0 40px;
	}

	.spacing {
		font-size: 13px;
		letter-spacing: 5px;
		margin-left: 5px;
	}

	.green-bnt {
		margin-top: 80px;
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
		/* #ifdef MP-WEIXIN */
		padding-top: 25px;
		/* #endif */
	}

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
