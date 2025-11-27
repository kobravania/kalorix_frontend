export type Goal = 'loss' | 'maintain' | 'gain'

export type MacroBreakdown = {
  protein: number
  fats: number
  carbs: number
}

export type UserProfile = {
  id: string
  firstName: string
  lastName?: string
  age: number
  weight: number
  height: number
  activity: 'low' | 'medium' | 'high'
  goal: Goal
  targetCalories: number
  macrosTarget: MacroBreakdown
}

export type MealItem = {
  title: string
  calories: number
  macros: MacroBreakdown
  description?: string
}

export type Meal = {
  id: string
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack'
  items: MealItem[]
  totalCalories: number
  totalMacros: MacroBreakdown
}

export type DailyPlan = {
  date: string
  meals: Meal[]
  totals: {
    calories: number
    macros: MacroBreakdown
  }
}

export type StatsSummary = {
  kcalConsumed: number
  kcalTarget: number
  macros: MacroBreakdown
  history: Array<{
    date: string
    calories: number
  }>
}

export type FoodLogPayload = {
  text: string
  date?: string
}

