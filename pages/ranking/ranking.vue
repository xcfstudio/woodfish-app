<template>
	<view>
		<view class="ranking">
			<view class="header">
				<view class="title">
					功德排行榜
				</view>
				<view class="data">
					<view class="ranking">
						12
					</view>
					<image src="../../static/grey-avatar.svg" mode=""></image>
					<view class="score">
						345345
					</view>
				</view>


			</view>
			<view class="nav-bar">
				<view class="nav-item" :class="{
					'nav-toggle': navToggleA
				}"
				@click="toggleA">
					今日榜单
				</view>
				<view class="nav-item" :class="{
					'nav-toggle': !navToggleA
				}"
				@click="toggleB">
					历史总榜
				</view>
			</view>
			<ranking />
		</view>

	</view>
</template>

<script lang="ts">
	import { ref } from "vue"
import ranking from '../../components/ranking/ranking.vue'
	export default {
		setup() {
			const navToggleA = ref(true)
			const toggleA = () => {
				navToggleA.value = true
			}
			const toggleB = () => {
				navToggleA.value = false
			}
			return {
				ranking, navToggleA, toggleA, toggleB
			}
		}
	}

</script>

<style lang="less" scoped>
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
			height: 400upx;
			background-image: linear-gradient(130deg, #4782d5, #4a4ac0);

			.title {
				color: #fff;
				font-weight: bolder;
				margin-bottom: 40upx;
			}

			.data {
				display: flex;
				align-items: baseline;
				justify-content: space-between;
				text-align: center;
				color: #fff;
				font-size: 32upx;
				.ranking {
					width: 170upx;
				}
				image {
					width: 180upx;
					height: 180upx;
					border-radius: 90upx;
				}
				.score {
					width: 170upx;
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
