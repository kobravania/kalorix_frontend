import { AppLayout } from '../components/layout/AppLayout'
import { PageHeader } from '../components/layout/PageHeader'
import { ProgressPlate } from '../components/progress/ProgressPlate'
import { useAuth } from '../context/AuthContext'
import { useStats } from '../hooks/useStats'

export const StatsPage = () => {
  const { data } = useStats()
  const { user } = useAuth()

  return (
    <AppLayout>
      <PageHeader title="Статистика" subtitle="Данные за последние 7 дней" />

      {data ? (
        <ProgressPlate
          calories={data.kcalConsumed}
          target={data.kcalTarget}
          macros={data.macros}
          macrosTarget={user?.macrosTarget ?? data.macros}
        />
      ) : (
        <p className="text-text-secondary">Нет данных для отображения.</p>
      )}

      <section className="glass-panel rounded-3xl p-4 shadow-card">
        <p className="text-sm text-text-secondary">История веса и калорий</p>
        <div className="mt-3 space-y-2">
          {data?.history.map((item) => (
            <div key={item.date} className="flex items-center justify-between text-sm">
              <span>{item.date}</span>
              <span>{item.calories} ккал</span>
            </div>
          ))}
        </div>
      </section>
    </AppLayout>
  )
}

