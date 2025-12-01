import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppLayout } from '../components/layout/AppLayout'
import { authorizeWithTelegram } from '../api/auth'
import { useAuth } from '../context/AuthContext'

type OnboardingStep = 'welcome' | 'license'

export const OnboardingPage = () => {
  const navigate = useNavigate()
  const { setUser, user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [step, setStep] = useState<OnboardingStep>('welcome')
  const [licenseAccepted, setLicenseAccepted] = useState(false)
  const hasAuthenticated = useRef(false)

  // Получаем initData из Telegram WebApp
  const getInitData = (): string => {
    const telegramApp = window.Telegram?.WebApp
    if (telegramApp?.initData && telegramApp.initData !== 'mock_init_data') {
      return telegramApp.initData
    }
    // Fallback для разработки - реалистичные данные Telegram
    // Формат: user={JSON}&auth_date={timestamp}&hash={signature}
    const mockUser = {
      id: 123456789,
      first_name: 'Иван',
      last_name: 'Петров',
      username: 'ivan_petrov',
      language_code: 'ru',
    }
    const authDate = Math.floor(Date.now() / 1000)
    const userParam = encodeURIComponent(JSON.stringify(mockUser))
    // Реалистичный hash (в реальности это HMAC-SHA256 подпись)
    const mockHash = 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6'
    
    return `user=${userParam}&auth_date=${authDate}&hash=${mockHash}`
  }

  // Проверяем, если пользователь уже авторизован, перенаправляем
  useEffect(() => {
    if (user) {
      navigate('/home')
    }
  }, [user, navigate])

  const handleStart = async () => {
    // Предотвращаем множественные вызовы
    if (hasAuthenticated.current || loading) {
      return
    }

    hasAuthenticated.current = true
    setLoading(true)
    setError(null)

    try {
      // Отправляем фейковые данные на бэкенд
      const initData = getInitData()
      const { user: userData, created } = await authorizeWithTelegram(initData)
      
      setUser(userData)

      if (!created) {
        // Пользователь уже зарегистрирован - сразу на главное меню
        navigate('/home')
      } else {
        // Пользователь новый - показываем лицензионное соглашение
        setStep('license')
      }
    } catch (err: any) {
      hasAuthenticated.current = false // Разрешаем повторную попытку при ошибке
      const errorMessage = err.message || 'Ошибка при авторизации. Попробуйте снова.'
      setError(errorMessage)
      console.error('Ошибка авторизации:', err)
    } finally {
      setLoading(false)
    }
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

