import { ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'

type PrimaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean
}

export const PrimaryButton = ({
  className,
  loading,
  children,
  disabled,
  type = 'button',
  ...rest
}: PrimaryButtonProps) => (
  <button
    type={type}
    className={clsx(
      'flex h-12 w-full items-center justify-center rounded-2xl bg-brand text-base font-semibold text-white transition hover:bg-brand-muted disabled:opacity-60',
      className,
    )}
    disabled={disabled || loading}
    {...rest}
  >
    {loading ? 'Загрузка...' : children}
  </button>
)

