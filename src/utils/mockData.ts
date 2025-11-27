import dayjs from 'dayjs'
import { DailyPlan, StatsSummary, UserProfile } from '../types/api'

export const mockUserProfile: UserProfile = {
  id: 'demo-user',
  firstName: 'Алексей',
  age: 28,
  weight: 82,
  height: 182,
  activity: 'medium',
  goal: 'loss',
  targetCalories: 2200,
  macrosTarget: { protein: 150, fats: 70, carbs: 240 },
}

const baseMeals = [
  {
    id: 'breakfast',
    type: 'breakfast' as const,
    items: [
      {
        title: 'Овсяная каша с ягодами',
        calories: 450,
        macros: { protein: 20, fats: 12, carbs: 60 },
        description: 'Овсянка, миндальное молоко, голубика, миндаль',
      },
    ],
    totalCalories: 450,
    totalMacros: { protein: 20, fats: 12, carbs: 60 },
  },
  {
    id: 'lunch',
    type: 'lunch' as const,
    items: [
      {
        title: 'Куриная грудка и киноа',
        calories: 650,
        macros: { protein: 45, fats: 18, carbs: 65 },
        description: 'Курица гриль, киноа, брокколи, оливковое масло',
      },
    ],
    totalCalories: 650,
    totalMacros: { protein: 45, fats: 18, carbs: 65 },
  },
  {
    id: 'dinner',
    type: 'dinner' as const,
    items: [
      {
        title: 'Лосось с овощами',
        calories: 580,
        macros: { protein: 38, fats: 26, carbs: 35 },
        description: 'Запечённый лосось, киноа, спаржа',
      },
    ],
    totalCalories: 580,
    totalMacros: { protein: 38, fats: 26, carbs: 35 },
  },
  {
    id: 'snack',
    type: 'snack' as const,
    items: [
      {
        title: 'Греческий йогурт с орехами',
        calories: 300,
        macros: { protein: 20, fats: 14, carbs: 22 },
        description: 'Йогурт, грецкие орехи, мёд',
      },
    ],
    totalCalories: 300,
    totalMacros: { protein: 20, fats: 14, carbs: 22 },
  },
]

export const buildMockPlan = (date: string): DailyPlan => {
  const totals = baseMeals.reduce(
    (acc, meal) => ({
      calories: acc.calories + meal.totalCalories,
      macros: {
        protein: acc.macros.protein + meal.totalMacros.protein,
        fats: acc.macros.fats + meal.totalMacros.fats,
        carbs: acc.macros.carbs + meal.totalMacros.carbs,
      },
    }),
    { calories: 0, macros: { protein: 0, fats: 0, carbs: 0 } },
  )

  return {
    date,
    meals: baseMeals,
    totals,
  }
}

export const mockStats = (): StatsSummary => {
  const today = dayjs()
  return {
    kcalConsumed: 1800,
    kcalTarget: 2200,
    macros: { protein: 120, fats: 55, carbs: 180 },
    history: Array.from({ length: 7 }).map((_, index) => {
      const day = today.subtract(index, 'day')
      return {
        date: day.format('DD.MM'),
        calories: 1500 + index * 80,
      }
    }),
  }
}

