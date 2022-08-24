<template>
	<view class="index-card">
		<view>
			<lazyLoad :src="imgurl+data.logo" class="flex poster" height="156px" borderRadius="8px 8px 0 0" mode="scaleToFill"></lazyLoad>
			<view class="card-bottom space-between" v-if="data.userinfo">
				<view class="left col full">
					<text class="title text-overflow text-overflow1">{{data.name}}</text>
					<text class="label text-overflow text-overflow1">{{data.userinfo.username}}</text>
				</view>
				<view class="hor-end">
					<image class="stamp" :src="data.userinfo.headimg" mode=""></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import lazyLoad from '@/uni_modules/muqian-lazyLoad/components/muqian-lazyLoad/muqian-lazyLoad.vue'
	export default {
		name: "index-card",
		props: {
			data: Object
		},
		components: {
			lazyLoad
		},
		data() {
			return {
				imgurl:'https://center.foshanlepin.com/upload/group/'
			};
		},
		methods:{
		}
	}
</script>

<style scoped>
	.index-card {
		width: 100%;
		height: 223px;
	}

	.poster {
		width: 100%;
		height: 156px;
		border-radius: 8px 8px 0 0;
	}

	.card-bottom {
		width: 100%;
		border-radius: 0px 0px 8px 8px;
		background: #F5F6F6;
		height: 60px;
		padding: 8px 8px 10px 8px;
	}

	.title {
		max-width: 120px;
		font-size: 15px;
		font-weight: normal;
		line-height: 20px;
		letter-spacing: 0px;
		color: rgba(0, 0, 0, 0.8);
	}

	.label {
		max-width: 100px;
		font-size: 12px;
		font-weight: normal;
		line-height: 20px;
		letter-spacing: 0px;
		color: rgba(0, 0, 0, 0.5);
	}

	.stamp {
		width: 24px;
		height: 24px;
		border-radius: 50%;
	}
</style>
