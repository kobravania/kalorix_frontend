import { apiClient } from './client'
import { USE_API_MOCKS } from '../utils/env'
import { FoodLogPayload } from '../types/api'

export const logFoodEntry = async (payload: FoodLogPayload) => {
  if (USE_API_MOCKS) {
    await new Promise((resolve) => setTimeout(resolve, 200))
    return { success: true }
  }

  const { data } = await apiClient.post('/log', payload)
  return data
}

