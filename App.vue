<script>
import { intervalRefreshToken, refreshToken } from './utils/refreshToken'
import {UserInfo} from './store/index'
import request from './utils/request'
	export default {
		setup(){
			const userInfoStore = UserInfo()
			return {
				userInfoStore
			}
		},
		onLaunch: async function() {
			console.log('App Launch')
			const r = await refreshToken()
			if (r) {
				this.userInfoStore.loginState = true
			}
			intervalRefreshToken()
			const checkUpdate = await request({
				url: '/api/feedback/checkupdate',
				method: 'POST',
				data: {
					version: '1.0.0',
					platform: 'android'
				}
			})
			if (checkUpdate.code===200 && checkUpdate.data.update) {
				uni.showModal({
					content: '有新版本，是否更新？',
					success: (option) => {
						if (option.confirm) {
							uni.navigateTo({
								url: '/pages/checkUpdate/checkUpdate?auto=1'
							})
						}
					}
				})
			}
			
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	* {
		font-family: -apple-system,
		BlinkMacSystemFont,
		"Segoe UI",
		"Roboto",
		"Oxygen",
		"Ubuntu",
		"Cantarell",
		"Fira Sans",
		"Droid Sans",
		"Helvetica Neue",
		sans-serif;
	}
	
	@font-face {
	  font-family: 'iconfont';
	  src: url('static/iconfont/iconfont.woff2?t=1670057584831') format('woff2'),
	       url('static/iconfont/iconfont.woff?t=1670057584831') format('woff'),
	       url('static/iconfont/iconfont.ttf?t=1670057584831') format('truetype');
	}
	
	.iconfont {
	  font-family: "iconfont" !important;
	  font-size: 16px;
	  font-style: normal;
	  -webkit-font-smoothing: antialiased;
	  -moz-osx-font-smoothing: grayscale;
	}
	
	 /* page {
	        display: flex;
	        flex-direction: column;
	        height: 100%;
	    } */
</style>
