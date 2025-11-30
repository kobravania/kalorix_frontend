import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppLayout } from '../components/layout/AppLayout'
import { authorizeWithTelegram } from '../api/auth'
import { useAuth } from '../context/AuthContext'

type OnboardingStep = 'welcome' | 'license'

export const OnboardingPage = () => {
  const navigate = useNavigate()
  const { setUser } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [step, setStep] = useState<OnboardingStep>('welcome')
  const [licenseAccepted, setLicenseAccepted] = useState(false)

  // Получаем initData из Telegram WebApp
  const getInitData = (): string => {
    const telegramApp = window.Telegram?.WebApp
    if (telegramApp?.initData) {
      return telegramApp.initData
    }
    // Fallback для разработки (мок-данные)
    return 'mock_init_data_for_development'
  }

  // Автоматическая аутентификация при загрузке страницы
  useEffect(() => {
    const authenticate = async () => {
      setLoading(true)
      setError(null)

      try {
        const initData = getInitData()
        const { user, created } = await authorizeWithTelegram(initData)
        setUser(user)

        if (!created) {
          // Пользователь уже зарегистрирован - сразу на главное меню
          navigate('/home')
        }
        // Если пользователь новый, остаемся на странице онбординга
      } catch (err: any) {
        const errorMessage = err.message || 'Ошибка при авторизации. Попробуйте снова.'
        setError(errorMessage)
        console.error('Ошибка авторизации:', err)
      } finally {
        setLoading(false)
      }
    }

    authenticate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleStart = () => {
    setStep('license')
  }

  const handleContinue = () => {
    if (licenseAccepted) {
      navigate('/registration')
    }
  }

  if (step === 'license') {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="rounded-3xl bg-white/10 backdrop-blur-sm p-8 text-center max-w-md w-full border border-white/20">
            <h1 className="text-2xl font-bold mb-6 text-white">Лицензионное соглашение</h1>
            <div className="bg-white/5 rounded-xl p-6 mb-6 text-left min-h-[200px] max-h-[300px] overflow-y-auto">
              <p className="text-gray-300 text-sm">
                Здесь будет лицензионное соглашение
              </p>
            </div>
            <div className="flex items-center mb-6">
              <input
                type="checkbox"
                id="license"
                checked={licenseAccepted}
                onChange={(e) => setLicenseAccepted(e.target.checked)}
                className="w-5 h-5 rounded border-white/20 bg-white/10 text-blue-500 focus:ring-2 focus:ring-blue-500 mr-3"
              />
              <label htmlFor="license" className="text-sm text-gray-300 cursor-pointer">
                Я принимаю лицензионное соглашение
              </label>
            </div>
            <button
              onClick={handleContinue}
              disabled={!licenseAccepted}
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-2xl font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors w-full"
            >
              Продолжить
            </button>
          </div>
        </div>
      </AppLayout>
    )
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

