import { apiClient } from './client'
import { USE_API_MOCKS } from '../utils/env'
import { mockUserProfile } from '../utils/mockData'
import { UserProfile, Goal } from '../types/api'

export type RegisterUserPayload = {
  userId: string
  firstName: string
  lastName?: string
  age: number
  weight: number
  height: number
  activity: 'low' | 'medium' | 'high'
  goal: Goal
}

export const getUserProfile = async (): Promise<UserProfile> => {
  if (USE_API_MOCKS) {
    await new Promise((resolve) => setTimeout(resolve, 200))
    return mockUserProfile
  }

  const { data } = await apiClient.get<UserProfile>('/user')
  return data
}

export const registerUser = async (
  payload: RegisterUserPayload,
): Promise<UserProfile> => {
  if (USE_API_MOCKS) {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return {
      ...mockUserProfile,
      ...payload,
      id: payload.userId,
      targetCalories: 2000,
      macrosTarget: { protein: 150, fats: 65, carbs: 250 },
    }
  }

  const { data } = await apiClient.post<UserProfile>('/user/register', payload)
  return data
}

