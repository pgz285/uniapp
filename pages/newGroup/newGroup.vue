<template>
	<view class="newgroup ">
		<u-navbar :placeholder="true" leftIconColor="#fff">
			<view class="u-nav-slot both-center" slot="left" @click="back()">
				<view class="cancel">
					取消创建
				</view>
			</view>
			<view class="u-nav-slot n-right" slot="right">
				<view class="next op" v-if="ok" @click="go()">
					下一步
				</view>
				<view class="next opacity" v-else>
					下一步
				</view>
			</view>
		</u-navbar>

		<view class="relative both-center col">
			<image v-show="logo_list.length==0" class="upload" src="../../static/bigupload.jpg" mode="aspectFill" @click="uploadlogo()"></image>
			<image v-show="logo_list.length>0" class="upload" :src="logo_list" mode="aspectFill"></image>
			
			
			<input v-model="name" class="input" type="text" placeholder="输入星球名称">
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name:'',
				
				logo: '',
				logo_list: [],
			}
		},
		computed:{
			ok(){
				if(this.name.length != 0 && this.logo.length != 0) return true
			}
		},
		methods: {
			back(){
				uni.navigateBack({
					delta:1
				})
			},
			go(){
				uni.navigateTo({
					url:'../groupSet/groupSet?name='+ this.name +'&logo='+ this.logo
				})
			},
			uploadlogo() {
				let _this = this
				const userinfo = uni.getStorageSync('userInfo')
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择
					success: (res) => {
						const tempFilePaths = res.tempFilePaths;
						console.log(tempFilePaths[0])
						_this.logo_list = tempFilePaths[0]
						uni.uploadFile({
							url: 'https://center.foshanlepin.com/center/group/icon', //上传图片
							// url:'http://192.168.1.8:4001/group/icon',
							filePath: tempFilePaths[0],
							name: 'groupicon',
							header:{
								"Authorization": userinfo.token
							},
							success: (res) => {
								let _this = this
								let group =  JSON.parse(res.data) 
								_this.logo = group.imageID

								console.log(_this.logo);
								uni.showToast({
									title:"上传成功",
									icon:"success"
								})
							}
						});
					}
				});
			},
		}
	}
</script>

<style scoped>
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
		
	}
	
	.opacity{
		opacity: .5;
	}

	.relative {
		width: 100%;
		height: auto;
	}

	.upload {
		margin-top: 40px;
		width: 200px;
		height: 200px;
		border-radius: 15px;
		background: #fff;
		box-shadow: 0 15px 30px rgb(56 66 104 / 6%);
	}

	/* input */
	input {
		width:calc(100vw - 60px);
		margin-top: 50px;
		height: 60px;
		border: 2px solid #eeebf1;
		background: #fafafa;
		border-radius: 20px;
		text-align: center;

		font-family: PingFangSC-Regular;
		font-size: 16px;
		font-weight: bold;
		line-height: 20px;
		letter-spacing: 0px;
		color: rgba(0, 0, 0, 0.8);
	}
	.n-right{
		/* #ifdef MP-WEIXIN */
			transform: translateX(-100px);
		/* #endif */
	}
</style>
