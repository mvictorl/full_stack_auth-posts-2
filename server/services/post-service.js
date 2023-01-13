const db = require('../db')
const ApiError = require('../extensions/api-error')

class PostService {
	async getAllPosts() {
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
					_count: {
						select: {
							comments: true,
							likes: true,
						}
					}
				},
			})
			// comments: {
			// 	select: {
			// 		_count: true
			// 	}
			// }

			// comments: {
			// 	orderBy: {
			// 		createdAt: 'desc',
			// 	},
			// 	select: {
			// 		id: true,
			// 		message: true,
			// 		createdAt: true,
			// 		user: {
			// 			select: {
			// 				id: true,
			// 				name: true,
			// 			}
			// 		},
			// 		parent: {
			// 			select: {
			// 				id: true,
			// 			}
			// 		},
			// 		children: {
			// 			select: {
			// 				id: true,
			// 			}
			// 		},
			// 	},
			// }
			// likes: {
			// 	select: {
			// 		_count: {
			// 			select: {
			// 				likes: {
			// 					where: { post }
			// 				}
			// 			}
			// 		}
			// 	},
			// }
			// },
			// })
		} catch (e) {
			console.error('DB Error')
			throw ApiError.DataBaseError('DB Error', e)
		}
	}

	async getOnePostById(id) {
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
					comments: {
						orderBy: {
							createdAt: "desc",
						},
						select: {
							id: true,
							message: true,
							user: {
								select: {
									id: true,
									name: true,
								},
							},
							createdAt: true,
							parentId: true,
							// children: {
							// 	select: { id: true },
							// },
							likes: true,
						},
					},
					likes: {
						select: {
							user: {
								select: {
									id: true
								}
							}
						}
					}
				},
			})
		} catch (e) {
			console.error('DB Error')
			throw ApiError.DataBaseError('DB Error', e)
		}
	}
}

module.exports = new PostService()
