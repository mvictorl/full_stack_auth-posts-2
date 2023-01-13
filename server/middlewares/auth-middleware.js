const ApiError = require('../extensions/api-error')
const tokenService = require('../services/token-service')

function checkCookies(req, res, next) {
	console.log('Check cookies middleware')
	try {
		const refreshToken = req.cookie.refreshToken
		if (!refreshToken) {
			return next(ApiError.RefreshTokenError())
		}
		if (tokenService.validateRefreshToken(refreshToken)) {
			res.clearCookie('refreshToken')
			return next(ApiError.RefreshTokenError())
		}
		return next()
	} catch (error) {
		return next(new Error('Bad cookie'))
	}
}

function authUser(req, res, next) {
	try {
		console.log('===== AuthUser Middleware start =====')
		const authHeader = req.headers.authorization

		if (!authHeader) {
			return next(ApiError.AuthHeaderError())
		}

		const accessTocken = authHeader.split(' ')[1]
		if (!accessTocken) {
			return next(ApiError.AccessTokenError())
		}

		const userData = tokenService.validateAccessToken(accessTocken)
		if (!userData) {
			return next(ApiError.ValidateAccessTockenError())
		}

		// if (!userData.isActivated) {
		// 	return next(ApiError.UserActivationError())
		// }

		req.user = userData
		console.log('===== AuthUser Middleware success end =====')
		next()
	} catch (e) {
		console.log('===== AuthUser Middleware failed end =====')
		return next(ApiError.UnauthorizedUserError())
	}
}

function checkPermission(role) {
	try {
		console.log('===== CheckPermission Middleware start =====')
		return (req, res, next) => {
			if (!req.user) {
				return next(ApiError.UnauthorizedUserError())
			}

			if (req.user.role !== role) {
				return next(ApiError.PermissionError())
			}
			console.log('===== CheckPermission Middleware success end =====')
			next()
		}
	} catch (e) {
		console.log('===== CheckPermission Middleware failed end =====')
		return next(ApiError.UnauthorizedUserError())
	}
}

module.exports = {
	authUser,
	checkPermission,
	checkCookies,
}
