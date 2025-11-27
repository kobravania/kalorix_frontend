import { ReactNode } from 'react'

type PageHeaderProps = {
  title: string
  subtitle?: string
  action?: ReactNode
}

export const PageHeader = ({ title, subtitle, action }: PageHeaderProps) => (
  <header className="flex items-start justify-between gap-4">
    <div>
      <h1 className="text-2xl font-semibold text-text-primary">{title}</h1>
      {subtitle ? (
        <p className="text-sm text-text-secondary">{subtitle}</p>
      ) : null}
    </div>
    {action}
  </header>
)

