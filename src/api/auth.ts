import { apiClient } from './client'
import { USE_API_MOCKS } from '../utils/env'
import type { UserProfile } from '../types/api'

export type TelegramAuthResponse = {
  user: UserProfile
  created: boolean // true если пользователь создан (201), false если существует (200)
}

/**
 * Авторизация через Telegram initData
 * Отправляет initData на бэкенд и получает данные пользователя
 * @param initData - строка initData из Telegram WebApp
 * @returns Данные пользователя и флаг created
 */
export const authorizeWithTelegram = async (
  initData: string,
): Promise<TelegramAuthResponse> => {
  if (USE_API_MOCKS) {
    // Мок для разработки
    await new Promise((resolve) => setTimeout(resolve, 500))
    return {
      user: {
        id: '1',
        firstName: 'Тест',
        lastName: 'Пользователь',
        age: 25,
        weight: 70,
        height: 175,
        activity: 'medium',
        goal: 'maintain',
        targetCalories: 2000,
        macrosTarget: { protein: 150, fats: 65, carbs: 250 },
      },
      created: false,
    }
  }

  try {
    const response = await apiClient.post<UserProfile>('/auth/telegram', {
      initData,
    })

    // Определяем, был ли пользователь создан по статус коду
    const created = response.status === 201

    return {
      user: response.data,
      created,
    }
  } catch (error: any) {
    // Обрабатываем ошибки от бэкенда
    if (error.response?.status === 403) {
      throw new Error('Неверная подпись initData')
    }
    if (error.response?.status === 400) {
      throw new Error('initData обязателен')
    }
    throw error
  }
}

