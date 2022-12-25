import {defineStore} from 'pinia'
import { isLogin } from '../utils/isLogin'
import request from '../utils/request'

const UserInfo = defineStore('userInfo', {
	state: () => {
		return {
			loginState: false,
			avatar: '../../static/grey-avatar.svg',
			gongdeInfo: {
				data: {
					todayScore: 0,
					totalScore: 0,
					todayRanking: 0,
					totalRanking: 0,
					username: '未登陆',
					uid: '--',
				}
			},
			gongdeCache: 0
		}
	},
	actions: {
		async pullGongdeInfo() {
			this.loginState = isLogin()
			try{
				if (!this.loginState) {
					uni.showToast({
						icon: 'error',
						title: '请登录'
					})
					return 
				}
				const res:any = await request({
					url: '/api/gongde/woodfish/basicinfo',
					method: 'GET',
					token: 'access'
				})
				this.gongdeInfo.data = res.data
				// console.log('已更新', res);
				uni.stopPullDownRefresh()
			}catch(e){
				//TODO handle the exception
				uni.showToast({
					icon: 'error',
					title: "刷新失败"
				})
			}
		},
		async pullAvatar() {
			try{
				if (this.loginState) {
					const res: any = await request({
						url: '/api/users/information/avatar',
						method: 'GET',
						token: 'access'
					})
					if (res.data.avatar) {
						this.avatar = res.data.avatar
						return
					}
				}
				uni.showToast({
					icon: 'error',
					title: '未登陆'
				})
			}catch(e){
				//TODO handle the exception
				uni.showToast({
					icon: 'error',
					title: '网络错误'
				})
			}
	}
		
	},
	
	
	
})

export {
	UserInfo
}