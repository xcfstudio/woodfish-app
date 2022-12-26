<template>
	<view>
		<view class="container">
			<image class="top-banner" src="../../static/registry.svg" mode=""></image>
			<view class="email input">
				<input v-model="email" type="text" placeholder="电子邮箱" :class="{focus: focusId===1}" @focus="focus(1)" />
			</view>
			
			<view class="newpwd pwd input">
				<input v-model="newPwdA" type="password" placeholder="设置密码" :class="{focus: focusId===2}" @focus="focus(2)" />
			</view>
			
			<view class="newpwd pwd input">
				<input v-model="newPwdB" type="password" placeholder="重复密码" :class="{focus: focusId===3}" @focus="focus(3)" />
			</view>
			
			<view class="btn submit" @click="submit">
				注册
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	import { ref } from "vue"
import request from "../../utils/request"
	export default {
		setup() {
			const focus = (id:number) => {
				focusId.value = id
			}
			const focusId = ref(0)
			const hash = (str: string) => {
				return str
			}
			
			const email = ref('')
			const newPwdA = ref('')
			const newPwdB = ref('')
			
			const verifyEmail = (email: string) => {
				const regex = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
				return regex.test(email)
			}
			
			const submit = async () => {
				if (email.value.length === 0) {
					uni.showToast({
						icon:"none",
						title:"邮箱不能为空"
					})
					return
				}
				if (!verifyEmail(email.value)) {
					uni.showToast({
						icon:"none",
						title:"邮箱格式错误 "
					})
					return
				}
				if (!newPwdA.value.length) {
					uni.showToast({
						icon: "none",
						title: '新密码不可为空'
					})
					return
				}
				if (newPwdA.value !== newPwdB.value) {
					uni.showToast({
						icon: "none",
						title: "两次输入密码不一致"
					})
					return
				}
				uni.showLoading({
					title: '注册中'
				})
				const res:any = await request({
					url: '/api/users/register',
					method: 'POST',
					data: {
						useremail: email.value,
						password: hash(newPwdA.value)
					}
				})
				if (res && res.code === 200) {
					uni.hideLoading()
					uni.showToast({
						icon:"success",
						title:"注册成功"
					})
					setTimeout(() => {
						uni.redirectTo({
							url:`/pages/login/login?email=${btoa(email.value)}&pwd=${btoa(newPwdA.value)}`
						})
					}, 1000)
					return
				}
				uni.showToast({
					icon:"error",
					title:"注册失败"
				})
			}
			return {
				focus, focusId, email, newPwdA, newPwdB, submit
			}
		}
	}
</script>

<style lang="less" scoped>
	.focus {
		border: 2px solid #8abfff !important;
	}
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 80upx;
		
		.top-banner {
			height: 350upx;
			margin-bottom: 50upx;
		}
		
		.input {
			input {
				width: 500upx;
				padding: 10upx;
				padding-left: 20upx;
				background-color: #e6f3f9;
				border-radius: 15upx;
				border: 2px solid transparent;
				transition: 0.4s all;
			}
		}
		
		.email {
			margin-bottom: 30upx;
		}
		.pwd {
			margin-bottom: 20upx;
		}
		
		.submit {
			width: 500upx;
			height: 70upx;
			margin-top: 40upx;
			line-height: 70upx;
			border-radius: 15upx;
			text-align: center;
			color: #fff;
			font-weight: bolder;
			background-image: linear-gradient(to right, #4553f5, #547cff);
			&:active {
				background-image: linear-gradient(to right, #3945cb, #496fdf);
			}
		}
	}
</style>
