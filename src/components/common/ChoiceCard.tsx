import clsx from 'clsx'

type ChoiceCardProps = {
  title: string
  description: string
  active?: boolean
  onClick?: () => void
}

export const ChoiceCard = ({
  title,
  description,
  active,
  onClick,
}: ChoiceCardProps) => (
  <button
    type="button"
    onClick={onClick}
    className={clsx(
      'glass-panel w-full rounded-3xl p-4 text-left transition',
      active ? 'border-brand bg-gradient-to-br from-brand/20 to-transparent' : '',
    )}
  >
    <p className="text-base font-semibold text-text-primary">{title}</p>
    <p className="text-sm text-text-secondary">{description}</p>
  </button>
)

