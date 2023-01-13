import axios from 'axios'
import { IAuthResponse } from '../models/IAuthResponse'

// const API_URL: string = process.env.REACT_APP_API_URL || ''
const API_URL: string = process.env.REACT_APP_API_URL || ''
const SELF_URL: string = process.env.REACT_APP_SELF_URL || ''

export const $api = axios.create({
	withCredentials: true,
	baseURL: API_URL,
})

$api.interceptors.request.use(config => {
	axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('bearer-token')}`
	return config
})

$api.interceptors.response.use(
	res => res,
	async err => {
		const origRequest = err.config
		if (
			err.response.status === 401 &&
			origRequest &&
			!origRequest._isRetry
		) {
			origRequest._isRetry = true
			try {
				const res = await axios.get<IAuthResponse>(`${API_URL}/user/refresh`, {
					withCredentials: true,
				})
				if (res.data.accessToken) {
					localStorage.setItem('bearer-token', res.data.accessToken)
					return $api(origRequest)
				} else {
					localStorage.removeItem('bearer-token')
				}
				return $api(origRequest)
			} catch (e) {
				console.error('USER NOT AUTHORIZE', e)
				localStorage.removeItem('bearer-token')
			}
		}
		localStorage.removeItem('bearer-token')
		if (err.response.status !== 422) window.location.href = SELF_URL
		return Promise.reject(err)
	}
)
