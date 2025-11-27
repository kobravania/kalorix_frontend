import { ReactNode } from 'react'

type AppLayoutProps = {
  children: ReactNode
  paddingTop?: boolean
}

export const AppLayout = ({ children, paddingTop = true }: AppLayoutProps) => (
  <div
    className={`flex min-h-screen flex-col gap-5 bg-transparent px-4 ${
      paddingTop ? 'py-6' : 'pb-6'
    }`}
  >
    {children}
  </div>
)

