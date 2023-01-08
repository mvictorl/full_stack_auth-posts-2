import { $api } from "../http"
import { IAuthResponse } from "../models/IAuthResponse"

async function login(email: string, password: string, remember: boolean): Promise<IAuthResponse> {
  const response = await $api.post('/user/login', { email, password, remember })
  return response.data
}

async function register(username: string, email: string, password: string, passwordConfirm: string): Promise<IAuthResponse> {
  const response = await $api.post("/user/registration", { username, email, password, passwordConfirm })
  return response.data
}

async function logout(): Promise<IAuthResponse> {
  const response = await $api.post('/user/logout')
  return response.data
}

async function check(): Promise<IAuthResponse> {
  const response = await $api.get('/user/check')
  return response.data
}

async function activate(code: string): Promise<IAuthResponse> {
  const response = await $api.patch('/user/activate/', { code })
  return response.data
}

export const AuthService = {
  register,
  login,
  logout,
  check,
  activate,
}
