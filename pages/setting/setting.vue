<template>
	<view>
		<view class="setting">
			<view class="list">
				<view v-if="loginstate" class="item" @click="navgateToChangePwd">
					修改密码
				</view>
				<view class="item night-mode">
					<view class="left">
						<span>用户体验计划</span>
					</view>
					<view class="right">
						<switch style="transform: scale(0.7);" @change="handleSwitchChangeSyncNightModel" :checked="syncNightMode"></switch>
					</view>
				</view>
			</view>
			<view class="logout" @click="logout" v-if="loginstate">
				退出登陆
			</view>
		</view>
	</view>
</template>

<script lang="ts">
import { ref } from "vue"
import { isLogin } from "../../utils/isLogin"
	export default {
		setup() {
			const loginstate = ref(false)
			const syncNightMode = ref(true)
			
			const handleSwitchChangeSyncNightModel = (e: any) => {
				setSyncNightMode(e.detail.value)
				console.log('switch changed', e.detail.value);
			}
			const setSyncNightMode = (value: boolean) => {
				uni.setStorage({
					key: 'SyncNightMode',
					data: value
				})
			}
			const logout = () => {
				uni.clearStorage()
				uni.navigateBack()
				
			}
			
			// ---------NAVGATE---------
			const navgateToChangePwd = () => {
				uni.navigateTo({
					url: '/pages/changePassword/changePassword'
				})
			}
			return {
					logout, loginstate, syncNightMode, handleSwitchChangeSyncNightModel, navgateToChangePwd
				}
		},
		onShow() {
			this.loginstate = isLogin()
		}
	}
</script>

<style lang="less" scoped>
 .setting {
	 display: flex;
	 flex-direction: column;
	 align-items: center;
	 .list {
		 padding: 50upx;
		 .item {
			 
			 width: 650upx;
			 padding: 15upx 0;
			 border-bottom: 1px solid #f2f2f2;
		 }
		 
		 .night-mode {
			 display: flex;
			 justify-content: space-between;
		 }
	 }
	 .logout {
		 width: 300upx;
		 height: 60upx;
		 line-height: 60upx;
		 text-align: center;
		 border-radius: 15upx;
		 border: 1px solid #ff7b7d;
		 background-color: #ffe6e6;
		 color: #782526;
	 }
 }
</style>
