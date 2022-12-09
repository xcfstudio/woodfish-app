<template>
	<view>
		<view class="ranking">
			<view class="header">
				<view class="title">
					功德排行榜
				</view>
				<view class="data">
					<view class="ranking">
						第<span class="value">{{topRanking}}</span>名
					</view>
					<image :src="userInfoStore.avatar" mode=""></image>
					<view class="score">
						<span class="value">{{topScore}}</span>功德
					</view>
				</view>


			</view>
			<view class="nav-bar">
				<view class="nav-item" :class="{
					'nav-toggle': navToggleA
				}" @click="toggleA">
					今日榜单
				</view>
				<view class="nav-item" :class="{
					'nav-toggle': !navToggleA
				}" @click="toggleB">
					历史总榜
				</view>
			</view>
			<ranking :dataArr="todayList" v-show="navToggleA" class="animate__animated animate__fadeInLeft" />
			<ranking :dataArr="totalList" v-show="!navToggleA" class="animate__animated animate__fadeInRight" />
		</view>

	</view>
</template>

<script lang="ts">
	import {
		ref
	} from "vue"
	import ranking from '../../components/ranking/ranking.vue'
	import request from "../../utils/request"
	import {UserInfo} from '../../store/index'
import { isLogin } from "../../utils/isLogin"
	export default {
		setup() {
			const userInfoStore = UserInfo()
			const navToggleA = ref(true)
			

			const todayList = ref([])
			const totalList = ref([])

			const topRanking = ref(0)
			const topScore = ref(0)
			
			const toggleA = () => {
				navToggleA.value = true
				topRanking.value = userInfoStore.gongdeInfo.data.todayRanking
				topScore.value = userInfoStore.gongdeInfo.data.todayScore
			}
			const toggleB = () => {
				navToggleA.value = false
				topRanking.value = userInfoStore.gongdeInfo.data.totalRanking
				topScore.value = userInfoStore.gongdeInfo.data.totalScore
			}

			const pullTodayRanking = async () => {
				if (navToggleA.value) {
					toggleA()
				} else {
					toggleB()
				}
				try{
					const res: any = await request({
						url: '/api/gongde/ranking/daily',
						method: 'GET'
					})
					if (res.code === 200) {
						todayList.value = res.data
					}
					return
				}catch(e){
					//TODO handle the exception
				}
			}

			const pullTotalRanking = async () => {
				try{
					const res: any = await request({
						url: '/api/gongde/ranking/total',
						method: 'GET'
					})
					if (res.code === 200) {
						totalList.value = res.data
					}
					return
				}catch(e){
					//TODO handle the exception
				}
			}
			return {
				ranking,
				navToggleA,
				toggleA,
				toggleB,
				todayList,
				totalList,
				pullTodayRanking,
				pullTotalRanking,
				topRanking,
				topScore,
				userInfoStore
			}
		},
		onShow() {
			this.userInfoStore.loginState = isLogin()
			
			this.pullTodayRanking()
			this.pullTotalRanking()
			
			if (this.userInfoStore.loginState) {
				this.userInfoStore.pullGongdeInfo()
				this.userInfoStore.pullAvatar()
				
				
			} else {
				this.userInfoStore.$reset()
			}
		},
		async onPullDownRefresh() {
			await Promise.all([
				this.pullTodayRanking(),
				this.pullTotalRanking()
			])
			uni.stopPullDownRefresh()
		}
	}
</script>

<style lang="less" scoped>	
@import '../../css/animate.css';

	.nav-toggle {
		background-image: linear-gradient(to right, #0539a1, #2178e9);
		color: #fff;
		font-weight: bolder;
	}

	.ranking {
		.header {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			height: 450upx;
			background-image: linear-gradient(130deg, #626dff, #3e3ebc);

			.title {
				color: #fff;
				font-weight: bolder;
				margin-bottom: 40upx;
				margin-top: 60upx;
			}

			.data {
				display: flex;
				align-items: baseline;
				justify-content: space-between;
				text-align: center;
				color: #fff;
				font-size: 26upx;
				
				.value {
					font-size: 45upx;
					font-weight: bolder;
				}

				.ranking {
					width: 200upx;
				}

				image {
					width: 180upx;
					height: 180upx;
					border-radius: 90upx;
				}

				.score {
					width: 200upx;
				}
			}


		}

		.nav-bar {
			display: flex;
			height: 60upx;
			margin: 20upx;
			border-radius: 30upx;
			justify-content: center;
			background-color: #e9eff7;

			.nav-item {
				width: 360upx;
				text-align: center;
				border-radius: 30upx;
				// background-image: linear-gradient(to right, #164788, #3784e9);
				// background-color: #9ec7ff;
				line-height: 60upx;
			}
		}

		.swiper-box {
			.swiper-main {
				height: 1000upx;
				// background-color: #c6c6ff;
			}
		}
	}
</style>
