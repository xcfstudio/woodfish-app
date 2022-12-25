<template>
	<view>
		<button @click="isLogin">同步测试refreshToken</button>
		
		<button @click="clearStorage">清空Storage</button>
		
		<button @click="pullInfo">测试info</button>
		
		<view class="info">
			info区：
			{{info}}
		</view>
	</view>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import {isLogin} from '../../utils/isLogin'
import request from '../../utils/request';
const clearStorage = () => {
	uni.clearStorage()
}

const info = ref('')

const pullInfo = async () => {
	const res = await request({
		url: '/api/gongde/woodfish/basicinfo',
		method: 'GET',
		token: 'access'
	})
	// console.log(res);
	const s = JSON.stringify(res)
	info.value = s
	
}

</script>

<style lang="less" scoped>
.info {
	width: 600upx;
	height: 500upx;
}
</style>
