import { Link } from 'react-router-dom'
import { AppLayout } from '../components/layout/AppLayout'

const quickActions = [
  { title: 'Меню на день', to: '/menu' },
  { title: 'Добавить еду', to: '/add-food' },
  { title: 'Статистика', to: '/stats' },
  { title: 'Профиль', to: '/profile' },
]

export const HomePage = () => {
  return (
    <AppLayout>
      <h1 className="text-2xl font-bold mb-4">Главная</h1>
      <div className="grid grid-cols-2 gap-3">
        {quickActions.map((action) => (
          <Link
            key={action.to}
            to={action.to}
            className="bg-white/10 rounded-2xl p-4 text-center text-sm font-medium"
          >
            {action.title}
          </Link>
        ))}
      </div>
    </AppLayout>
  )
}

