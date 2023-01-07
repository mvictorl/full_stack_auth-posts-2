export default function authHeader() {
	const currentUser = localStorage.getItem('user')
	const user = currentUser ? JSON.parse(currentUser) : null

	if (user && user.accessToken) {
		return { 'x-access-token': user.accessToken } // for Node.js Express back-end
	} else {
		return {}
	}
}