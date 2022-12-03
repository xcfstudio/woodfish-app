const setToken = (tokenType: 'access'|'refresh', token: string) => {
	return new Promise((resolve, reject) => {
		uni.setStorage({
			key: tokenType+'Token',
			data: token,
			success: result => {
				resolve(result)
			},
			fail: err => {
				reject(err)
			}
		})
	})
}

export {setToken}