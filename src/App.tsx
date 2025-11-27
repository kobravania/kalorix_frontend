import { Suspense } from 'react'
import { AppProviders } from './providers/AppProviders'
import { AppRouter } from './router/AppRouter'
import { LoadingScreen } from './components/common/LoadingScreen'
import { useTelegramInit } from './hooks/useTelegramInit'

const App = () => {
  useTelegramInit()

  return (
    <AppProviders>
      <Suspense fallback={<LoadingScreen message="Загружаем Kalorix..." />}>
        <AppRouter />
      </Suspense>
    </AppProviders>
  )
}

export default App
