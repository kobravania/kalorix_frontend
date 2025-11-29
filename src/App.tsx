import { AppProviders } from './providers/AppProviders'
import { AppRouter } from './router/AppRouter'
import { useTelegramInit } from './hooks/useTelegramInit'

const App = () => {
  useTelegramInit()

  return (
    <AppProviders>
      <AppRouter />
    </AppProviders>
  )
}

export default App
