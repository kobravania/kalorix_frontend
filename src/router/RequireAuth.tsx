import { ReactNode } from 'react'

type RequireAuthProps = {
  children: ReactNode
}

export const RequireAuth = ({ children }: RequireAuthProps) => {
  // Упрощённая версия - пропускает всех
  return <>{children}</>
}

