<template>
	<view class="newarticle col ">
		<u-navbar :placeholder="true" leftIconColor="#fff">
			<view class="u-nav-slot both-center" slot="left" @click="back()">
				<view class="cancel">
					取消
				</view>
			</view>
			<view class="u-nav-slot n-right" slot="right">
				<view class="next op"  @click="push()">
					发布
				</view>
			</view>
		</u-navbar>
		<u--textarea v-model="content" :focus="true" :height="280" placeholder="请不要输入表情,系统暂时不支持表情输入!" count maxlength='400'>
		</u--textarea>
	</view>
</template>

<script>
	import func from '@/common/check.js'
	export default {
		data() {
			return {
				content: '',
				g_id: '',
				a_id: ''
			}
		},
		onLoad(options) {
			this.g_id = options.id
		},
		methods: {
			back(){
				uni.navigateBack({
					delta:1
				})
			},
			push() {
				var that = this
				if (this.content == '') {
					uni.showToast({
						title: "请先填写内容再提交",
						icon: "none",
						duration: 2000
					})

					return
				}

				if (func.isEmojiCharacter(this.content)) {
					uni.showToast({
						title: "内容暂不支持添加表情",
						icon: "none",
						duration: 2000
					})

					return
				}
				let arr = {
					group_id: this.g_id,
					content:this.content
				}

				let date = {
					query: `mutation Mutation($date: articleInput) {
							  createArticle(date: $date) {
								a_id
								message
							  }
							}`,
					variables: {
						date: arr
					}
				}
				
				this.$request('', date).then(res => {
					// 打印调用成功回调
					if(res.data.createArticle == null){
						uni.showToast({
							title: "内容请不要添加表情",
							icon: "none",
							duration: 2000
						})
						return
					}
					
					uni.showToast({
						title: '文章发布成功,2秒后返回星球首页',
						icon: "none"
					})
						
					this.content = ''
					this.a_id = res.data.createArticle.a_id
					
					setTimeout(function() {
						uni.navigateBack({
							delta:1
						})
					}, 1000);
				})
			}
		}
	}
</script>

<style scoped>
	.newarticle {
		width: 100%;
		padding: 20px 16px;
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
	.next{
		color: #17B99A;
		/* #ifdef MP-WEIXIN */
		border: 1px solid #17B99A;
		padding: 3px 12px;
		border-radius: 16px;
		/* #endif */
	}
	.n-right{
		/* #ifdef MP-WEIXIN */
			transform: translateX(-100px);
		/* #endif */
	}
</style>
