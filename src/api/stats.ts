import { apiClient } from './client'
import { USE_API_MOCKS } from '../utils/env'
import { mockStats } from '../utils/mockData'
import { StatsSummary } from '../types/api'

export const getStatsSummary = async (): Promise<StatsSummary> => {
  if (USE_API_MOCKS) {
    await new Promise((resolve) => setTimeout(resolve, 120))
    return mockStats()
  }

  const { data } = await apiClient.get<StatsSummary>('/stats/summary')
  return data
}

