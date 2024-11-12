import { create } from 'zustand'

interface User {
  id: string
  username: string
  name: string
  threads_biography: string
  threads_profile_picture_url: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  accessToken: string | null
  tokenExpiry: number | null
  setUser: (user: User | null) => void
  setToken: (token: string, expiry: number) => void
  clearAuth: () => void
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  accessToken: null,
  tokenExpiry: null,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setToken: (token, expiry) => set({ accessToken: token, tokenExpiry: expiry }),
  clearAuth: () => set({ user: null, isAuthenticated: false, accessToken: null, tokenExpiry: null })
})) 