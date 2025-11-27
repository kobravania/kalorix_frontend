import { fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { OnboardingPage } from '../OnboardingPage'
import { AuthContext } from '../../context/AuthContext'

const createAuthValue = (overrides = {}) => ({
  token: null,
  user: null,
  status: 'idle',
  error: null,
  authenticate: vi.fn(),
  logout: vi.fn(),
  refreshProfile: vi.fn(),
  ...overrides,
})

const renderWithAuth = (valueOverrides = {}) =>
  render(
    <AuthContext.Provider value={createAuthValue(valueOverrides)}>
      <OnboardingPage />
    </AuthContext.Provider>,
  )

describe('OnboardingPage', () => {
  it('отображает варианты целей', () => {
    renderWithAuth()
    expect(screen.getByText(/Похудение/i)).toBeInTheDocument()
    expect(screen.getByText(/Поддержание/i)).toBeInTheDocument()
    expect(screen.getByText(/Набор/i)).toBeInTheDocument()
  })

  it('запускает авторизацию при клике', () => {
    const authenticate = vi.fn().mockResolvedValue(undefined)
    renderWithAuth({ authenticate })
    fireEvent.click(screen.getByRole('button', { name: /Начать/i }))
    expect(authenticate).toHaveBeenCalled()
  })
})

