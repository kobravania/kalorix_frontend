import { FormEvent, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { AppLayout } from '../components/layout/AppLayout'
import { PageHeader } from '../components/layout/PageHeader'
import { PrimaryButton } from '../components/ui/PrimaryButton'
import { logFoodEntry } from '../api/log'

const suggestions = [
  '200 г курицы + 100 г риса',
  'Яичница из 2 яиц + тост',
  'Смузи: банан, шпинат, протеин',
]

export const AddFoodPage = () => {
  const [text, setText] = useState('')
  const [status, setStatus] = useState<'idle' | 'success'>('idle')

  const mutation = useMutation({
    mutationFn: (payload: string) => logFoodEntry({ text: payload }),
    onSuccess: () => {
      setStatus('success')
      setText('')
    },
  })

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!text.trim()) return
    setStatus('idle')
    mutation.mutate(text)
  }

  return (
    <AppLayout>
      <PageHeader
        title="Добавить еду"
        subtitle="Опиши приём пищи — мы посчитаем калории"
      />

      <form onSubmit={handleSubmit} className="glass-panel rounded-3xl p-4 shadow-card">
        <label htmlFor="food-text" className="text-sm text-text-secondary">
          Пример: «200 г курицы + 100 г риса»
        </label>
        <textarea
          id="food-text"
          value={text}
          onChange={(event) => setText(event.target.value)}
          className="mt-3 h-32 w-full rounded-2xl border border-white/5 bg-transparent p-4 text-base text-text-primary outline-none"
          placeholder="Что вы съели?"
        />
        <PrimaryButton
          className="mt-4"
          loading={mutation.isPending}
          disabled={!text.trim()}
          type="submit"
        >
          Отправить
        </PrimaryButton>
        {status === 'success' ? (
          <p className="mt-2 text-sm text-success">Приём пищи сохранён!</p>
        ) : null}
      </form>

      <section className="space-y-2">
        <p className="text-sm uppercase tracking-[0.2em] text-text-secondary">
          Подсказки
        </p>
        <div className="grid gap-2">
          {suggestions.map((item) => (
            <button
              key={item}
              type="button"
              className="glass-panel rounded-2xl p-3 text-left text-sm text-text-primary"
              onClick={() => setText(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </section>
    </AppLayout>
  )
}

