type MacroRingProps = {
  label: string
  value: number
  target: number
  color: string
}

export const MacroRing = ({ label, value, target, color }: MacroRingProps) => {
  const ratio = target > 0 ? Math.min(1, value / target) : 0
  const circle = 2 * Math.PI * 36
  const stroke = ratio * circle

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width="88" height="88" viewBox="0 0 88 88">
        <circle
          cx="44"
          cy="44"
          r="36"
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="8"
        />
        <circle
          cx="44"
          cy="44"
          r="36"
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${stroke} ${circle - stroke}`}
          transform="rotate(-90 44 44)"
        />
        <text
          x="50%"
          y="50%"
          alignmentBaseline="middle"
          textAnchor="middle"
          className="text-sm font-semibold fill-white"
        >
          {Math.round(value)}г
        </text>
      </svg>
      <p className="text-xs uppercase tracking-wide text-text-secondary">{label}</p>
    </div>
  )
}

