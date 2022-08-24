<template>
	<view class="newgroup relative">
		<u-navbar :placeholder="true" leftIconColor="#fff" bgColor="transparent">
			<view class="u-nav-slot both-center" slot="left" @click="back()">
				<view class="cancel">
					<u-icon name="arrow-left" color="#fff" size="20"></u-icon>
				</view>
			</view>
			<!-- #ifdef APP-PLUS -->
			<view class="u-nav-slot" slot="right">
				<view class="row slgap1">
					<u-icon name="search" color="#fff" size="24"></u-icon>
					<u-icon name="star" color="#fff" size="24"></u-icon>
					<u-icon name="list-dot" color="#fff" size="24"></u-icon>
				</view>
			</view>
			<!-- #endif -->

		</u-navbar>
		<view class="hd relative">
			<image class="bg" :src="imgurl + list.logo" mode="aspectFill"></image>
			<view class="drop">
			</view>

			<view class="top">
				<view class="space-between boxs">
					<view class="left row ">
						<image class="icon" :src="imgurl + list.logo" mode="aspectFill"></image>

						<view class="col ver-center mid">
							<view class="title text-overflow text-overflow1">
								{{list.name}}
							</view>
							<view class="row " v-if="list.userinfo">
								<view class="" @click="showPopup(list.userinfo.id)">
									<image class="logo" :src="list.userinfo.headimg" mode=""></image>
								</view>
								<view class="ask row relative">
									<view class="box space-between hor-center">
										<view class="asks">
											去提问
										</view>
										<u-icon name="arrow-right" color="#fff" size="13"></u-icon>
									</view>
									<view class="opa">

									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="share both-center">
						分享
					</view>
				</view>
				<view class="white">

				</view>
			</view>
		</view>

		<view class="tab-box">
			<view class="pd-16">
				<u-tabs :list="list1" lineColor="transparent" :activeStyle="active" :current="current"
					itemStyle="margin: 8px 6px;font-size:12px;border-radius: 4px;height:28px;background: #F5F6F6;color:rgba(210, 210, 210, 1.0);font-weight:bold;"
					@change="tabchange">
					<view slot="right" style="border-left: 1px solid #f0f0f0;" @tap="$u.toast('插槽被点击')">
						<u-icon name="list-dot" size="24" bold></u-icon>
					</view>
				</u-tabs>
			</view>
			<view class="">
				<swiper :current="swiperCurrent" @change="transition" class="swipeHeiht">
					<swiper-item class="swiper-item mwidth" v-for="(item, index) in newslist" :key="index">
						<scroll-view scroll-y style="height:100%;width: 100%;" @scrolltolower="">
							<view class="zd">
								<Top />
								<block v-if="pyq.length==0">
									<u-empty mode="list" icon="https://cdn.uviewui.com/uview/empty/list.png">
									</u-empty>
								</block>

								<block v-for="(item1,index1) in pyq" :key="item1.id">
									<Pyq @popup="showPopup" :date="item1" />
								</block>

							</view>

						</scroll-view>
					</swiper-item>
				</swiper>
			</view>
		</view>


		<view class="add both-center" @click="newArticle()">
			<u-icon name="edit-pen-fill" color="#fff" size="24" bold></u-icon>
		</view>

		<Info :show="show" @send="close" ref="info" />
		<LoginPopup :show="loginShow" @send="close2" />
	</view>
</template>

