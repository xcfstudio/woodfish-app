<template>
	<view>
		<view class="list">
			<view class="item" v-for="item in dataArr" :id="item.uid">
				<view class="number">
					{{item.ranking}}
				</view>
				<view class="user">
					<image :src="item.avatar" mode=""></image>
					<view class="username">
						{{item.username}}
					</view>
				</view>
				<view class="score">
					{{item.score}}
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">


	import { defineComponent, PropType } from 'vue'
	export default defineComponent({
		name:"ranking",
		setup() {
						
			return {
				
			}
		},
		props: {
			dataArr: Array as PropType<any>
		}
	})
</script>

<style lang="less" scoped>
.list {
	padding: 0 40upx;
	.item {
		display: flex;
		align-items: center;
		padding: 20upx 0;
		justify-content: space-between;
		border-bottom: 1px solid #eeeeee;
		
		.user {
			display: flex;
			align-items: center;
			width: 450upx;
			// background-color: beige;
			image {
				width: 90upx;
				height: 90upx;
				border-radius: 45upx;
				margin-right: 25upx;
			}
			
		}
		
		.number, .score {
			font-weight: bolder;
			font-size: 40upx;
			color: #404040;
		}
	}
}
</style>