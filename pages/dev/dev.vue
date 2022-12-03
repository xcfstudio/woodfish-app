<template>
	<view>
		<button @click="isLogin">同步测试refreshToken</button>
		
		<button @click="clearStorage">清空Storage</button>
	</view>
</template>

<script lang="ts" setup>
import {isLogin} from '../../utils/isLogin'
const clearStorage = () => {
	uni.clearStorage()
}

</script>

<style lang="less" scoped>

</style>
