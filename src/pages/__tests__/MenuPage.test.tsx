import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import dayjs from 'dayjs'
import { buildMockPlan } from '../../utils/mockData'
import { MenuPage } from '../MenuPage'
import { AuthContext } from '../../context/AuthContext'
import { planQueryKey } from '../../hooks/useDailyPlan'

const authValue = {
  token: 'test',
  user: null,
  status: 'authenticated' as const,
  error: null,
  authenticate: async () => {},
  logout: () => {},
  refreshProfile: async () => {},
}

const renderMenuPage = () => {
  const queryClient = new QueryClient()
  const today = dayjs().format('YYYY-MM-DD')
  queryClient.setQueryData(planQueryKey(today), buildMockPlan(today))

  return render(
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={authValue}>
        <MenuPage />
      </AuthContext.Provider>
    </QueryClientProvider>,
  )
}

describe('MenuPage', () => {
  it('отображает карточки приёмов пищи', () => {
    renderMenuPage()
    expect(screen.getByText(/Завтрак/i)).toBeInTheDocument()
    expect(screen.getByText(/Куриная грудка/i)).toBeInTheDocument()
  })
})

