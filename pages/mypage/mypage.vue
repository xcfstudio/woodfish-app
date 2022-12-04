<template>
	<view class="container">

		<view class="top-info">
			<view class="left">
				<image :src="userInfoStore.avatar" mode="" class="avatar"></image>
				<view class="user-info">
					<view class="username">
						{{userInfoStore.gongdeInfo.data.username}}
					</view>
					<view class="userid">
						UID: {{userInfoStore.gongdeInfo.data.uid}}
					</view>
				</view>
			</view>
			<view class="right">
				<view class="">
					<view class="level">
						LV{{level}}
					</view>
				</view>
			</view>
		</view>

		<view class="nologin" v-if="!loginState">
			<image src="../../static/null-data.svg" mode=""></image>

			<view class="loginnow" @click="navToLogin">
				登陆/注册
			</view>
			<view class="msg">
				登陆后可进行功德云记录、参与功德排名
			</view>
		</view>

		<view class="container-box" v-if="loginState">
			<view class="title">
				我的功德
			</view>
			<view class="card-container">
				<view class="card today-gongde">
					<view class="value">
						{{userInfoStore.gongdeInfo.data.todayScore}}
					</view>
					<view class="description">
						今日功德
					</view>
				</view>

				<view class="card total-gongde">
					<view class="value">
						{{userInfoStore.gongdeInfo.data.totalScore}}
					</view>
					<view class="description">
						累计功德
					</view>
				</view>

				<view class="card today-ranking">
					<view class="value">
						{{userInfoStore.gongdeInfo.data.todayRanking}}
					</view>
					<view class="description">
						今日排名
					</view>
				</view>

				<view class="card total-ranking">
					<view class="value">
						{{userInfoStore.gongdeInfo.data.totalRanking}}
					</view>
					<view class="description">
						累计排名
					</view>
				</view>
			</view>
		</view>

		<view class="title">
			更多服务
		</view>

		<view class="more-service">
			<!-- 联系客服 -->
			<view class="service-item contact" @click="navgateToContact">
				<span class="item-left"><span class="iconfont service-icon">&#xe674;</span> 联系客服</span><span
					class="iconfont">&#xe6ab;</span>
			</view>

			<view class="service-item update">
				<span class="item-left"><span class="iconfont service-icon">&#xe692;</span> 检查更新</span><span
					class="iconfont">&#xe6ab;</span>
			</view>
			<view class="service-item update">
				<span class="item-left"><span class="iconfont service-icon">&#xe691;</span> 关于我们</span><span
					class="iconfont">&#xe6ab;</span>
			</view>
			<view class="service-item setting">
				<span class="item-left"><span class="iconfont service-icon">&#xe69b;</span> 设置</span><span
					class="iconfont">&#xe6ab;</span>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	import {
		computed,
		ref
	} from "vue"
	import {
		isLogin
	} from "../../utils/isLogin";
	import request from "../../utils/request";
	import {UserInfo} from "../../store/index"
	export default {
		setup() {
			const userInfoStore = UserInfo()
			
			// const avatar = ref('../../static/grey-avatar.svg')
			// const level = ref(0)
			// const uid = ref('0000000000')
			const loginState = ref(false)
			
			

			// 用户头像已拉取标记
			let avatarPulled = false

			// 功德基本信息
			// const gongdeInfo = reactive({
			// 	data: {
			// 		todayScore: 0,
			// 		totalScore: 0,
			// 		todayRanking: 0,
			// 		totalRanking: 0,
			// 		username: '未登陆',
			// 		uid: '00000000000'
			// 	}
			// })

			// 跳转至登陆界面
			const navToLogin = () => {
				uni.navigateTo({
					url: '../login/login',
					animationType: 'fade-in',
					fail: (err) => {
						console.log(err);
					}
				})
			}

			// 拉取功德信息
			const pullGongdeInfo = async () => {
				if (loginState.value) {
					// console.log('request');
					const res: any = await request({
						url: '/api/gongde/woodfish/basicinfo',
						method: 'GET',
						token: 'access'
					})
					userInfoStore.gongdeInfo.data = res.data
					
				}
			}

			// 拉取头像
			const pullAvatar = async () => {
				if (loginState.value) {
					const res: any = await request({
						url: '/api/users/information/avatar',
						method: 'GET',
						token: 'access'
					})
					if (res.data.avatar) {
						userInfoStore.avatar = res.data.avatar
						avatarPulled = true
					}

				}
			}

			// 重置信息
			const reset = () => {
				userInfoStore.avatar = '../../static/grey-avatar.svg'
				userInfoStore.username = '未登陆'
				userInfoStore.uid = '--'
				userInfoStore.gongdeInfo.data.totalScore = 0
			}


			// 计算等级
			const level = computed(() => {
				return levelRule(userInfoStore.gongdeInfo.data.totalScore)
			})

			// 等级计算规则
			const levelRule = (level: number) => {
				if (!level || level === 0) return 0
				return Math.ceil(level / 500)
			}
			
			// -------------------跳转函数---------------------
			const navgateToContact = () => {
				uni.navigateTo({
					url: '../contact/contact'
				})
			}

			return {
				level,
				loginState,
				navToLogin,
				pullGongdeInfo,
				pullAvatar,
				avatarPulled,
				reset,
				navgateToContact,
				userInfoStore
			}
		},
		onShow() {
			this.loginState = isLogin()
			this.pullGongdeInfo()
			if (this.loginState) {
				if (!this.avatarPulled) {
					this.pullAvatar()
				}
			} else {
				this.userInfoStore.$reset()
			}

			// console.log('页面展示了');
		},
		onLoad() {

			// console.log('页面加载');
		}
	}
