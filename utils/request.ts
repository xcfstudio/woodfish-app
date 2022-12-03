import appConfig from "../config/appConfig"
import {getHeaderToken} from "./getToken"

interface RequestOptions {
	url: string
	data?: object|string|ArrayBuffer
	method?: 'OPTIONS'|'GET'|'HEAD'|'POST'|'PUT'|'DELETE'|'TRACE'|'CONNECT'
	header?: Object
	token?: 'access'|'refresh'
}

const request = async (options: RequestOptions) => {
	let headerToken = {}
	if (options.token) {
		headerToken = await getHeaderToken(options.token)
	}
	return new Promise((resolve, reject) => {
		uni.request({
			url: appConfig.baseUrl+options.url,
			data: options.data,
			method: options.method || 'GET',
			header: {...options.header, ...headerToken},
			success: result => {
				if (result.statusCode !== 200) {
					reject(result)
				} else {
					resolve(result.data)
				}
				
			},
			fail: result => {
				reject(result)
			}
		})
	})
}

export default request