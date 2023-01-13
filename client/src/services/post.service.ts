import { $api } from "../http"
import { IPost } from "../models/IPost"

async function fetchAllPosts(): Promise<IPost[]> {
  const response = await $api.get('/posts')
  return response.data
}

async function fetchPostById(id: string): Promise<IPost> {
  const response = await $api.get(`/posts/${id}`)
  return response.data
}

export const PostService = {
  fetchAllPosts,
  fetchPostById,
}