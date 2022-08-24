<template>
	<view>
		<u-popup :safeAreaInsetBottom="true" :safeAreaInsetTop="true" :mode="popupData.mode" :show="show"
			:round="popupData.round" :overlay="popupData.overlay" :borderRadius="popupData.borderRadius"
			:closeable="popupData.closeable" :closeOnClickOverlay="popupData.closeOnClickOverlay" @close="close">
			<view class="u-popup-slot both-center col">
				<image class="logo" :src="list.headimg" mode=""></image>
				<view class="row u-name hor-center">
					<view class="title">
						{{list.username}}
					</view>
					<view class="ml-1" v-if="boss">
						<u-tag  text="星主" colog="#fff" size="mini" bgColor="#FDA956" borderColor="#FDA956">
						</u-tag>
					</view>
				</view>
				<view class="bottom col both-center">
					<view class="full space-between center ">
						<view class="col stgap both-center">
							<view class="big">
								4
							</view>
							<view class="label">
								加入天数
							</view>
						</view>
						<view class="col stgap both-center">
							<view class="big">
								0
							</view>
							<view class="label">
								发表主题
							</view>
						</view>
						<view class="col stgap both-center">
							<view class="big">
								1
							</view>
							<view class="label">
								获得赞同
							</view>
						</view>
					</view>
					<view class="green-bnt both-center">
						进入我的足迹 {{list.id}}
					</view>
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
				uid: "",
				agree: false,
				list: {},
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
		computed: {
			boss() {
				if (this.list.id === this.uid) return true
			}
		},
		methods: {
			change() {
				this.agree = !this.agree
			},
			close() {
				var that = this
				this.list.headimg = ''
				this.list.username = ''
				this.list.id = ''
				this.$emit("send")

			},
			getDate(e, b) {
				console.log(b)
				this.uid = b
				let date = {
					query: `query QueryUser($queryUserId: String!) {
						  queryUser(id: $queryUserId) {
							id
							headimg
							username
						  }
						}`,
					variables: {
						queryUserId: e
					}
				}
				this.$request('', date).then(res => {
					// 打印调用成功回调
					// console.log(res.data.GruopDetails)
					this.list = res.data.queryUser
				})
			}
		}
	}
</script>

<style scoped>
	.u-popup-slot {
		height: 220px;

		/* #ifdef H5 */
		height: 280px;
		/* #endif */
	}

	.logo {
		position: absolute;
		top: -30px;
		width: 60px;
		height: 60px;
		border-radius: 50%;
		border: 3px solid #fff;
		background: #fff;
	}

	/*  */
	.green-bnt {
		margin-top: 20px;
		width: 80%;
		height: 50px;
		border-radius: 12px;
		background: #EDFCF8;
		color: #17B99A;
		font-family: PingFangSC-Semibold;
		font-size: 15px;
		font-weight: normal;
		line-height: 20px;
		letter-spacing: 0px;
	}

	.u-name {
		position: absolute;
		top: 45px;
	}

	.title {
		font-family: PingFangSC-Semibold;
		font-size: 17px;
		font-weight: normal;
		line-height: 20px;
		letter-spacing: 0px;
		color: rgba(0, 0, 0, 0.8);
	}

	.big {
		font-family: PingFangSC-Semibold;
		font-size: 17px;
		font-weight: normal;
		line-height: 20px;
		letter-spacing: 0px;
		color: rgba(0, 0, 0, 0.8);
	}

	.label {
		font-family: PingFangSC-Regular;
		font-size: 12px;
		font-weight: normal;
		line-height: 20px;
		letter-spacing: 0px;
		color: rgba(0, 0, 0, 0.3);
	}

	.center {
		width: calc(100vw - 80px);
	}

	.bottom {
		position: absolute;
		bottom: 60px;
		width: 100%;
		/* #ifdef MP-WEIXIN */
		bottom: 30px;
		/* #endif */
	}

	.ml-1 {
		margin-left: 10px;
	}
</style>
