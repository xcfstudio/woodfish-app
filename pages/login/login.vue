<template>
	<view class="container">
		<image class="avatar" :src="topAvatar" />
		<view class="msg_box" v-if="errMsgShow">
			账户或密码错误
		</view>
		<view class="inputbox">
			<input v-model="account" type="text" class="account uni-input-input" focus placeholder="用户名/手机号/邮箱"
				placeholder-style="color: #c0c0c0" auto-focus>
			<input v-model="password" type="password" class="password uni-input-input" placeholder="密码"
				placeholder-style="color: #c0c0c0">
		</view>
		<view class="btnbox">
			<view class="registry btn" @click="navgateToReg">注册</view>
			<view class="login btn" @click="login">登陆</view>
		</view>

	</view>
</template>

<script lang="ts">
	import {
		computed,
		ref,
		watch
	} from "vue";
	import {
		debounce
	} from "../../utils/debounce";

	import request from "../../utils/request";
	import {
		setToken
	} from '../../utils/setToken'
	import {
		UserInfo
	} from '../../store/index'

	export default {
		setup() {
			const userInfoStore = UserInfo()
			// 用户头像链接
			const topAvatar = ref('../../static/grey-avatar.svg')
			// 控制错误信息显示
			const errMsgShow = ref(false)

			const account = ref('')
			const password = ref('')
			// 密码哈希处理
			const hashPwd = computed(() => {
				return password.value
			})

			const getAvatar = async () => {
				try {
					if (account.value.length === 0) return
					const res: any = await request({
						url: `/api/users/avatar/${encodeURI(account.value)}`,
						method: 'GET'
					})
					if (res && res.data.avatar) {
						topAvatar.value = res.data.avatar
					}

				} catch (e) {
					//TODO handle the exception
				}
			}

			// 防抖
			const _debounce = debounce(getAvatar, 500)

			watch(account, () => {
				_debounce()
			})


			const login = async () => {
				if (account.value.length === 0 || password.value.length === 0) {
					uni.showToast({
						title: '请完整输入',
						icon: "error"
					})
					return
				}
				try {
					uni.showLoading({
						title: '登录中'
					})
					const res: any = await request({
						url: '/api/users/login/',
						data: {
							account: account.value,
							password: hashPwd.value
						},
						method: 'POST'
					})
					if (res.code === 200) {
						uni.hideLoading()
						uni.showToast({
							icon: "success",
							title: '登录成功',
						})
						// 缓存token
						await setToken('access', res.data.accesstoken)
						await setToken('refresh', res.data.refreshtoken)

						// 设置登陆状态
						userInfoStore.loginState = true

						// 跳转主界面
						uni.switchTab({
							url: '../mypage/mypage'
						})
						// console.log('access', await getToken('access'));
						// console.log('refresh', await getToken('refresh'));



					} else {
						uni.showToast({
							icon: "error",
							title: '登录失败'
						})
					}
				} catch (e) {
					uni.showToast({
						icon: "error",
						title: '网络异常'
					})
					// console.log(e);
				}


			}

			const navgateToReg = () => {
				uni.redirectTo({
					url: "/pages/registry/registry"
				})
			}
			return {
				userInfoStore,
				topAvatar,
				errMsgShow,
				account,
				password,
				hashPwd,
				getAvatar,
				// _debounce,
				login,
				navgateToReg
			}
		}
	,
	onLoad(option:any) {
		if (option && option.email) {
			this.account = atob(option.email)
			this.password = atob(option.pwd)
			// console.log(this.password);
		}
	}
	}
	
</script>

<style lang="less" scoped>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		.avatar {
			width: 200upx;
			height: 200upx;
			border-radius: 50%;
			margin-top: 100upx;
			margin-bottom: 50upx;
		}

		.msg_box {
			margin-top: 30upx;
		}

		.inputbox {
			margin-top: 10upx;
			width: 500upx;

			.account,
			.password {
				box-sizing: border-box;
				height: 80upx;
				padding: 15upx 45upx;
				background-color: #e6f3f9;
				border-radius: 20upx;
				margin-top: 25upx;
				font-size: 30upx;
				// border-bottom: 2px solid #577bff;
			}



		}



		.btnbox {
			margin-top: 40upx;
			display: flex;
			width: 500upx;
			justify-content: space-around;

			.btn {
				box-sizing: border-box;
				height: 80upx;
				width: 150upx;
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 20upx;
				margin-bottom: 20upx;
				font-weight: bold;

			}

			.login {
				width: 300upx;
				color: #fff;
				background-image: linear-gradient(to right, #4553f5, #547cff);

				&:active {
					background-image: linear-gradient(to right, #3945cb, #496fdf);
				}
			}

			.registry {
				border: 1px solid #65c2ff;
			}
		}

	}
</style>
