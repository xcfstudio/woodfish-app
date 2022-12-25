import { isLogin } from "./isLogin"
import logout from "./logout"
import request from "./request"
import { setToken } from "./setToken"

const refreshToken = async () => {
	if (isLogin()) {
		// const refreshToken = await getToken('refresh')
		const res  = await request({
			url: '/api/users/refresh',
			method: 'POST',
			token: 'refresh'
		}) as any
		
		if (res.code !== 200) {
			// console.log(res);
			logout('out')
			uni.switchTab({
				url: '../pages/mypage/mypage'
			})
			return false
		}
		
		
		
		const {accesstoken, refreshtoken} = res.data

		await Promise.all([
			setToken('access', accesstoken),
			setToken('refresh', refreshtoken)
		])
		// console.log('token is setted!')
		return true
	}
}

const intervalRefreshToken = () => {
	setInterval(() => {
		refreshToken()
	}, 1000 * 60 * 15)
}

export {
	refreshToken, intervalRefreshToken
}