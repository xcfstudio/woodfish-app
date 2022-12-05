<template>
	<view>
		<view class="list">
			<view class="item" v-for="item in testData" :id="item.uid">
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
	export default {
		name:"ranking",
		setup() {
			const testData = [
				{
					uid: "2344113412",
					username: "大魔王",
					score: 456,
					ranking: 1,
					avatar: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.huabanimg.com%2F2dbbc9177be8b9912b2a0d881200dd47ccb84d92710aa-IepOs1_fw658&refer=http%3A%2F%2Fhbimg.huabanimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1672842495&t=c58f0fff0ecdc5c74f2b84c7ea34d877"
				},
				{
					uid: "2345113412",
					username: "大魔王",
					score: 456,
					ranking: 2,
					avatar: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.huabanimg.com%2F2dbbc9177be8b9912b2a0d881200dd47ccb84d92710aa-IepOs1_fw658&refer=http%3A%2F%2Fhbimg.huabanimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1672842495&t=c58f0fff0ecdc5c74f2b84c7ea34d877"
				},
				{
					uid: "2344116312",
					username: "大魔王",
					score: 456,
					ranking: 3,
					avatar: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.huabanimg.com%2F2dbbc9177be8b9912b2a0d881200dd47ccb84d92710aa-IepOs1_fw658&refer=http%3A%2F%2Fhbimg.huabanimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1672842495&t=c58f0fff0ecdc5c74f2b84c7ea34d877"
				},
				{
					uid: "3744113412",
					username: "大魔王",
					score: 456,
					ranking: 4,
					avatar: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.huabanimg.com%2F2dbbc9177be8b9912b2a0d881200dd47ccb84d92710aa-IepOs1_fw658&refer=http%3A%2F%2Fhbimg.huabanimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1672842495&t=c58f0fff0ecdc5c74f2b84c7ea34d877"
				},
				{
					uid: "2344178102",
					username: "大魔王",
					score: 456,
					ranking: 5,
					avatar: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.huabanimg.com%2F2dbbc9177be8b9912b2a0d881200dd47ccb84d92710aa-IepOs1_fw658&refer=http%3A%2F%2Fhbimg.huabanimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1672842495&t=c58f0fff0ecdc5c74f2b84c7ea34d877"
				},
				{
					uid: "2340013412",
					username: "大魔王",
					score: 456,
					ranking: 6,
					avatar: null
				},
				{
					uid: "2354113412",
					username: "大魔王",
					score: 456,
					ranking: 7,
					avatar: null
				},
				{
					uid: "2154113412",
					username: "大魔王",
					score: 456,
					ranking: 8,
					avatar: null
				},
				{
					uid: "2155413412",
					username: "大魔王",
					score: 456,
					ranking: 8,
					avatar: null
				},
				{
					uid: "2154177412",
					username: "大魔王",
					score: 456,
					ranking: 8,
					avatar: null
				},
			]
			
			return {
				testData
			}
		}
	}
</script>

<style lang="less" scoped>
.list {
	padding: 0 40upx;
	.item {
		display: flex;
		align-items: center;
		padding: 20upx 0;
		justify-content: space-between;
		border-bottom: 1px solid #f9f9f9;
		
		.user {
			display: flex;
			align-items: center;
			width: 400upx;
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