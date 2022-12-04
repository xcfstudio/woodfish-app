<template>
	<view class="container">
		<view class="board">
			<view class="title">
				留言板
			</view>
			<view class="issue">
				<textarea v-model="textarea" class="ta" placeholder="此处输入留言内容:" maxlength="500"></textarea>
				<view class="counter">{{totalLength}}/500</view>
			</view>
		</view>
		
		<view class="board">
			<view class="title">
				联系方式
			</view>
			<input v-model="telNum" type="text" class="tel" placeholder="手机号">
			<input v-model="qqNum" type="text" class="qq" placeholder="QQ号">
		</view>
		
		<view class="submit-btn" @click="submit">
			提交
		</view>
	</view>
</template>

<script lang="ts">
import { ref, watch } from "vue"
import { debounce } from "../../utils/debounce"
import { isLogin } from "../../utils/isLogin"
import request from "../../utils/request"
	export default {
		setup() {
			const textarea = ref('')
			const telNum = ref('')
			const qqNum = ref('')
			const totalLength = ref(0)
			
			// 统计字数
			const computeAndSetLength = () => {
				totalLength.value = textarea.value.length
			}
			// 防抖
			const _debounce = debounce(computeAndSetLength, 2000)
			watch(textarea, () => {
				_debounce()
			})
			
			// 提交表单
			const submit = async () => {
				if (textarea.value.length === 0) {
					uni.showModal({
						content: '提交内容不可为空，请填写内容后再提交。'
					})
					return
				}
				try{
					uni.showLoading({
						title: '提交中'
					})
					const res: any = await request({
						url: '/api/feedback/issue',
						method: "POST",
						token: 'access',
						data: {
							issue: textarea.value,
							telNumber: telNum.value,
							qqNumber: qqNum.value
						}
					})
					if (res.code === 200) {
						uni.hideLoading()
						uni.showToast({
							icon: 'success',
							title: "提交成功"
						})
						setTimeout(()=>{
							uni.navigateBack()
						}, 500)
						
					}
				}catch(e){
					uni.showToast({
						icon: 'error',
						title: '网络错误'
					})
					console.log(e);
				}
			}
			
			
			return {
				textarea,
				telNum,
				qqNum,
				totalLength,
				computeAndSetLength,
				submit
			}
		},
		onShow() {
			if (!isLogin()) {
				uni.showModal({
					content: "请先登陆",
					success(res) {
						if (res.confirm) {
							uni.navigateTo({
								url: '../login/login'
							})
						}
						if (res.cancel) {
							uni.navigateBack()
						}
						
					}
				})
				
			}
		}
	}
</script>

<style lang="less" scoped>
	.container {
		// height: 100%;
		background-color: #f6f6f6;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		.board {
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			// background-color: #f3f3f3;
			padding: 20upx;
			padding-top: 50upx;
			// margin-top: 30upx;

			.title {
				text-align: left;
				width: 650upx;
				margin-bottom: 20upx;
				// background-color: #ff6769;
			}

			.issue {
				box-sizing: border-box;
				width: 650upx;
				border-radius: 20upx;
				padding: 20upx;
				height: 340upx;
				font-size: 30upx;
				background-color: #fff;
				.ta {
					height: 270upx;
					&:focus {
						background-color: #2029da;
					}
				}
				.counter {
					font-size: 25upx;
					padding-right: 20upx;
					text-align: right;
				}
				
			}
			
			.tel, .qq {
				box-sizing: border-box;
				width: 650upx;
				height: 80upx;
				background-color: #fff;
				border-radius: 20upx;
				padding: 0 20upx;
				font-size: 30upx;
				margin-bottom: 25upx;
			}
		}
		
		.submit-btn {
			position: absolute;
			width: 250upx;
			height: 60upx;
			line-height: 60upx;
			border-radius: 30upx;
			text-align: center;
			left: 50%;
			transform: translate(-50%);
			bottom: 60upx;
			background-image: linear-gradient( -135deg, #6B73FF 10%, #2631ff 100%);
			color: #fff;
			&:active {
				background-image: linear-gradient( -135deg, #5b61da 10%, #2029da 100%);
			}
		}
	}
</style>
