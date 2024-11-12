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
  setUser: (user: User | null) => void
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
})) 