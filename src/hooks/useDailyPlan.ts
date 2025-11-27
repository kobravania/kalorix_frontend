import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { getPlanByDate } from '../api/plan'
import { useAuth } from '../context/AuthContext'

export const planQueryKey = (date: string) => ['daily-plan', date]

export const useDailyPlan = (date = dayjs().format('YYYY-MM-DD')) => {
  const { token } = useAuth()

  return useQuery({
    queryKey: planQueryKey(date),
    queryFn: () => getPlanByDate(date),
    enabled: Boolean(token),
  })
}

