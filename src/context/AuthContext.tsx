import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { authorizeWithTelegram } from '../api/auth'
import { getUserProfile } from '../api/user'
import { setAuthToken } from '../api/client'
import type { UserProfile } from '../types/api'

const TOKEN_STORAGE_KEY = 'kalorix_token'

type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'error'

type AuthContextValue = {
  token: string | null
  user: UserProfile | null
  status: AuthStatus
  error: string | null
  authenticate: (initData?: string) => Promise<void>
  setUser: (user: UserProfile) => void
  logout: () => void
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem(TOKEN_STORAGE_KEY),
  )
  const [user, setUser] = useState<UserProfile | null>(null)
  const [status, setStatus] = useState<AuthStatus>('idle')
  const [error, setError] = useState<string | null>(null)

  const persistToken = useCallback((nextToken: string | null) => {
    setToken(nextToken)
    if (nextToken) {
      localStorage.setItem(TOKEN_STORAGE_KEY, nextToken)
    } else {
      localStorage.removeItem(TOKEN_STORAGE_KEY)
    }
    setAuthToken(nextToken)
  }, [])

  const refreshProfile = useCallback(async () => {
    if (!token) return
    try {
      const profile = await getUserProfile()
      setUser(profile)
      setStatus('authenticated')
      setError(null)
    } catch (err) {
      console.error('Не удалось загрузить профиль', err)
      setStatus('error')
      setError('Ошибка загрузки профиля')
    }
  }, [token])

  const authenticate = useCallback(
    async (initData?: string) => {
      try {
        setStatus('loading')
        const telegramInitData =
          initData ?? window.Telegram?.WebApp?.initData ?? 'mock_init_data'
        const { user: userData } = await authorizeWithTelegram(telegramInitData)
        // Сохраняем пользователя напрямую (бэкенд не возвращает токен)
        setUser(userData)
        setStatus('authenticated')
        setError(null)
      } catch (err) {
        console.error('Авторизация не удалась', err)
        setStatus('error')
        setError('Не удалось авторизоваться через Telegram')
        throw err
      }
    },
    [],
  )

  const setUserData = useCallback((userData: UserProfile) => {
    setUser(userData)
    setStatus('authenticated')
    setError(null)
  }, [])

  const logout = useCallback(() => {
    persistToken(null)
    setUser(null)
    setStatus('idle')
  }, [persistToken])

  useEffect(() => {
    if (token) {
      setAuthToken(token)
      setStatus('loading')
      refreshProfile()
    } else {
      setAuthToken(null)
    }
  }, [token, refreshProfile])

  const value = useMemo<AuthContextValue>(
    () => ({
      token,
      user,
      status,
      error,
      authenticate,
      setUser: setUserData,
      logout,
      refreshProfile,
    }),
    [token, user, status, error, authenticate, setUserData, logout, refreshProfile],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth должен использоваться внутри AuthProvider')
  }
  return ctx
}

export { AuthContext }

