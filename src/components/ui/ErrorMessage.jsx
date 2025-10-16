import { ErrorIcon } from '../common/icons'
function ErrorMessage ({ title, message, onRetry, retryText = 'Reintentar' }) {
  return (
    <div className='flex items-center justify-center py-16'>
      <div className=' text-white p-8 rounded-xl max-w-md w-full mx-4 '>
        <div className='flex items-center justify-center mb-4'>
          <div className='w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-2'>
            <ErrorIcon className='w-6 h-6 text-red-500' />
          </div>
        </div>
        <h3 className='text-xl font-bold mb-2 text-white text-center'>{title}</h3>
        <p className='text-sm mb-6 text-[#b3b3b3] text-center leading-relaxed'>{message}</p>
        {onRetry && (
          <div className='flex justify-center'>
            <button
              onClick={onRetry}
              className='bg-white  text-black font-semibold px-6 py-2 rounded-full transition-all duration-200 cursor-pointer'
            >
              {retryText}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ErrorMessage
