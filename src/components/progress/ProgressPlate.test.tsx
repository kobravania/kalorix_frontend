import { render, screen } from '@testing-library/react'
import { ProgressPlate } from './ProgressPlate'

describe('ProgressPlate', () => {
  it('показывает калории и остаток', () => {
    render(
      <ProgressPlate
        calories={1200}
        target={2000}
        macros={{ protein: 80, fats: 40, carbs: 150 }}
        macrosTarget={{ protein: 120, fats: 60, carbs: 200 }}
      />,
    )
    expect(screen.getByText(/1200 ккал/)).toBeInTheDocument()
    expect(screen.getByText(/из 2000 ккал/i)).toBeInTheDocument()
  })
})

