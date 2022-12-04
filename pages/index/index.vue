<template>
		<view class="container">
			<view class="user-info">
				<view class="avatar">
					<image :src="userInfoStore.avatar" mode=""></image>
					<view class="username">
						{{userInfoStore.gongdeInfo.data.username}}
					</view>
				</view>
				<view class="score">
					今日<span>{{userInfoStore.gongdeInfo.data.todayScore}}</span>功德
				</view>
			</view>
			<view class="woodfish-box">
				<view class="woodfish" @click="knock">
					木鱼
				</view>
			</view>
		</view>
</template>

<script lang="ts">
	import {UserInfo} from '../../store/index'
import request from '../../utils/request';
	export default {
		setup() {
			const userInfoStore = UserInfo()
			const audioCtx = uni.createInnerAudioContext()
			audioCtx.src = '../../static/knock.mp3'
			const knock = async () => {
				// 播放声音
				audioCtx.stop()
				audioCtx.play()
				
				if (userInfoStore.loginState) {
					const res:any = await request({
						url: '/api/gongde/woodfish/knock',
						method: 'POST',
						token: 'access'
					})
					userInfoStore.gongdeInfo.data.todayScore = res.data.todayScore
					// console.log('登陆的用户在敲木鱼');
				}
			}
			
			return {
				userInfoStore, knock
			}
		}
	}

</script>

<style lang="less" scoped>
	.container {
		box-sizing: border-box;
		padding: 50upx;
		.user-info {
			
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-top: 30upx;
			.avatar {
				display: flex;
				align-items: center;
				image {
					width: 90upx;
					height: 90upx;
					margin-right: 20upx;
					border-radius: 50%;
				}
			}
		}
		
		.woodfish-box {
			display: flex;
			justify-content: center;
			.woodfish {
				display: flex;
				justify-content: center;
				align-items: center;
				color: #fff;
				font-size: 100upx;
				width: 400upx;
				height: 400upx;
				margin-top: 300upx;
				border-radius: 50%;
				background-color: #000;
				// &:active {
				// 	width: 300upx;
				// 	height: 300upx;
				// }
			}
		}
	}
</style>
