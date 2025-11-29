import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ConfirmModal from './ConfirmModal'

describe('ConfirmModal', () => {
  const mockOnConfirm = jest.fn()
  const mockOnCancel = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render modal when show is true', async () => {
    render(
      <ConfirmModal
        show={true}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
        message="Are you sure?"
      />
    )

    await waitFor(() => {
      expect(screen.getByText('Are you sure?')).toBeInTheDocument()
    })
    expect(screen.getByText('Cancel')).toBeInTheDocument()
    expect(screen.getByText('Confirm')).toBeInTheDocument()
  })

  it('should not render modal when show is false', () => {
    render(
      <ConfirmModal
        show={false}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
        message="Are you sure?"
      />
    )

    expect(screen.queryByText('Are you sure?')).not.toBeInTheDocument()
  })

  it('should call onConfirm when Confirm button is clicked', async () => {
    render(
      <ConfirmModal
        show={true}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
        message="Are you sure?"
      />
    )

    await waitFor(() => {
      expect(screen.getByText('Confirm')).toBeInTheDocument()
    })
    
    const confirmButton = screen.getByText('Confirm')
    fireEvent.click(confirmButton)

    expect(mockOnConfirm).toHaveBeenCalledTimes(1)
    expect(mockOnCancel).not.toHaveBeenCalled()
  })

  it('should call onCancel when Cancel button is clicked', async () => {
    render(
      <ConfirmModal
        show={true}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
        message="Are you sure?"
      />
    )

    await waitFor(() => {
      expect(screen.getByText('Cancel')).toBeInTheDocument()
    })
    
    const cancelButton = screen.getByText('Cancel')
    fireEvent.click(cancelButton)

    expect(mockOnCancel).toHaveBeenCalledTimes(1)
    expect(mockOnConfirm).not.toHaveBeenCalled()
  })

  it('should display default message when message prop is not provided', async () => {
    render(
      <ConfirmModal
        show={true}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    )

    await waitFor(() => {
      expect(screen.getByText('Are you sure?')).toBeInTheDocument()
    })
  })

  it('should display custom title when provided', async () => {
    render(
      <ConfirmModal
        show={true}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
        title="Custom Title"
        message="Custom message"
      />
    )

    await waitFor(() => {
      expect(screen.getByText('Custom Title')).toBeInTheDocument()
      expect(screen.getByText('Custom message')).toBeInTheDocument()
    })
  })
})

