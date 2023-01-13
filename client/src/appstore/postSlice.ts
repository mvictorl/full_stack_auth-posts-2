import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import { PostService } from '../services/post.service'
import { IPost } from '../models/IPost'

import { IRootState } from './store'
import { IComment } from '../models/IComment'

// Initial Auth State
const initialState = {
  posts: [] as IPost[],
  viewPost: {} as IPost,
  commentsByParentId: [] as IComment[]
}

export const fetchAllPosts = createAsyncThunk(
  "post/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const data = await PostService.fetchAllPosts()
      if (data.length < 1) throw Error('Server error on fetch posts')
      return { posts: data }
    } catch (error: any) {
      // const message =
      //   (error.response &&
      //     error.response.data &&
      //     error.response.data.message) ||
      //   error.message ||
      //   error.toString()
      return rejectWithValue(error)
    } finally {
    }
  }
)

type fetchPostsByIdProps = {
  id: string
}
export const fetchPostsById = createAsyncThunk(
  "post/getOne",
  async ({ id }: fetchPostsByIdProps, { rejectWithValue }) => {
    try {
      const data = await PostService.fetchPostById(id)
      return { viewPost: data }
    } catch (error: any) {
      // const message =
      //   (error.response &&
      //     error.response.data &&
      //     error.response.data.message) ||
      //   error.message ||
      //   error.toString()
      return rejectWithValue(error)
    } finally {
    }
  }
)

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllPosts.pending, state => {
      // console.log('Post pending')
    })
    builder.addCase(fetchAllPosts.rejected, (state, action) => {
      console.log('Post rejected')
    })
    builder.addCase(fetchAllPosts.fulfilled, (state, action) => {
      // console.log(action.payload.posts)
      state.posts = action.payload.posts
    })
    builder.addCase(fetchPostsById.pending, () => {
    })
    builder.addCase(fetchPostsById.rejected, (state) => {
      state.viewPost = {} as IPost
    })
    builder.addCase(fetchPostsById.fulfilled, (state, action) => {
      state.viewPost = action.payload.viewPost

      const group = {} as any
      action.payload.viewPost.comments.forEach((comment: IComment) => {
        group[comment.parentId] ||= [] as IComment[]
        group[comment.parentId].push(comment)
      })
      state.commentsByParentId = group

    })
    // builder.addCase(check.fulfilled, (state, action) => {
    //   state.currentUser = action.payload.currentUser
    // })
    // builder.addCase(logout.pending, (state) => {
    //   state.currentUser = {} as IUser
    //   localStorage.removeItem('bearer-token')
    // })
    // builder.addCase(logout.fulfilled, (state, action) => {})
  }
})

export default postSlice.reducer

export const selectAllPosts = (state: IRootState) => state.post.posts

// export const getPostById = (state: IRootState, id: string) => state.post.posts.find(post => post.id === id)
export const getPostById = (state: IRootState) => state.post.viewPost

export const getCommentsByParent = (state: IRootState) => state.post.commentsByParentId

/** From https://redux.js.org/tutorials/essentials/part-6-performance-normalization
export const selectAllPosts = (store: IRootStore) => store.post.posts

export const selectPostById = (store: IRootStore, postId: string) =>
  store.post.posts.find(post => post.id === postId)

export const selectPostsByUser = createSelector(
  [selectAllPosts, (store, userId) => userId],
  (posts, userId) => posts.filter(post => post.user === userId)
) */