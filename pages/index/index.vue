<template>
	<view class="container">
		<view class="user-info">
			<view class="avatar" @click="navToUserInfo">
				<image :src="userInfoStore.avatar" mode=""></image>
				<view class="username">
					{{userInfoStore.gongdeInfo.data.username}}
				</view>
			</view>
			<view class="score">
				今日<span class="val">{{userInfoStore.gongdeInfo.data.todayScore}}</span>功德
			</view>
		</view>
		<view class="woodfish-box">
			<view class="woodfish" @click="knock">
				<view class="woodfish-imgbox" :class="{'fat-woodfish': isAnimate}">
					<image src="../../static/woodfish_black.svg" mode="" ></image>
				</view>
				
			</view>
			<view class="title">
				木鱼 功德网
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	import {
		UserInfo
	} from '../../store/index'
	import {
		debounce
	} from '../../utils/debounce';
	import request from '../../utils/request';
	import totp from 'totp-generator'
	import conf from '../../config/appConfig'
	import {
		isLogin
	} from '../../utils/isLogin';
import { ref } from "vue";
	export default {
		setup() {
			const userInfoStore = UserInfo()
			const audioCtx = uni.createInnerAudioContext()
			audioCtx.src = '../../static/knock.mp3'
			
			// 敲木鱼动画
			const isAnimate = ref(false)
			const animateKnock = () => {
				isAnimate.value = !isAnimate.value
				setTimeout(() => {
					isAnimate.value = !isAnimate.value
				}, 80)
			}
			const de_animateKnock = debounce(animateKnock, 90)

			// 上传本地缓存的分数，并重置缓存
			const upLoadScore = async () => {
				// console.log('upload');
				const score = userInfoStore.gongdeCache
				request({
					url: '/api/gongde/woodfish/knock2',
					method: 'POST',
					token: 'access',
					data: {
						score,
						secret: totp(conf.totp.Key, {
							algorithm: 'SHA-256',
							period: conf.totp.period,
							digits: 10
						})
					}
				}).then((v: any) => {
					// console.log(v);
					if (v.code === 200) {
						userInfoStore.gongdeInfo.data.todayScore = v.data.todayScore
					}
				}).catch(() => {
					userInfoStore.gongdeCache += score
				})

				// 重置缓存
				userInfoStore.gongdeCache = 0
			}
			const _debounce_uploadScore = debounce(upLoadScore, 2000)

			const knock = async () => {
				// 播放动画
				de_animateKnock()
				// 播放声音
				audioCtx.stop()
				audioCtx.play()
			
				if (userInfoStore.loginState) {

					// 功德缓冲区
					userInfoStore.gongdeCache++

					// 修改本地显示功德
					userInfoStore.gongdeInfo.data.todayScore++

					_debounce_uploadScore()
				}
			}
			
			const navToUserInfo = () => {
				if (userInfoStore.loginState)
				uni.navigateTo({
					url: '/pages/userInfo/userInfo'
				})
			}

			return {
				userInfoStore,
				knock,
				isAnimate,
				navToUserInfo
			}
		},
		onShow() {
			this.userInfoStore.loginState = isLogin()

			if (this.userInfoStore.loginState) {
				this.userInfoStore.pullGongdeInfo()
				this.userInfoStore.pullAvatar()

			} else {
				this.userInfoStore.$reset()
			}
		}
	}
</script>

<style lang="less" scoped>
	@keyframes fat {
		0%,
		50% {
			transform: scale(1.1);
		}
	}
	.fat-woodfish {
		animation: fat;
		animation-duration: 80ms;
	}
	.container {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		box-sizing: border-box;
		padding: 50upx;

		.user-info {

			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-top: 50upx;

			.avatar {
				display: flex;
				align-items: center;

				image {
					width: 100upx;
					height: 100upx;
					margin-right: 20upx;
					border-radius: 50%;
				}
			}
			
			.score {
				.val {
					font-weight: bolder;
					font-size: 45upx;
					padding: 0 10upx;
				}
			}
		}

		.woodfish-box {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.woodfish {
				display: flex;
				justify-content: center;
				align-items: center;
				color: #fff;
				font-size: 100upx;
				width: 400upx;
				height: 400upx;
				margin-top: 250upx;
				margin-bottom: 50upx;
				.woodfish-imgbox {
					
					image {
						width: 220px;
						height: 220px;
					}
					
				}
				
			}
			.title {
				font-size: 40upx;
				color: #a6a6a6;
			}
		}
	}
</style>
