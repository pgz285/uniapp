<template>
	<view class="pyq">
		<view class="space-between">
			<view class="p-left" @click="tab(date.userinfo.id)" v-if="date.userinfo">
				<image class="logo"
					:src="date.userinfo.headimg"
					mode=""></image>
			</view>
			<view class="p-right">
				<view class="right-top space-between hor-center" >
					<view class="col">
						<view class="name text-overflow text-overflow1" v-if="date.userinfo">
							{{date.userinfo.username}}
						</view>
						<view class="time">
							{{date.create_time}}
						</view>
					</view>
					<view class="row hor-center">
						<view class="hot both-center">
							设为热门
						</view>
						<image class="down" src="../../static/svg/down.svg" mode=""></image>
					</view>
				</view>
				<view class="right-text">
					<u-read-more :toggle="true" showHeight="85" textIndent="0" closeText="查看全文" color="#5c819b">
					    <rich-text :nodes="date.content" ></rich-text>
					</u-read-more>
				</view>
				<view class="pt-1">
					<u-album
					    :urls="urls2"
					    @albumWidth="width => albumWidth = width"
						singleSize=""
					    multipleSize="100"
					></u-album>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "pyq-card",
		data() {
			return {
				albumWidth: 0,
				list:{},
				urls2: [
					'https://img2.baidu.com/it/u=4275878202,4024270494&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
					'https://img0.baidu.com/it/u=1336331950,1548724862&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
					'https://img0.baidu.com/it/u=764288424,2975590343&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
					'https://img2.baidu.com/it/u=2176319346,3147073138&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
					'https://img0.baidu.com/it/u=374761639,2127782042&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
					// 'https://cdn.uviewui.com/uview/album/6.jpg',
					// 'https://cdn.uviewui.com/uview/album/7.jpg',
					// 'https://cdn.uviewui.com/uview/album/8.jpg',
					// 'https://cdn.uviewui.com/uview/album/9.jpg',
					// 'https://cdn.uviewui.com/uview/album/10.jpg',
				],
					content:`山不在高，有仙则名。水不在深，有龙则灵。斯是陋室，惟吾德馨。
				苔痕上阶绿，草色入帘青。谈笑有鸿儒，往来无白丁。可以调素琴，阅金经。
				无丝竹之乱耳，无案牍之劳形。南阳诸葛庐，西蜀子云亭。孔子云：何陋之有？`
			};
		},
		props:{
			date:Object
		},
		methods:{
			tab(e){
				this.$emit('popup',e)
			}
		}
	}
</script>

<style scoped>
	.pyq {
		padding: 20px 0;
	}

	.p-left {
		width: 30px;
		margin-right: 8px;
	}

	.logo {
		width: 30px;
		height: 30px;
		margin-top: 6px;
		border-radius: 50%;
	}

	/*  */
	.p-right {
		width: calc(100% - 38px);
	}

	.right-top {
		height: 40px;
	}
	
	.name {
		font-family: PingFangSC-Regular;
		font-size: 14px;
		font-weight: normal;
		line-height: 20px;
		letter-spacing: 0px;
		color: #5c819b;
		width: 100px;
	}
	.hot{
		font-family: PingFangSC-Regular;
		font-size: 12px;
		font-weight: normal;
		line-height: 18px;
		background: #F5F6F6;
		padding: 1px 8px;
		border-radius: 3px;
		letter-spacing: 0px;
		color: #5c819b;
		margin-right: 10px;
	}
	.pro{
		color: #FDA956;
	}

	.time {
		font-family: PingFangSC-Regular;
		font-size: 10px;
		font-weight: normal;
		line-height: 20px;
		letter-spacing: 0px;
		color: rgba(0, 0, 0, 0.3);
	}

	.down {
		width: 12px;
		height: 12px;
		opacity: .2;
	}
	.right-text{
		font-family: PingFangSC-Regular;
		font-size: 16px;
		font-weight: normal;
		letter-spacing: 0px;
		color: rgba(0, 0, 0, 0.8);
	}
	.pt-1{
		padding-top: 10px;
	}
</style>
