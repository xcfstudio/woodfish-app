const logout = (tag?: 'out') => {
		
		uni.removeStorageSync('refreshToken')
		uni.removeStorageSync('accessToken')
		if (tag && tag==='out') {
			uni.showToast({
				icon:'error',
				title:"登陆过期"
			})
		}
		uni.showToast({
			icon:'success',
			title:"已退登"
		})
		
		
}

export default logout