import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  isAuthenticated: boolean
  user: {
    email: string
    name: string
  } | null
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ email: string; password: string }>) => {
      state.isAuthenticated = true
      state.user = {
        email: action.payload.email,
        name: action.payload.email.split('@')[0],
      }
    },
    demoLogin: (state) => {
      state.isAuthenticated = true
      state.user = {
        email: 'demo@storyapp.com',
        name: 'Demo User',
      }
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.user = null
    },
  },
})

export const { login, demoLogin, logout } = authSlice.actions
export const selectAuth = (state: { auth: AuthState }) => state.auth
export default authSlice.reducer
