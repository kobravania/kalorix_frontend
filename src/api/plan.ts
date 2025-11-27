import dayjs from 'dayjs'
import { apiClient } from './client'
import { USE_API_MOCKS } from '../utils/env'
import { buildMockPlan } from '../utils/mockData'
import { DailyPlan } from '../types/api'

export const getPlanByDate = async (date: string): Promise<DailyPlan> => {
  if (USE_API_MOCKS) {
    await new Promise((resolve) => setTimeout(resolve, 150))
    return buildMockPlan(date)
  }

  const { data } = await apiClient.get<DailyPlan>(`/plan/${date}`)
  return data
}

export const generatePlan = async (date = dayjs().format('YYYY-MM-DD')) => {
  if (USE_API_MOCKS) {
    return buildMockPlan(date)
  }

  const { data } = await apiClient.post<DailyPlan>('/plan/generate', { date })
  return data
}

