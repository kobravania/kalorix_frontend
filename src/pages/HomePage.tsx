import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import { AppLayout } from '../components/layout/AppLayout'
import { PageHeader } from '../components/layout/PageHeader'
import { ProgressPlate } from '../components/progress/ProgressPlate'
import { useAuth } from '../context/AuthContext'
import { useDailyPlan } from '../hooks/useDailyPlan'
import { useStats } from '../hooks/useStats'

const quickActions = [
  { title: 'Меню на день', to: '/menu' },
  { title: 'Добавить еду', to: '/add-food' },
  { title: 'Статистика', to: '/stats' },
  { title: 'Профиль', to: '/profile' },
]

export const HomePage = () => {
  const today = dayjs().format('YYYY-MM-DD')
  const { user } = useAuth()
  const { data: plan } = useDailyPlan(today)
  const { data: stats } = useStats()

  const macrosCurrent = stats?.macros ?? plan?.totals.macros ?? {
    protein: 0,
    fats: 0,
    carbs: 0,
  }

  return (
    <AppLayout>
      <PageHeader
        title={`Привет, ${user?.firstName ?? 'гость'}`}
        subtitle={dayjs(today).format('DD MMMM YYYY')}
      />

      <ProgressPlate
        calories={stats?.kcalConsumed ?? plan?.totals.calories ?? 0}
        target={stats?.kcalTarget ?? user?.targetCalories ?? 0}
        macros={macrosCurrent}
        macrosTarget={user?.macrosTarget ?? macrosCurrent}
      />

      <section className="grid grid-cols-2 gap-3">
        {quickActions.map((action) => (
          <Link
            key={action.to}
            to={action.to}
            className="glass-panel rounded-3xl p-4 text-center text-sm font-medium text-text-primary"
          >
            {action.title}
          </Link>
        ))}
      </section>
    </AppLayout>
  )
}

