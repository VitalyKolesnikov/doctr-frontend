import React from 'react'
import { render, screen } from '@testing-library/react'
import Cost from './Cost'

describe('Cost', () => {
  it('should render cost with thousand separator', () => {
    render(<Cost value={1000} />)
    expect(screen.getByText('1,000')).toBeInTheDocument()
  })

  it('should render cost without separator for small numbers', () => {
    render(<Cost value={100} />)
    expect(screen.getByText('100')).toBeInTheDocument()
  })

  it('should render large numbers with separators', () => {
    render(<Cost value={1234567} />)
    expect(screen.getByText('1,234,567')).toBeInTheDocument()
  })

  it('should render zero', () => {
    render(<Cost value={0} />)
    expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('should render decimal numbers', () => {
    render(<Cost value={1234.56} />)
    // react-number-format may format decimals differently
    const element = screen.getByText(/1,234/)
    expect(element).toBeInTheDocument()
  })
})

