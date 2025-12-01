import { Link } from 'react-router-dom'
import { AppLayout } from '../components/layout/AppLayout'
import { CaloriesRing } from '../components/progress/CaloriesRing'
import { useStats } from '../hooks/useStats'
import { useAuth } from '../context/AuthContext'

const leftMenuItems = [
  { icon: '➕', to: '/add-food', title: 'Добавить еду', description: 'Запись приема пищи. Подсчет калорий. Учет макронутриентов.' },
  { icon: '📊', to: '/stats', title: 'Статистика', description: 'Прогресс за день, неделю, месяц. Графики и аналитика.' },
]

export const HomePage = () => {
  const { user } = useAuth()
  const { data: stats } = useStats()
  
  const consumedCalories = stats?.kcalConsumed || 0
  const targetCalories = user?.targetCalories || stats?.kcalTarget || 2000

  return (
    <AppLayout paddingTop={false}>
      <div className="flex flex-col h-screen relative overflow-hidden bg-gradient-to-b from-[#0A1B2E] via-[#0F2537] to-[#05060A]">
        {/* Основной контент - две колонки */}
        <div className="flex-1 flex relative min-h-0 px-6 pt-8 pb-8">
          {/* Левая колонка - кнопки */}
          <div className="flex-1 flex flex-col gap-4 pr-4">
            {/* Первая кнопка - ИИ рацион (активная) */}
            <Link
              to="/menu"
              className="w-32 h-32 rounded-2xl overflow-hidden relative group active:scale-95 transition-all duration-200 flex-shrink-0 shadow-xl border-2 border-white/30"
              style={{
                background: 'linear-gradient(135deg, rgba(74, 144, 226, 0.5), rgba(90, 200, 250, 0.5), rgba(48, 209, 88, 0.5))',
                boxShadow: '0 8px 32px rgba(74, 144, 226, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
              }}
            >
              {/* Фоновый паттерн с едой */}
              <div 
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.3) 2px, transparent 2px), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.3) 2px, transparent 2px), radial-gradient(circle at 50% 50%, rgba(255,255,255,0.2) 3px, transparent 3px)',
                  backgroundSize: '30px 30px, 25px 25px, 40px 40px'
                }}
              />
              {/* Иконки еды в фоне */}
              <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <div className="text-6xl">🍽️</div>
              </div>
              {/* Контент */}
              <div className="relative h-full flex flex-col items-center justify-center p-3 z-10">
                <div className="text-3xl mb-1 drop-shadow-lg">🤖</div>
                <div className="text-white text-xs font-semibold text-center leading-tight drop-shadow-md">
                  ИИ рацион
                </div>
              </div>
            </Link>
            
            {/* Описание под первой кнопкой */}
            <div className="w-32 mt-1">
              <p className="text-[10px] text-gray-400 leading-tight text-center">
                Рацион на день, неделю, месяц. Список продуктов. Составление блюда.
              </p>
            </div>

            {/* Остальные кнопки */}
            {leftMenuItems.map((item, index) => (
              <div key={item.to} className="flex flex-col gap-1">
                <Link
                  to={item.to}
                  className="w-32 h-32 rounded-2xl overflow-hidden relative group active:scale-95 transition-all duration-200 flex-shrink-0 shadow-xl border border-white/10 hover:border-white/20 bg-white/8 backdrop-blur-xl hover:bg-white/15"
                  style={{
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <div className="relative h-full flex flex-col items-center justify-center p-3">
                    <div className="text-4xl mb-2">{item.icon}</div>
                    <div className="text-white text-xs font-semibold text-center leading-tight">
                      {item.title}
                    </div>
                  </div>
                </Link>
                {/* Описание под кнопкой */}
                <div className="w-32 mt-1">
                  <p className="text-[10px] text-gray-400 leading-tight text-center">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Правая колонка - диаграмма и эмодзи */}
          <div className="flex-1 flex flex-col items-center justify-center gap-8 pl-4">
            {/* Диаграмма сверху */}
            <div className="flex-shrink-0">
              <CaloriesRing consumed={consumedCalories} target={targetCalories} />
            </div>

            {/* Эмодзи снизу с подиумом и анимацией */}
            <div className="flex flex-col items-center justify-center flex-shrink-0">
              {/* Подиум */}
              <div 
                className="w-40 h-5 rounded-full mb-3 opacity-60"
                style={{
                  background: 'linear-gradient(90deg, rgba(74, 144, 226, 0.3), rgba(90, 200, 250, 0.3), rgba(48, 209, 88, 0.3))',
                  boxShadow: '0 2px 10px rgba(74, 144, 226, 0.3)',
                  animation: 'podiumGlow 3s ease-in-out infinite'
                }}
              />
              {/* Эмодзи с анимацией вращения - увеличенный */}
              <div 
                className="text-[12rem] select-none"
                style={{
                  animation: 'gentleRotate 20s linear infinite',
                  filter: 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.3))',
                  transformStyle: 'preserve-3d',
                  lineHeight: '1'
                }}
              >
                🧍
              </div>
            </div>
          </div>
        </div>

        {/* CSS анимации */}
        <style>{`
          @keyframes gentleRotate {
            0% {
              transform: rotateY(0deg) translateY(0px) scale(1);
            }
            25% {
              transform: rotateY(8deg) translateY(-3px) scale(1.02);
            }
            50% {
              transform: rotateY(0deg) translateY(0px) scale(1);
            }
            75% {
              transform: rotateY(-8deg) translateY(-3px) scale(1.02);
            }
            100% {
              transform: rotateY(0deg) translateY(0px) scale(1);
            }
          }
          
          @keyframes podiumGlow {
            0%, 100% {
              opacity: 0.5;
              transform: scaleX(1);
              box-shadow: 0 2px 10px rgba(74, 144, 226, 0.3);
            }
            50% {
              opacity: 0.8;
              transform: scaleX(1.08);
              box-shadow: 0 4px 20px rgba(90, 200, 250, 0.5);
            }
          }
        `}</style>
      </div>
    </AppLayout>
  )
}

