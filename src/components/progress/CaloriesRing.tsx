type CaloriesRingProps = {
  consumed: number
  target: number
}

export const CaloriesRing = ({ consumed, target }: CaloriesRingProps) => {
  const ratio = target > 0 ? Math.min(1, consumed / target) : 0
  const circle = 2 * Math.PI * 40
  const stroke = ratio * circle
  const percentage = Math.round(ratio * 100)

  return (
    <div className="flex flex-col items-center">
      <svg width="120" height="120" viewBox="0 0 120 120">
        {/* Фоновый круг */}
        <circle
          cx="60"
          cy="60"
          r="40"
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="8"
        />
        {/* Заполненный круг */}
        <circle
          cx="60"
          cy="60"
          r="40"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${stroke} ${circle - stroke}`}
          transform="rotate(-90 60 60)"
        />
        {/* Текст в центре */}
        <text
          x="60"
          y="50"
          textAnchor="middle"
          className="text-lg font-bold fill-white"
        >
          {consumed}
        </text>
        <text
          x="60"
          y="70"
          textAnchor="middle"
          className="text-sm fill-gray-300"
        >
          / {target}
        </text>
      </svg>
    </div>
  )
}


