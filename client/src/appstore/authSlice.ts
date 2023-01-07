import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { IUser } from '../models/IUser'

import { setMessage, clearMessage } from './messageSlice'
import { AuthService } from '../services/auth.service'
import { IRootState } from './store'

// Initial Auth State
const initialState = {
  currentUser: {} as IUser,
}

// const AuthUser = localStorage.getItem('user')
// const currentUser = AuthUser ? JSON.parse(AuthUser) as IUser : {} as IUser

type loginProps = {
  email: string
  password: string
  rememberMe: boolean
}
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password, rememberMe }: loginProps, { dispatch, rejectWithValue }) => {
    dispatch(setMessage('Begin login API connection'))
    try {
      const data = await AuthService.login(email, password)
      dispatch(setMessage('Login API connection done'))

      if (!data.user || !data.accessToken) throw Error('Server error on Login')
      else {
        if (rememberMe) localStorage.setItem('bearer-token', data.accessToken)
        return { currentUser: data.user }
      }

    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      dispatch(setMessage(message))
      return rejectWithValue(error)
    } finally {
      dispatch(clearMessage())
    }
  }
)

type registerProps = {
  username: string
  email: string
  password: string
  passwordConfirm: string
}
export const register = createAsyncThunk(
  "auth/register",
  async ({ username, email, password, passwordConfirm }: registerProps, { dispatch, rejectWithValue }) => {
    try {
      const data = await AuthService.register(username, email, password, passwordConfirm)
      // thunkAPI.dispatch(setMessage(data.message))
      if (!data.user || !data.accessToken) throw Error('Server error on Login')
      else {
        // localStorage.setItem('bearer-token', data.accessToken)        
        return { currentUser: data.user }
      }
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      dispatch(setMessage(message))
      return rejectWithValue(error)
    }
  }
)

export const logout = createAsyncThunk(
  "auth/logout",
  async () => {
    try {
      await AuthService.logout()
    } catch (error) {
      console.error(error)
    }
  })

export const check = createAsyncThunk(
  "auth/check",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const data = await AuthService.check()

      if (!data.user || !data.accessToken) throw Error('Server error on Login')
      else {
        localStorage.setItem('bearer-token', data.accessToken)
        return { currentUser: data.user }
      }
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      dispatch(setMessage(message))
      return rejectWithValue(error)
    }
  }
)

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // builder.addCase(register.pending, state => {})
    // builder.addCase(register.rejected, (state, action) => {
    //   state.isAuth = false
    // })
    // builder.addCase(register.fulfilled, (state, action) => {
    //   state.isAuth = true
    // })
    builder.addCase(login.pending, () => {
      console.log('Auth pending')
    })
    builder.addCase(login.rejected, (state) => {
      state.currentUser = {} as IUser
    })
    builder.addCase(login.fulfilled, (state, action) => {
      state.currentUser = action.payload.currentUser
    })
    builder.addCase(check.fulfilled, (state, action) => {
      state.currentUser = action.payload.currentUser
    })
    builder.addCase(logout.pending, (state) => {
      state.currentUser = {} as IUser
      localStorage.removeItem('bearer-token')
    })
    // builder.addCase(logout.fulfilled, (state, action) => {})
  }
})

export default authSlice.reducer
export const authState = (store: IRootState) => store.auth
