##不要使用非uni_modules版本，那个不更新
###为了方便，默认加载图放在static下面，替换一下就可以不用每次传加载图了
#组件属性
| 属性名		| 类型			| 必填	| 默认值	| 说明														|
| -------------	| -------------	| ----	| ------	| ------------------------------------------------------	|
| height		| String		| 否	| 100%		| 图片高度,必须带尺寸单位(默认100%)												|
| src			| String		| 否	|			| 图片链接,不传的话会一直是加载中状态													|
| width			| String		| 否	| 100%		| 图片宽度,必须带尺寸单位(默认100%)												|
| borderRadius	| String		| 否	| 0			| 图片圆角,必须带尺寸单位													|
| minTimeOut	| String/Number	| 否	| 300		| 当图片加载过快(存在缓存)至少显示多少毫秒加载动画			|
| showDistance	| Object		| 否	| {bottom:0}| 当图片距离屏幕多少距离的时候开始加载 单位px 可以是负数	|
| loadSrc		| String		| 否	|			| 加载中显示的图片，输入网络路径或绝对路径													|
| errorSrc		| String		| 否	|			| 加载失败显示的图片，输入网络路径或绝对路径											|
| effect		| String		| 否	|linear		| 过渡效果  linear / ease / ease-in / ease-out / ease-in-out|
| duration		| String/Number	| 否	|300		| 图片加载成功后的过渡时间 单位毫秒							|

#组件事件
|名称|触发时机|
| -------------	| -------------	| 
|show|当图片进入页面触发|
|showSuccess|当图片完全加载完毕触发|

#示例
```
<lazyLoad src="图片链接" width="100rpx" height="100rpx" borderRadius="50%"></lazyLoad>
```

# 注意事项

宽高是要带单位的

此插件只支持固定宽高的图片，介意勿用

本插件使用 intersectionObserver API 监听节点的相交情况实现懒加载

如果有问题在下面评论下，我会改

组件点击事件建议使用@click.native绑定



