import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppLayout } from '../components/layout/AppLayout'
import { ChoiceCard } from '../components/common/ChoiceCard'
import { PrimaryButton } from '../components/ui/PrimaryButton'
import { useAuth } from '../context/AuthContext'
import { Goal } from '../types/api'
import { TELEGRAM_BOT_NAME } from '../utils/env'

const goalOptions: Array<{ id: Goal; title: string; description: string }> = [
  { id: 'loss', title: 'Похудение', description: 'Дефицит калорий −15%' },
  { id: 'maintain', title: 'Поддержание', description: 'Баланс калорий' },
  { id: 'gain', title: 'Набор', description: 'Профицит калорий +10%' },
]

export const OnboardingPage = () => {
  const [selectedGoal, setSelectedGoal] = useState<Goal>('loss')
  const { authenticate, status } = useAuth()
  const navigate = useNavigate()

  const handleStart = async () => {
    try {
      await authenticate()
      navigate('/')
    } catch {
      // Ошибка уже отображается в контексте
    }
  }

  return (
    <AppLayout>
      <div className="glass-panel rounded-3xl p-6 text-center shadow-card">
        <p className="text-sm text-brand">Kalorix</p>
        <h1 className="mt-2 text-3xl font-semibold text-text-primary">
          Telegram Mini App для питания
        </h1>
        <p className="mt-3 text-base text-text-secondary">
          Выберите цель, подключите {TELEGRAM_BOT_NAME} и получите персональное меню.
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-sm uppercase tracking-[0.2em] text-text-secondary">
          Цель
        </h2>
        {goalOptions.map((goal) => (
          <ChoiceCard
            key={goal.id}
            title={goal.title}
            description={goal.description}
            active={goal.id === selectedGoal}
            onClick={() => setSelectedGoal(goal.id)}
          />
        ))}
      </section>

      <section className="glass-panel rounded-3xl p-4 text-sm text-text-secondary">
        <p>Флоу авторизации:</p>
        <ol className="mt-2 list-decimal space-y-1 pl-5">
          <li>Telegram передаёт initData при запуске mini app</li>
          <li>Отправляем initData на /auth/telegram</li>
          <li>Сохраняем токен и загружаем профиль</li>
        </ol>
      </section>

      <PrimaryButton loading={status === 'loading'} onClick={handleStart}>
        Начать
      </PrimaryButton>
    </AppLayout>
  )
}

