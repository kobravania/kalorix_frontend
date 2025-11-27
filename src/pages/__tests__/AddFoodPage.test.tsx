import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import { AddFoodPage } from '../AddFoodPage'
import { AuthContext } from '../../context/AuthContext'

const logFoodEntryMock = vi.fn().mockResolvedValue({ success: true })

vi.mock('../../api/log', () => ({
  logFoodEntry: (payload: unknown) => logFoodEntryMock(payload),
}))

const authValue = {
  token: 'test',
  user: null,
  status: 'authenticated' as const,
  error: null,
  authenticate: async () => {},
  logout: () => {},
  refreshProfile: async () => {},
}

const renderPage = () => {
  const queryClient = new QueryClient()
  return render(
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={authValue}>
        <AddFoodPage />
      </AuthContext.Provider>
    </QueryClientProvider>,
  )
}

describe('AddFoodPage', () => {
  it('отправляет запрос при сабмите формы', async () => {
    renderPage()
    const textarea = screen.getByPlaceholderText(/Что вы съели/i)
    fireEvent.change(textarea, { target: { value: '200 г курицы' } })
    fireEvent.click(screen.getByRole('button', { name: /Отправить/i }))

    await waitFor(() => {
      expect(logFoodEntryMock).toHaveBeenCalledWith({ text: '200 г курицы' })
    })
  })
})

