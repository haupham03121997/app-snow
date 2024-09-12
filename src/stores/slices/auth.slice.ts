import { StateCreator } from 'zustand'

import { CurrentUser } from '@interfaces/user.interface'
import { getLocalStorage, removeLocalStorage, setLocalStorage } from '@utils'

type AuthState = {
  currentUser: CurrentUser | null
  token: string | null
}

type AuthActions = {
  setCurrentUser: (user: CurrentUser) => void
  setToken: (token: string) => void
  logout: () => void
}

export type AuthStore = AuthState & AuthActions

const initialState: AuthState = {
  currentUser: getLocalStorage<CurrentUser>('currentUser'),
  token: getLocalStorage('token')
}

const userSlice: StateCreator<AuthStore> = (set) => {
  return {
    ...initialState,
    setCurrentUser: (currentUser: CurrentUser) => {
      setLocalStorage('currentUser', currentUser)
      set({ currentUser })
    },
    setToken: (token: string) => {
      setLocalStorage('token', token)
      set({ token })
    },
    logout: () => {
      set({ currentUser: null })
      removeLocalStorage('currentUser')
    }
  }
}

export default userSlice
