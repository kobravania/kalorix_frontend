import { Link } from 'react-router-dom'
import { AppLayout } from '../components/layout/AppLayout'
import { CaloriesRing } from '../components/progress/CaloriesRing'
import { useStats } from '../hooks/useStats'
import { useAuth } from '../context/AuthContext'

const mainMenuItems = [
  { icon: '📋', to: '/menu' },
  { icon: '➕', to: '/add-food' },
  { icon: '📊', to: '/stats' },
  { icon: '👤', to: '/profile' },
  { icon: '🏠', to: '/home' },
]

const toolsItems = [
  { icon: '🔧', to: '#' },
  { icon: '⚙️', to: '#' },
  { icon: '🛠️', to: '#' },
]

export const HomePage = () => {
  const { user } = useAuth()
  const { data: stats } = useStats()
  
  const consumedCalories = stats?.kcalConsumed || 0
  const targetCalories = user?.targetCalories || stats?.kcalTarget || 2000

  return (
    <AppLayout paddingTop={false}>
      <div className="flex flex-col h-screen relative overflow-hidden">
        {/* Верхняя часть с диаграммой справа */}
        <div className="flex justify-end pr-4 pt-6">
          <CaloriesRing consumed={consumedCalories} target={targetCalories} />
        </div>

        {/* Основной контент */}
        <div className="flex-1 flex items-center justify-center relative min-h-0">
          {/* Кнопки слева */}
          <div className="absolute left-4 flex flex-col gap-3 z-10">
            {mainMenuItems.map((item, index) => (
              <Link
                key={item.to}
                to={item.to}
                className="w-16 h-16 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-2xl border border-white/20 transition-colors flex-shrink-0"
              >
                {item.icon}
              </Link>
            ))}
          </div>

          {/* Аватар по центру (смайлик человека в полный рост) */}
          <div className="text-8xl sm:text-9xl md:text-[12rem]">
            🧍
          </div>
        </div>

        {/* Инструменты снизу */}
        <div className="flex justify-center gap-3 pb-4 flex-shrink-0">
          {toolsItems.map((item, index) => (
            <Link
              key={index}
              to={item.to}
              className="w-16 h-16 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-2xl border border-white/20 transition-colors flex-shrink-0"
            >
              {item.icon}
            </Link>
          ))}
        </div>
      </div>
    </AppLayout>
  )
}

