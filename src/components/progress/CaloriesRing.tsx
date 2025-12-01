type CaloriesRingProps = {
  consumed: number
  target: number
}

export const CaloriesRing = ({ consumed, target }: CaloriesRingProps) => {
  const ratio = target > 0 ? Math.min(1, consumed / target) : 0
  const radius = 50
  const circle = 2 * Math.PI * radius
  const stroke = ratio * circle
  const percentage = Math.round(ratio * 100)
  
  // Градиент от синего к зеленому
  const gradientId = 'caloriesGradient'
  const color = ratio > 0.7 ? '#30D158' : ratio > 0.4 ? '#5AC8FA' : '#4A90E2'

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <svg width="160" height="160" viewBox="0 0 160 160" className="drop-shadow-lg">
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4A90E2" />
              <stop offset="50%" stopColor="#5AC8FA" />
              <stop offset="100%" stopColor="#30D158" />
            </linearGradient>
          </defs>
          {/* Фоновый круг с тенью */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="12"
          />
          {/* Заполненный круг */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={`${stroke} ${circle - stroke}`}
            transform="rotate(-90 80 80)"
            style={{
              filter: 'drop-shadow(0 0 8px rgba(74, 144, 226, 0.5))',
              transition: 'stroke-dasharray 0.5s ease-in-out'
            }}
          />
          {/* Текст в центре */}
          <text
            x="80"
            y="70"
            textAnchor="middle"
            className="text-2xl font-bold fill-white"
            style={{ fontFamily: 'system-ui, -apple-system' }}
          >
            {consumed}
          </text>
          <text
            x="80"
            y="95"
            textAnchor="middle"
            className="text-sm fill-white/60"
            style={{ fontFamily: 'system-ui, -apple-system' }}
          >
            / {target} ккал
          </text>
        </svg>
      </div>
    </div>
  )
}


