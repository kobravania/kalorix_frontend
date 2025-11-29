import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { RequireAuth } from './RequireAuth'
import { HomePage } from '../pages/HomePage'
import { MenuPage } from '../pages/MenuPage'
import { AddFoodPage } from '../pages/AddFoodPage'
import { StatsPage } from '../pages/StatsPage'
import { ProfilePage } from '../pages/ProfilePage'
import { OnboardingPage } from '../pages/OnboardingPage'
import { RegistrationPage } from '../pages/RegistrationPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/onboarding" replace />,
  },
  {
    path: '/home',
    element: (
      <RequireAuth>
        <HomePage />
      </RequireAuth>
    ),
  },
  {
    path: '/menu',
    element: (
      <RequireAuth>
        <MenuPage />
      </RequireAuth>
    ),
  },
  {
    path: '/add-food',
    element: (
      <RequireAuth>
        <AddFoodPage />
      </RequireAuth>
    ),
  },
  {
    path: '/stats',
    element: (
      <RequireAuth>
        <StatsPage />
      </RequireAuth>
    ),
  },
  {
    path: '/profile',
    element: (
      <RequireAuth>
        <ProfilePage />
      </RequireAuth>
    ),
  },
  {
    path: '/onboarding',
    element: <OnboardingPage />,
  },
  {
    path: '/registration',
    element: <RegistrationPage />,
  },
  {
    path: '*',
    element: <Navigate to="/onboarding" replace />,
  },
])

export const AppRouter = () => <RouterProvider router={router} />