<script>
	import Top from '@/components/g-top/g-top.vue'
	import Pyq from '@/components/pyq-card/pyq-card.vue'
	import Info from '@/components/info-popup/info-popup.vue'
	import LoginPopup from '@/components/login-popup/login-popup.vue'
	export default {
		data() {
			return {
				id: '',
				list: {},
				pyq: {},
				show: false,
				loginShow: false,
				imgname: '',
				imgurl: 'https://center.foshanlepin.com/upload/group/',
				active: {
					fontWeight: 'bold',
					transform: 'scale(1.05)',
					background: '#4D4D4D',
					color: '#FFFFFF !important',
					borderRadius: '4px',
					padding: '3px 10px',
					fontSize: '13px'
				},
				swiperCurrent: 0,
				current: 0,
				newslist: [{
					name: 'xx'
				}, {
					name: 'yy'
				}],
				list1: [{
					name: '全部',
				}, {
					name: '热门',
					icon: 'thumb-up'
				}, {
					name: '仅看星主'
				}, {
					name: '问答'
				}, {
					name: '分享'
				}, {
					name: '吐槽'
				}, ]
			}
		},
		components: {
			Top,
			Pyq,
			Info,
			LoginPopup
		},
		onLoad(options) {
			this.id = options.groupID
			this.imgname = options.logo
		},
		mounted() {
			this.getDate()
			this.getPyq()
		},
		onShow() {
			this.getDate()
			this.getPyq()
		},
		computed: {

		},
		methods: {
			close2() {
				this.loginShow = false
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			go() {

			},
			newArticle() {
				console.log(uni.getStorageSync('hasLogin') == '')
				if (uni.getStorageSync('hasLogin') == '') {
					this.loginShow = true
					return
				}
				uni.navigateTo({
					url: "../newArticle/newArticle?id=" + this.id
				})
			},
			showPopup(e) {
				this.$refs.info.getDate(e,this.list.userinfo.id)
				this.show = true
			},
			close() {
				this.show = false
			},
			//拿到tab栏的下标 绑定给轮播图的index
			tabchange(e) {
				// console.log(e);
				this.swiperCurrent = e.index;
			},
			//滑动swiper后的下标  绑定给tab栏index		
			transition(e) {
				// console.log(e);
				this.current = e.detail.current
			},
			getDate() {
				let date = {
					query: `query GruopDetails($gruopDetailsId: String!) {
							  GruopDetails(id: $gruopDetailsId) {
								create_time
								logo
								price
								name
								userinfo {
								  id
								  headimg
								  username
								}
							  }
							}`,
					variables: {
						gruopDetailsId: this.id
					}
				}
				this.$request('', date).then(res => {
					// 打印调用成功回调
					// console.log(res.data.GruopDetails)
					this.list = res.data.GruopDetails
				})
			},
			getPyq() {
				let date = {
					query: `query AllArticles($allArticlesId: String!) {
							  AllArticles(id: $allArticlesId) {
								id
								u_id
								create_time
								content
								userinfo {
								  id
								  headimg
								  username
								}
							  }
							}`,
					variables: {
						allArticlesId: this.id
					}
				}
				this.$request('', date).then(res => {
					// 打印调用成功回调
					// console.log(res.data.AllArticles)
					this.pyq = res.data.AllArticles
				})
			}

		}
	}
</script>

<style scoped>
	.swipeHeiht {
		height: calc(100vh - 260px);
	}

	.u-nav-slot {
		z-index: 9999;
	}

	.hd {
		width: 100%;
		margin-top: -100px;
		height: auto;
	}

	.hd,
	.bg {
		width: 100vw;
		height: 220px;
	}

	.drop {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		z-index: 1;
		width: 100%;
		height: 220px;
		/* 主要内容 */
		background: rgba(0, 0, 0, .5);
		/* 模糊大小就是靠的blur这个函数中的数值大小 */
		backdrop-filter: blur(5px);
	}

	.relative {
		width: 100%;
		height: auto;
	}

	.top {
		width: 100%;
		position: absolute;
		bottom: 30px;
		height: 70px;
		z-index: 2;
	}

	.icon {
		width: 70px;
		height: 70px;
		border-radius: 12px;
		margin-right: 15px;
		background: #F6F6F6;
	}

	.title {
		font-family: PingFangSC-Semibold;
		font-size: 18px;
		font-weight: normal;
		line-height: 20px;
		letter-spacing: 0px;
		color: #fff;
		width: 150px;
		margin-bottom: 20px;
	}

	.mid {
		height: 70px;
	}

	.logo {
		width: 22px;
		height: 22px;
		border-radius: 50%;
		border: 1px solid #fff;
	}

	.share {
		background: #616161;
		font-family: PingFangSC-Regular;
		font-size: 14px;
		padding: 2px 8px;
		opacity: 0.7;
		border-radius: 20px;
		font-weight: normal;
		line-height: 25px;
		height: 25px;
		letter-spacing: 0px;
		color: #FFFFFF;
		border: 1px solid rgba(255, 255, 255, 0.8);
	}

	.asks,
	.ask {
		margin-left: 12px;
	}

	.box {
		width: 70px;
		font-family: PingFangSC-Regular;
		font-size: 12px;
		font-weight: normal;
		line-height: 22px;
		height: 22px;
		opacity: .9;
		letter-spacing: 0px;
		color: #FFFFFF;
		z-index: 1;
		background: transparent;
	}

	.opa {
		position: absolute;
		top: 0;
		height: 0;
		width: 80px;
		height: 22px;
		opacity: .1;
		border-radius: 30px;
		background: #d8d8d8;
		backdrop-filter: blur(50px);
	}

	.boxs {
		padding: 0 16px;
	}

	/* tabs */
	.tab-box {
		width: 100%;
	}

	.mwidth {
		padding: 0 16px;
		box-sizing: border-box;
	}

	.pd-16 {
		padding: 0 16px;
	}

	.zd {
		margin: 6px 0;
		border-top: 1px solid #F6F6F6;
	}

	.white {
		width: 100%;
		margin-top: 15px;
		height: 10px;
		border-radius: 30px 30px 0 0;
		background: #fff;
	}

	/*  */
	.add {
		width: 60px;
		height: 60px;
		border-radius: 50%;
		background: #17B99A;
		position: fixed;
		bottom: 9%;
		right: 20px;
		box-shadow: 0 15px 20px #c4eee4;
	}

	.wx {
		margin-left: 20px;
	}
</style>
