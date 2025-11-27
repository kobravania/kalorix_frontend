import { useQuery } from '@tanstack/react-query'
import { getStatsSummary } from '../api/stats'
import { useAuth } from '../context/AuthContext'

export const useStats = () => {
  const { token } = useAuth()
  return useQuery({
    queryKey: ['stats', 'summary'],
    queryFn: getStatsSummary,
    enabled: Boolean(token),
  })
}

