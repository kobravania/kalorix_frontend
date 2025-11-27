import { useMutation, useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useState } from 'react'
import { AppLayout } from '../components/layout/AppLayout'
import { PageHeader } from '../components/layout/PageHeader'
import { MealCard } from '../components/menu/MealCard'
import { PrimaryButton } from '../components/ui/PrimaryButton'
import { generatePlan } from '../api/plan'
import { useDailyPlan, planQueryKey } from '../hooks/useDailyPlan'

export const MenuPage = () => {
  const [date] = useState(dayjs().format('YYYY-MM-DD'))
  const queryClient = useQueryClient()
  const { data: plan, isLoading } = useDailyPlan(date)

  const { mutateAsync, isPending } = useMutation({
    mutationFn: () => generatePlan(date),
    onSuccess: (freshPlan) => {
      queryClient.setQueryData(planQueryKey(date), freshPlan)
    },
  })

  const handleRegenerate = async () => {
    await mutateAsync()
  }

  return (
    <AppLayout>
      <PageHeader
        title="Меню на день"
        subtitle={dayjs(date).format('DD MMMM')}
        action={
          <PrimaryButton
            className="h-10 w-32 text-sm"
            loading={isPending}
            onClick={handleRegenerate}
          >
            Обновить
          </PrimaryButton>
        }
      />

      {isLoading && <p className="text-text-secondary">Загружаем меню...</p>}

      <div className="space-y-4">
        {plan?.meals.map((meal) => (
          <MealCard key={meal.id} meal={meal} onReplace={handleRegenerate} />
        ))}
      </div>
    </AppLayout>
  )
}

