import { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { LoadingScreen } from '../components/common/LoadingScreen'

type RequireAuthProps = {
  children: ReactNode
}

export const RequireAuth = ({ children }: RequireAuthProps) => {
  const { token, status } = useAuth()
  const location = useLocation()

  if (status === 'loading') {
    return <LoadingScreen message="Проверяем авторизацию..." />
  }

  if (!token) {
    return <Navigate to="/onboarding" replace state={{ from: location }} />
  }

  return <>{children}</>
}

