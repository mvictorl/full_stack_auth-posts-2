const db = require('../db')
const ApiError = require('../extensions/api-error')

class PostService {
	async getPosts() {
		try {
			return await db.post.findMany({
				select: {
					id: true,
					title: true,
					body: true,
					createdAt: true,
					author: {
						select: {
							id: true,
							name: true,
						},
					},
				},
			})
		} catch (e) {
			console.error('DB Error')
			throw ApiError.DataBaseError('DB Error', e)
		}
	}

	async getPost(id) {
		try {
			return await db.post.findUnique({
				where: { id },
				select: {
					id: true,
					title: true,
					body: true,
					createdAt: true,
					author: {
						select: {
							id: true,
							name: true,
						},
					},
				},
			})
		} catch (e) {
			console.error('DB Error')
			throw ApiError.DataBaseError('DB Error', e)
		}
	}
}

module.exports = new PostService()
