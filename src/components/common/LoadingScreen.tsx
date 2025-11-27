type LoadingScreenProps = {
  message?: string
}

export const LoadingScreen = ({ message = 'Загрузка...' }: LoadingScreenProps) => (
  <div className="flex min-h-screen items-center justify-center bg-surface text-text-primary">
    <div className="glass-panel rounded-3xl p-8 text-center shadow-card">
      <div className="mx-auto mb-4 h-14 w-14 animate-spin rounded-full border-4 border-brand border-t-transparent" />
      <p className="text-lg font-semibold">{message}</p>
      <p className="text-sm text-text-secondary">Пожалуйста, подождите</p>
    </div>
  </div>
)