</script>

<style lang="less" scoped>
	.container {
		box-sizing: border-box;
		padding: 50upx;

		.top-info {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-top: 30upx;

			.left {
				display: flex;
				align-items: center;

				.avatar {
					width: 100upx;
					height: 100upx;
					border-radius: 50upx;
					margin-right: 25upx;
				}

				.user-info {
					.username {
						font-size: 35upx;
					}

					.userid {
						color: #989898;
						font-size: 25upx;
					}
				}
			}

			.right {
				.level {
					padding: 5upx 20upx;
					border-radius: 10upx;
					background-color: #d6b161;
					color: #fff;
					font-size: 30upx;
				}
			}
		}

		.nologin {
			display: flex;
			flex-direction: column;
			align-items: center;

			image {
				height: 500upx;
			}

			.loginnow {
				box-sizing: border-box;
				display: flex;
				justify-content: center;
				align-items: center;
				width: 250upx;
				height: 70upx;
				border-radius: 35upx;
				background-color: #edecf6;
				color: #6473ff;
				font-weight: bold;
				box-shadow: 0 0 10px #c5d9ff;
			}

			.msg {
				margin-top: 40upx;
				font-size: 25upx;
				color: #cdcdcd;
			}
		}

		.title {
			margin-top: 30px;
			margin-bottom: 20upx;
			padding-left: 30upx;
			font-weight: bold;
		}

		.card-container {
			.card {
				background-color: #e6e6e6;
				margin-bottom: 20upx;
				border-radius: 25upx;
				display: flex;
				// flex-direction: column;
				justify-content: center;
				align-items: center;
				padding: 20upx;
				color: #fff;

				.value {
					width: 350upx;
					font-size: 120upx;
					text-align: center;
				}

				.description {
					width: 200upx;
					text-align: right;
				}
			}

			.today-gongde {
				background-color: #d9cf69;
			}

			.total-gongde {
				background-color: #62ddb9;
			}

			.today-ranking {
				background-color: #75a4ff;
			}

			.total-ranking {
				background-color: #fbac84;
			}


		}

		.more-service {
			.service-item {
				margin-bottom: 20upx;
				display: flex;
				justify-content: space-between;
				&:active {
					font-weight: bold;
				}

				.item-left {
					display: flex;
					align-items: center;
				}

				.service-icon {
					font-size: 45upx;
					color: #75a4ff;
					padding-right: 25upx;
				}
			}
		}
	}
</style>
