<template>
	<view>
		<view class="container">
			<image class="avatar" :src="userInfoStore.avatar" mode=""></image>
			<view class="btn linkqq" @click="linkQQavatar">
				绑定QQ头像
			</view>
			<view class="info">
				<view class="ban" v-if="sameName">
					此用户名已存在
				</view>
				<view class="user-name item">
					<span>用户名</span><input type="text" v-model="userName">
				</view>
				<view class="user-gender item">
					<span>性别</span><radio-group name="" @change="radioHandler">
						<label>
							<radio value="male" :checked="gender==='male'" style="transform: scale(0.6);" /><text>男</text>
						</label>
						<label>
							<radio value="female" :checked="gender==='female'" style="transform: scale(0.6);" /><text>女</text>
						</label>
						<label>
							<radio value="other" :checked="gender==='other'" style="transform: scale(0.6);" /><text>其他</text>
						</label>
					</radio-group>
				</view>
				<view class="user-birthday item">
					<span>生日</span><picker mode="date" @change="pickerHandler" :value="birthday">
						<view>{{birthday}}</view>
					</picker>
				</view>
			</view>
			<view class="btn submit" @click="submit">
				保存更改
			</view>
		</view>
	</view>
</template>

<script lang="ts">
import { ref, watch } from "vue"
import {UserInfo} from '../../store/index'
import { debounce } from "../../utils/debounce"
import request from "../../utils/request"
	export default {
		setup() {
			const userName = ref('')
			const gender = ref('male')
			const birthday = ref('点击选择')
			
			const sameName = ref(false)
			
			const radioHandler = (e:any) => {
				gender.value = e.detail.value
				console.log(gender.value);
			}
			const pickerHandler = (e:any) => {
				birthday.value = e.detail.value
			}
			
			const userInfoStore = UserInfo()
			
			const pullInfo = async () => {
				const res:any = await request({
					url: '/api/users/information/',
					method: 'GET',
					token: 'access'
				})
				console.log(res);
				if (res && res.code === 200) {
					userName.value = res.data.username
					if (res.data.gender) {
						gender.value = res.data.gender
					}
					if (res.data.birthday) {
						birthday.value = res.data.birthday.split('T')[0]
					}
				}
			}
			const checkName = async (name: string) => {
				if (!userName.value.length) {
					return
				}
				const res:any = await request({
					url: `/api/users/exist/name/${encodeURI(name)}`,
					method: 'GET'
				})
				console.log(res);
				if (res && res.code === 200) {
					if (res.data.exist) {
						if (res.data.dataValues.uid !== userInfoStore.gongdeInfo.data.uid) {
							sameName.value = true
						}
						
					} else {
						sameName.value = false
					}
				}
			}
			
			const _de_checkName = debounce(checkName, 1000)
			
			watch(userName, () => {
				_de_checkName(userName.value)
			})
			
			const submit = async () => {
				if (sameName.value) {
					uni.showToast({
						icon: 'none',
						title: '用户名已存在，换一个吧'
					})
					return
				}
				if (!userName.value.length) {
					uni.showToast({
						icon: 'none',
						title: '用户名不能为空'
					})
					return
				}
				uni.showToast({
					icon: 'loading',
					title: '请求服务器...'
				})
				const res:any = await request({
					url: '/api/users/information/',
					method: 'PUT',
					token: 'access',
					data: {
						username: userName.value,
						gender: gender.value,
						birthday: birthday.value
					}
				})
				if (res.code === 200) {
					uni.hideToast()
					uni.showToast({
						icon: 'success',
						title: '修改成功'
					})
					setTimeout(() => {
						uni.navigateBack()
					}, 1000)
				}
				console.log(res);
			}
			
			const linkQQavatar = () => {
				uni.showModal({
					editable: true,
					title: '绑定QQ头像',
					placeholderText: '输入QQ号',
					success: async (res) => {
						if (res.confirm) {
							uni.showLoading({
								title: '请求QQ接口...'
							})
							console.log(res);
							const r:any = await request({
								url: '/api/users/information/qqavatar',
								method: 'POST',
								token: 'access',
								data: {
									qqNumber: res.content
								}
							})
							if (r.code === 200) {
								userInfoStore.pullAvatar()
								uni.hideLoading()
								uni.showToast({
									icon:"success",
									title: '头像已更新'
								})
							}
						}
					}
				})
			}
			return {
				userName, gender, birthday, radioHandler, pickerHandler, userInfoStore,
				pullInfo, sameName, submit, linkQQavatar
			}
		},
		onShow() {
			this.pullInfo()
		}
	}
</script>

<style lang="less" scoped>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding-top: 80upx;
		.avatar {
			width: 240upx;
			height: 240upx;
			border-radius: 120upx;
		}
		.linkqq {
			// box-sizing: border-box;
			width: 200upx;
			height: 40upx;
			line-height: 40upx;
			border-radius: 10upx;
			font-size: 25upx;
			text-align: center;
			background-color: #3bb9cc;
			color: #fff;
			font-weight: bold;
			padding: 10upx;
			margin: 50upx 0;
		}
		.info {
			.ban {
				text-align: right;
				width: 400upx;
				font-size: 30upx;
				margin-bottom: 10upx;
				color: red;
			}
			.item {
				display: flex;
				align-items: center;
				margin-bottom: 15upx;
				color: #7e7e7e;
				span {
					width: 100upx;
					text-align-last: justify;
					margin-right: 30upx;
					font-weight: bold;
					color: #000;
				}
				input {
					width: 300upx;
					background-color: #e6f3f9;
					padding: 8upx;
					padding-left: 20upx;
					border-radius: 15upx;
					// border: 2px solid transparent;
					&:focus {
						background-color: #000;
					}
				}
				
			}
			.user-gender {
				label {
					margin-right: 20upx;
				}
			}
		}
	
		.submit {
			width: 300upx;
			height: 70upx;
			line-height: 70upx;
			border-radius: 20upx;
			color: #fff;
			font-weight: bolder;
			margin-top: 50upx;
			text-align: center;
			background-color: #7dc0ff;
			background-image: linear-gradient(to right, #4553f5, #547cff);
		}
	}
</style>
