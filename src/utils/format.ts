export const formatCalories = (value: number) => `${Math.round(value)} ккал`
export const formatWeight = (value: number) => `${value} г`

export const percent = (value: number, target: number) =>
  target > 0 ? Math.min(100, Math.round((value / target) * 100)) : 0

