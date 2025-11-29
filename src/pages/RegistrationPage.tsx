import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppLayout } from '../components/layout/AppLayout'
import { registerUser, RegisterUserPayload } from '../api/user'
import { useAuth } from '../context/AuthContext'
import { Goal } from '../types/api'

const goalOptions: Array<{ id: Goal; title: string }> = [
  { id: 'loss', title: 'Похудение' },
  { id: 'maintain', title: 'Поддержание' },
  { id: 'gain', title: 'Набор' },
]

const activityOptions: Array<{ id: 'low' | 'medium' | 'high'; title: string }> = [
  { id: 'low', title: 'Низкая' },
  { id: 'medium', title: 'Средняя' },
  { id: 'high', title: 'Высокая' },
]

export const RegistrationPage = () => {
  const navigate = useNavigate()
  const { authenticate } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Получаем ID пользователя из Telegram
  const getUserId = (): string => {
    const telegramApp = window.Telegram?.WebApp
    if (telegramApp?.initDataUnsafe?.user?.id) {
      return String(telegramApp.initDataUnsafe.user.id)
    }
    // Fallback для разработки
    return `user_${Date.now()}`
  }

  const [formData, setFormData] = useState<RegisterUserPayload>({
    userId: getUserId(),
    firstName: '',
    lastName: '',
    age: 25,
    weight: 70,
    height: 175,
    activity: 'medium',
    goal: 'maintain',
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      await registerUser(formData)
      // После регистрации авторизуем пользователя
      await authenticate()
      navigate('/profile')
    } catch (err) {
      setError('Ошибка регистрации. Попробуйте снова.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AppLayout>
      <h1 className="text-2xl font-bold mb-2">Регистрация</h1>
      <p className="text-gray-500 mb-6">Заполните данные для создания профиля</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Имя *</label>
          <input
            type="text"
            required
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
            className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ваше имя"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Фамилия</label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
            className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ваша фамилия"
          />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-sm font-medium mb-2">Возраст *</label>
            <input
              type="number"
              required
              min="10"
              max="100"
              value={formData.age}
              onChange={(e) =>
                setFormData({ ...formData, age: Number(e.target.value) })
              }
              className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Вес (кг) *</label>
            <input
              type="number"
              required
              min="30"
              max="200"
              step="0.1"
              value={formData.weight}
              onChange={(e) =>
                setFormData({ ...formData, weight: Number(e.target.value) })
              }
              className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Рост (см) *</label>
            <input
              type="number"
              required
              min="100"
              max="250"
              value={formData.height}
              onChange={(e) =>
                setFormData({ ...formData, height: Number(e.target.value) })
              }
              className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Активность *</label>
          <div className="grid grid-cols-3 gap-2">
            {activityOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() =>
                  setFormData({ ...formData, activity: option.id })
                }
                className={`px-4 py-2 rounded-xl border transition-colors ${
                  formData.activity === option.id
                    ? 'bg-blue-500 border-blue-500 text-white'
                    : 'bg-white/10 border-white/20'
                }`}
              >
                {option.title}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Цель *</label>
          <div className="space-y-2">
            {goalOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setFormData({ ...formData, goal: option.id })}
                className={`w-full px-4 py-3 rounded-xl border text-left transition-colors ${
                  formData.goal === option.id
                    ? 'bg-blue-500 border-blue-500 text-white'
                    : 'bg-white/10 border-white/20'
                }`}
              >
                {option.title}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}

        <button
          type="submit"
          disabled={loading || !formData.firstName}
          className="w-full bg-blue-500 text-white py-3 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Регистрация...' : 'Зарегистрироваться'}
        </button>
      </form>
    </AppLayout>
  )
}

