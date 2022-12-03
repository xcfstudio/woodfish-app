/**
 * 异步获取本地token缓存
 */
const getToken = (type: 'access'|'refresh' = 'access') => {
	return new Promise((resolve, reject) => {
		uni.getStorage({
			key: type+'Token',
			success: value => {
				resolve(value.data)
			},
			fail: err => {
				reject(err)
			}
		})
	})
}

/**
 * 获取Header格式的token
 */
const getHeaderToken = async (type: 'access'|'refresh' = 'access') => {
	const token = await getToken(type)
	return {
		Authorization: `Bearer ${token}`
	}
}

export {
	getToken, getHeaderToken
}