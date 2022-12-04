import {defineStore} from 'pinia'

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
			}
		}
	}
})

export {
	UserInfo
}