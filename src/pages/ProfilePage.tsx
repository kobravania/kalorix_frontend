import { AppLayout } from '../components/layout/AppLayout'
import { PageHeader } from '../components/layout/PageHeader'
import { PrimaryButton } from '../components/ui/PrimaryButton'
import { useAuth } from '../context/AuthContext'

const activityLabel: Record<string, string> = {
  low: 'Низкая',
  medium: 'Средняя',
  high: 'Высокая',
}

const goalLabel: Record<string, string> = {
  loss: 'Похудение',
  maintain: 'Поддержание',
  gain: 'Набор',
}

export const ProfilePage = () => {
  const { user, logout } = useAuth()

  if (!user) {
    return (
      <AppLayout>
        <PageHeader title="Профиль" />
        <p className="text-text-secondary">Профиль не найден.</p>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <PageHeader title="Профиль" subtitle="Параметры и цель" />

      <section className="glass-panel rounded-3xl p-5 shadow-card">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-text-secondary">Возраст</p>
            <p className="text-lg font-semibold text-text-primary">{user.age}</p>
          </div>
          <div>
            <p className="text-text-secondary">Вес</p>
            <p className="text-lg font-semibold text-text-primary">{user.weight} кг</p>
          </div>
          <div>
            <p className="text-text-secondary">Рост</p>
            <p className="text-lg font-semibold text-text-primary">{user.height} см</p>
          </div>
          <div>
            <p className="text-text-secondary">Активность</p>
            <p className="text-lg font-semibold text-text-primary">
              {activityLabel[user.activity] ?? user.activity}
            </p>
          </div>
        </div>
        <div className="mt-4 rounded-2xl bg-white/5 p-3 text-sm">
          <p className="text-text-secondary">Цель</p>
          <p className="text-lg font-semibold text-text-primary">
            {goalLabel[user.goal] ?? user.goal}
          </p>
          <p className="text-sm text-text-secondary">
            Целевые калории: {user.targetCalories} ккал
          </p>
        </div>
      </section>

      <PrimaryButton className="mt-auto" onClick={logout}>
        Выйти
      </PrimaryButton>
    </AppLayout>
  )
}

