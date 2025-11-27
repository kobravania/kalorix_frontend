import { apiClient } from './client'
import { USE_API_MOCKS } from '../utils/env'

export type TelegramAuthResponse = {
  token: string
}

export const authorizeWithTelegram = async (
  initData: string,
): Promise<TelegramAuthResponse> => {
  if (USE_API_MOCKS) {
    return { token: `demo-token-${initData.length}` }
  }

  const { data } = await apiClient.post<TelegramAuthResponse>('/auth/telegram', {
    initData,
  })
  return data
}

