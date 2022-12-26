<template>
	<view>
		<view class="about-box">
			<view class="top">
				
				<view class="title">
					木鱼 功德网
				</view>
				<view class="icons">
					<image class="icon" src="../../static/github.svg" mode=""></image>
					<image class="icon" src="../../static/gitlab.svg" mode=""></image>
					<image class="icon" src="../../static/gitee.svg" mode=""></image>
				</view>
				<view class="p">
					<p>木鱼 功德网是一个基于Apache协议的开源项目</p>
					<p>在github、gitlab、gitee平台同步更新</p>
					<p>官网: https://xcfstudio.com/woodfish</p>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="less" scoped>
	.about-box {
		padding: 50upx;
		.top {
			.title {
				text-align: center;
				font-size: 40upx;
				font-weight: bolder;
				margin: 50upx 0;
			}
			.icons {
				display: flex;
				justify-content: space-around;
				padding: 0 50upx;
				margin-bottom: 50upx;
				.icon {
					width: 120upx;
					height: 120upx;
				}
			}
			.p {
				padding: 0 50upx;
				
				p {
					font-size: 27upx;
					color: #4c4c4c;
					margin-bottom: 10upx;
				}
			}
		}
	}
</style>
