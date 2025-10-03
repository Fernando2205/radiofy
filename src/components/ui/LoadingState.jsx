import { LoadingIcon } from '../common/loaders'

function LoadingState ({ message = 'Cargando...', className = '' }) {
  return (
    <div className={`space-y-6 ${className}`}>
      <div className='text-center py-8'>
        <LoadingIcon className='w-12 h-12' />
        <p className='text-gray-400'>{message}</p>
      </div>
    </div>
  )
}

export default LoadingState
