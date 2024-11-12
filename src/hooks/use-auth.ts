"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

interface User {
  id: string
  username: string
  name: string
  threads_profile_picture_url: string
  threads_biography: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  setUser: (user: User | null) => void
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
    }),
    {
      name: "auth-storage",
    }
  )
) 