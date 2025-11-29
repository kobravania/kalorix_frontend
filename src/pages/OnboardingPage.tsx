import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppLayout } from '../components/layout/AppLayout'
import { authorizeWithTelegram } from '../api/auth'
import { useAuth } from '../context/AuthContext'

export const OnboardingPage = () => {
  const navigate = useNavigate()
  const { setUser } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Получаем initData из Telegram WebApp
  const getInitData = (): string => {
    const telegramApp = window.Telegram?.WebApp
    if (telegramApp?.initData) {
      return telegramApp.initData
    }
    // Fallback для разработки (мок-данные)
    return 'mock_init_data_for_development'
  }

  const handleStart = async () => {
    setLoading(true)
    setError(null)

    try {
      const initData = getInitData()
      
      // Отправляем initData на бэкенд
      const { user, created } = await authorizeWithTelegram(initData)

      // Сохраняем данные пользователя в контекст
      setUser(user)

      if (created) {
        // Пользователь только что создан - переходим на регистрацию для заполнения данных
        navigate('/registration')
      } else {
        // Пользователь уже существует - переходим в профиль
        navigate('/profile')
      }
    } catch (err: any) {
      const errorMessage = err.message || 'Ошибка при авторизации. Попробуйте снова.'
      setError(errorMessage)
      console.error('Ошибка авторизации:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AppLayout>
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="rounded-3xl bg-white/10 backdrop-blur-sm p-8 text-center max-w-md w-full border border-white/20">
          <h1 className="text-4xl font-bold mb-4 text-white">Kalorix</h1>
          <p className="text-base mb-8 text-gray-300">Telegram Mini App для питания</p>
          {error && (
            <div className="text-red-400 text-sm mb-4 bg-red-500/20 p-3 rounded-xl">
              {error}
            </div>
          )}
          <button
            onClick={handleStart}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-2xl font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors w-full"
          >
            {loading ? 'Проверка...' : 'Начать'}
          </button>
        </div>
      </div>
    </AppLayout>
  )
}

