import { apiClient } from './client'
import { USE_API_MOCKS } from '../utils/env'
import { mockUserProfile } from '../utils/mockData'
import { UserProfile } from '../types/api'

export const getUserProfile = async (): Promise<UserProfile> => {
  if (USE_API_MOCKS) {
    await new Promise((resolve) => setTimeout(resolve, 200))
    return mockUserProfile
  }

  const { data } = await apiClient.get<UserProfile>('/user')
  return data
}

