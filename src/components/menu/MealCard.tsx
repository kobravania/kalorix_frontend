import { Meal } from '../../types/api'

type MealCardProps = {
  meal: Meal
  onReplace?: (meal: Meal) => void
}

const mealLabel: Record<Meal['type'], string> = {
  breakfast: 'Завтрак',
  lunch: 'Обед',
  dinner: 'Ужин',
  snack: 'Перекус',
}

export const MealCard = ({ meal, onReplace }: MealCardProps) => (
  <article className="glass-panel rounded-3xl p-5 shadow-card">
    <div className="mb-3 flex items-center justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-text-secondary">
          {mealLabel[meal.type]}
        </p>
        <p className="text-lg font-semibold text-text-primary">
          {meal.totalCalories} ккал
        </p>
      </div>
      {onReplace ? (
        <button
          type="button"
          className="text-sm font-medium text-brand"
          onClick={() => onReplace(meal)}
        >
          Заменить
        </button>
      ) : null}
    </div>
    <div className="space-y-3">
      {meal.items.map((item) => (
        <div key={item.title}>
          <p className="text-base font-semibold text-text-primary">{item.title}</p>
          {item.description ? (
            <p className="text-sm text-text-secondary">{item.description}</p>
          ) : null}
          <p className="text-xs text-text-secondary">
            Б {item.macros.protein}г · Ж {item.macros.fats}г · У {item.macros.carbs}г
          </p>
        </div>
      ))}
    </div>
  </article>
)

