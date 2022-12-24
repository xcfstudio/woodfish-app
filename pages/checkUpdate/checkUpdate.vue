<template>
	<view>
		<view class="checkUpdate-box">
			<view class="top">
				<image src="../../static/woodfish_grey.svg" mode="" class="logo"></image>
				<view class="message">
					<view class="title">
						木鱼 功德网
					</view>
					<view class="version">
						当前版本: V1.0.0
					</view>
					<view class="details">
						<view class="update-title">
							更新日志
						</view>
						<view class="log">
							<p>1. 木鱼功德网APP的初个版本</p>
							<p>2. 包含敲木鱼、排行榜功能</p>
							<p>3. 简洁个人信息卡片</p>
						</view>
					</view>
				</view>
			</view>
			
			<view class="update-btn" @click="checkUpdate">
				检查更新
			</view>
		</view>
		
	</view>
</template>

<script lang="ts">
import request from '../../utils/request'
	export default {
		setup() {
			const checkUpdate = async () => {
				const res:any = await request({
					url: '/api/feedback/checkupdate',
					method: 'POST',
					data: {
						version: '1.0.1',
						platform: 'android'
					}
				})
				if (res && res.code === 200) {
					if (res.data.update) {
						uni.showModal({
							content: res.data.details,
							title:res.message,
						})
						return
					}
				}
				uni.showToast({
					icon:'none',
					title: "已是最新版"
				})
			}
			
			return {
				checkUpdate
			}
		}
	}
</script>

<style lang="less" scoped>
	.checkUpdate-box {
		.top {
			box-sizing: border-box;
			padding-top: 90upx;
			display: flex;
			flex-direction: column;
			align-items: center;
			.logo {
				width: 300upx;
				height: 300upx;
			}
			.message {
				display: flex;
				flex-direction: column;
				align-items: center;
				margin-top: 50upx;
				.title {
					font-size: 40upx;
					font-weight: bold;
				}
				.version {
					margin-top: 30upx;
				}
				.details {
					margin-top: 80upx;
					font-size: 30upx;
					.update-title {
						text-align: center;
						font-weight: bolder;
					}
					.log {
						font-size: 28upx;
						margin-top: 10upx;
						color: #4d4d4d;
					}
				}
			}
		}
		.update-btn {
			width: 250upx;
			height: 70upx;
			line-height: 70upx;
			border-radius: 35upx;
			background-image: linear-gradient(to right, #4553f5, #547cff);
			color: #fff;
			font-weight: bolder;
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			bottom: 80upx;
			text-align: center;
			&:active {
				background-image: linear-gradient(to right, #3d4ada, #4a6de1);
			}
		}
	}
</style>
