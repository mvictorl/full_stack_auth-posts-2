const postService = require('../services/post-service')

class PostController {
	async getAllPosts(req, res, next) {
		try {
			const allPosts = res.json(await postService.getAllPosts())
			return allPosts
		} catch (e) {
			next(e)
		}
	}

	async getOnePost(req, res, next) {
		try {
			return res.json(await postService.getOnePostById(req.params.id))
		} catch (e) {
			next(e)
		}
	}
}

module.exports = postCtrl = new PostController()
