// const db = require('../db')

const jwt = require('jsonwebtoken')

class TokenService {
	generatePairOfTokens(payload) {
		try {
			const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
				algorithm: 'HS256',
				expiresIn: '10s',
			})
			const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
				algorithm: 'HS256',
				expiresIn: '30m',
			})

			return {
				accessToken,
				refreshToken,
			}
		} catch (e) {
			console.error('Token service error')
			throw ApiError.BadRequest('Token service error', e)
		}
	}

	async saveToken(userId, refreshToken) {
		try {
			// ONE token on one user!!!
			const tokenData = await db.token.findUnique({
				where: { userId: userId },
				select: {
					id: true,
					refreshToken: true,
				},
			})

			if (tokenData) {
				return await db.token.update({
					where: { id: tokenData.id },
					data: { refreshToken },
					select: { refreshToken: true },
				})
			}

			return await db.token.create({
				data: {
					userId: userId,
					refreshToken,
				},
				select: {
					refreshToken: true,
				},
			})
		} catch (e) {
			console.error('DB Error')
			throw ApiError.DataBaseError('DB Error', e)
		}
	}

	// Todo: refreshToken id ?
	async removeToken(refreshToken) {
		try {
			return await db.token.deleteMany({
				where: { refreshToken },
			})
		} catch (e) {
			console.error('DB Error')
			throw ApiError.DataBaseError('DB Error', e)
		}
	}

	async findToken(refreshToken) {
		try {
			return await db.token.findUnique({
				where: { refreshToken },
				select: {
					id: true,
					refreshToken: true,
				},
			})
		} catch (e) {
			console.error('DB Error')
			throw ApiError.DataBaseError('DB Error', e)
		}
	}

	async validateAccessToken(accessToken) {
		try {
			return await jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET)
		} catch (e) {
			return null
		}
	}

	async validateRefreshToken(refreshToken) {
		try {
			return await jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
		} catch (e) {
			return null
		}
	}
}

module.exports = new TokenService()
