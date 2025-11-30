import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppLayout } from '../components/layout/AppLayout'
import { registerUser, RegisterUserPayload } from '../api/user'
import { useAuth } from '../context/AuthContext'

type RegistrationStep = 'gender' | 'height' | 'birthdate' | 'weight'

export const RegistrationPage = () => {
  const navigate = useNavigate()
  const { user, setUser } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [step, setStep] = useState<RegistrationStep>('gender')

  // Получаем ID пользователя из Telegram
  const getUserId = (): string => {
    const telegramApp = window.Telegram?.WebApp
    if (telegramApp?.initDataUnsafe?.user?.id) {
      return String(telegramApp.initDataUnsafe.user.id)
    }
    // Fallback для разработки
    return `user_${Date.now()}`
  }

  const [formData, setFormData] = useState<{
    userId: string
    gender?: 'male' | 'female'
    height?: number
    birthdate?: string
    weight?: number
    activity: 'low' | 'medium' | 'high'
    goal: 'loss' | 'maintain' | 'gain'
  }>({
    userId: getUserId(),
    gender: undefined,
    height: undefined,
    birthdate: undefined,
    weight: undefined,
    activity: 'medium',
    goal: 'maintain',
  })

  const calculateAge = (birthdate: string): number => {
    const today = new Date()
    const birth = new Date(birthdate)
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--
    }
    return age
  }

  const handleNext = () => {
    setError(null)
    if (step === 'gender' && formData.gender) {
      setStep('height')
    } else if (step === 'height' && formData.height) {
      setStep('birthdate')
    } else if (step === 'birthdate' && formData.birthdate) {
      setStep('weight')
    } else if (step === 'weight' && formData.weight) {
      handleSubmit()
    }
  }

  const handleSubmit = async () => {
    if (!formData.gender || !formData.height || !formData.birthdate || !formData.weight) {
      setError('Пожалуйста, заполните все поля')
      return
    }

    setError(null)
    setLoading(true)

    try {
      const age = calculateAge(formData.birthdate)
      const firstName = user?.firstName || window.Telegram?.WebApp?.initDataUnsafe?.user?.first_name || 'Пользователь'
      const lastName = user?.lastName || window.Telegram?.WebApp?.initDataUnsafe?.user?.last_name

      const payload: RegisterUserPayload = {
        userId: formData.userId,
        firstName,
        lastName,
        age,
        weight: formData.weight!,
        height: formData.height!,
        activity: formData.activity,
        goal: formData.goal,
      }

      const registeredUser = await registerUser(payload)
      setUser(registeredUser)
      navigate('/home')
    } catch (err) {
      setError('Ошибка регистрации. Попробуйте снова.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const renderStep = () => {
    switch (step) {
      case 'gender':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center mb-8">Ваш пол?</h2>
            <div className="space-y-3">
              <button
                onClick={() => {
                  setFormData({ ...formData, gender: 'male' })
                  setTimeout(() => handleNext(), 300)
                }}
                className={`w-full px-6 py-4 rounded-2xl border text-lg transition-colors ${
                  formData.gender === 'male'
                    ? 'bg-blue-500 border-blue-500 text-white'
                    : 'bg-white/10 border-white/20'
                }`}
              >
                Мужской
              </button>
              <button
                onClick={() => {
                  setFormData({ ...formData, gender: 'female' })
                  setTimeout(() => handleNext(), 300)
                }}
                className={`w-full px-6 py-4 rounded-2xl border text-lg transition-colors ${
                  formData.gender === 'female'
                    ? 'bg-blue-500 border-blue-500 text-white'
                    : 'bg-white/10 border-white/20'
                }`}
              >
                Женский
              </button>
            </div>
          </div>
        )

      case 'height':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center mb-8">Ваш рост (см)?</h2>
            <input
              type="number"
              min="100"
              max="250"
              value={formData.height || ''}
              onChange={(e) => setFormData({ ...formData, height: Number(e.target.value) })}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && formData.height) {
                  handleNext()
                }
              }}
              className="w-full px-6 py-4 rounded-2xl bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-2xl"
              placeholder="175"
              autoFocus
            />
            <button
              onClick={handleNext}
              disabled={!formData.height}
              className="w-full bg-blue-500 text-white py-4 rounded-2xl font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Далее
            </button>
          </div>
        )

      case 'birthdate':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center mb-8">Дата рождения?</h2>
            <input
              type="date"
              value={formData.birthdate || ''}
              onChange={(e) => setFormData({ ...formData, birthdate: e.target.value })}
              max={new Date().toISOString().split('T')[0]}
              className="w-full px-6 py-4 rounded-2xl bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
              autoFocus
            />
            <button
              onClick={handleNext}
              disabled={!formData.birthdate}
              className="w-full bg-blue-500 text-white py-4 rounded-2xl font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Далее
            </button>
          </div>
        )

      case 'weight':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center mb-8">Ваш вес (кг)?</h2>
            <input
              type="number"
              min="30"
              max="200"
              step="0.1"
              value={formData.weight || ''}
              onChange={(e) => setFormData({ ...formData, weight: Number(e.target.value) })}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && formData.weight) {
                  handleSubmit()
                }
              }}
              className="w-full px-6 py-4 rounded-2xl bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-2xl"
              placeholder="70"
              autoFocus
            />
            <button
              onClick={handleSubmit}
              disabled={!formData.weight || loading}
              className="w-full bg-blue-500 text-white py-4 rounded-2xl font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Регистрация...' : 'Завершить'}
            </button>
          </div>
        )
    }
  }

  return (
    <AppLayout>
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="rounded-3xl bg-white/10 backdrop-blur-sm p-8 max-w-md w-full border border-white/20">
          {error && (
            <div className="text-red-400 text-sm mb-4 bg-red-500/20 p-3 rounded-xl text-center">
              {error}
            </div>
          )}
          {renderStep()}
        </div>
      </div>
    </AppLayout>
  )
}

