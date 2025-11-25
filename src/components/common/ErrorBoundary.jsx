import React from 'react'
import PropTypes from 'prop-types'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='container mt-5'>
          <div className='alert alert-danger' role='alert'>
            <h4 className='alert-heading'>An error occurred!</h4>
            <p>Something went wrong. Please refresh the page.</p>
            <hr />
            <p className='mb-0'>
              {this.state.error && this.state.error.toString()}
            </p>
            <button
              className='btn btn-primary mt-3'
              onClick={() => window.location.reload()}
            >
              Refresh Page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ErrorBoundary

