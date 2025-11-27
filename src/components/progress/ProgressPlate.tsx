import { MacroBreakdown } from '../../types/api'
import { formatCalories, percent } from '../../utils/format'
import { MacroRing } from './MacroRing'

type ProgressPlateProps = {
  calories: number
  target: number
  macros: MacroBreakdown
  macrosTarget: MacroBreakdown
}

export const ProgressPlate = ({
  calories,
  target,
  macros,
  macrosTarget,
}: ProgressPlateProps) => (
  <section className="glass-panel rounded-3xl p-6 shadow-card">
    <p className="text-sm text-text-secondary">Сегодня</p>
    <div className="flex items-end justify-between">
      <div>
        <p className="text-4xl font-semibold text-text-primary">
          {formatCalories(calories)}
        </p>
        <p className="text-sm text-text-secondary">
          из {formatCalories(target)} ({percent(calories, target)}%)
        </p>
      </div>
      <div className="text-right text-sm">
        <p className="text-text-secondary">Осталось</p>
        <p className="font-semibold text-success">
          {formatCalories(Math.max(target - calories, 0))}
        </p>
      </div>
    </div>
    <div className="mt-6 grid grid-cols-3 gap-2">
      <MacroRing
        label="Белки"
        value={macros.protein}
        target={macrosTarget.protein}
        color="#7EE4A1"
      />
      <MacroRing
        label="Жиры"
        value={macros.fats}
        target={macrosTarget.fats}
        color="#F6D45B"
      />
      <MacroRing
        label="Углеводы"
        value={macros.carbs}
        target={macrosTarget.carbs}
        color="#59C3FF"
      />
    </div>
  </section>
)

