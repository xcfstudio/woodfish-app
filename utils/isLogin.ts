// 判断用户是否登陆

const isLogin = () => {
	const refreshToken = uni.getStorageSync('refreshToken')
	if (refreshToken && refreshToken.length !== 0) {
		return true
	} else {
		return false
	}
}

export {
	isLogin
}