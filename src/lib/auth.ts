'use client'

import { create } from 'zustand'

interface AuthState {
  user: { id: number; email: string; name: string } | null
  token: string | null
  isLoading: boolean
  isInitialized: boolean
  setUser: (user: { id: number; email: string; name: string } | null) => void
  setToken: (token: string | null) => void
  setLoading: (loading: boolean) => void
  setInitialized: (initialized: boolean) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null,
  isLoading: true,
  isInitialized: false,
  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),
  setLoading: (isLoading) => set({ isLoading }),
  setInitialized: (isInitialized) => set({ isInitialized }),
}))

export function getAuthHeaders(): Record<string, string> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null
  return token ? { 'x-admin-token': token } : {}
}

export async function signIn(email: string, password: string) {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })

  if (!res.ok) {
    const data = await res.json()
    throw new Error(data.error || 'Login gagal')
  }

  const data = await res.json()
  localStorage.setItem('admin_token', data.token)
  useAuthStore.getState().setToken(data.token)
  useAuthStore.getState().setUser(data.user)
  useAuthStore.getState().setLoading(false)
  useAuthStore.getState().setInitialized(true)
  return data
}

export async function signOut() {
  localStorage.removeItem('admin_token')
  useAuthStore.getState().setToken(null)
  useAuthStore.getState().setUser(null)
  useAuthStore.getState().setLoading(false)
  useAuthStore.getState().setInitialized(true)
}

export async function checkAuth() {
  const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null

  if (!token) {
    useAuthStore.getState().setUser(null)
    useAuthStore.getState().setLoading(false)
    useAuthStore.getState().setInitialized(true)
    return null
  }

  try {
    const res = await fetch('/api/auth/session', {
      headers: { 'x-admin-token': token },
    })

    if (!res.ok) {
      localStorage.removeItem('admin_token')
      useAuthStore.getState().setUser(null)
      useAuthStore.getState().setToken(null)
      useAuthStore.getState().setLoading(false)
      useAuthStore.getState().setInitialized(true)
      return null
    }

    const data = await res.json()
    useAuthStore.getState().setUser(data.user)
    useAuthStore.getState().setLoading(false)
    useAuthStore.getState().setInitialized(true)
    return data.user
  } catch {
    useAuthStore.getState().setUser(null)
    useAuthStore.getState().setLoading(false)
    useAuthStore.getState().setInitialized(true)
    return null
  }
}
