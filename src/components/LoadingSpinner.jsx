import Loader from 'react-loader-spinner'
import { usePromiseTracker } from 'react-promise-tracker'

export const LoadingSpinner = () => {
  const { promiseInProgress } = usePromiseTracker()

  return (
    promiseInProgress && (
      <div
        style={{
          position: 'fixed',
          top: '45%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Loader type='Grid' color='#00BFFF' height={50} width={50} />
      </div>
    )
  )
}
