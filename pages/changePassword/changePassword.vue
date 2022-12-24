<template>
	<view>
		<view class="container">
			<image src="../../static/changepwd.svg" mode=""></image>
			<view class="oldpwd pwd">
				<input v-model="oldPwd" type="password" placeholder="原密码" :class="{focus: focusId===1}" @focus="focus(1)" />
			</view>
			
			<view class="newpwd pwd">
				<input v-model="newPwdA" type="password" placeholder="新密码" :class="{focus: focusId===2}" @focus="focus(2)" />
			</view>
			
			<view class="newpwd pwd">
				<input v-model="newPwdB" type="password" placeholder="重复新密码" :class="{focus: focusId===3}" @focus="focus(3)" />
			</view>
			
			<view class="btn submit" @click="submit">
				提交修改
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
			
			const oldPwd = ref('')
			const newPwdA = ref('')
			const newPwdB = ref('')
			
			const submit = async () => {
				if (!oldPwd.value.length) {
					uni.showToast({
						icon: "none",
						title: '原密码不可为空'
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
					title: '提交中...'
				})
				const res:any = await request({
					url: '/api/users/changepassword',
					method: 'POST',
					token: 'access',
					data: {
						oldPassword: hash(oldPwd.value),
						newPassword: hash(newPwdA.value)
					}
				})
				if (res && res.code===200) {
					uni.hideToast()
					uni.showToast({
						icon:"success",
						title: res.message
					})
					setTimeout(()=>{
						uni.navigateBack()
					}, 1000)
				} else {
					uni.hideToast()
					uni.showToast({
						icon: "error",
						title: res.message
					})
				}
			}
			return {
				focus, focusId, submit, oldPwd, newPwdA, newPwdB
			}
		}
	}
</script>

<style lang="less" scoped>
	.focus {
		border: 2px solid #8abfff !important;
	}
	.container {
		padding: 30upx;
		display: flex;
		flex-direction: column;
		align-items: center;
		
		.pwd {
			display: flex;
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
		
		.oldpwd {
			margin-bottom: 30upx;
		}
		.newpwd {
			margin-bottom: 15upx;
		}
		
		.submit {
			width: 300upx;
			height: 70upx;
			margin-top: 50upx;
			line-height: 70upx;
			border-radius: 35upx;
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
