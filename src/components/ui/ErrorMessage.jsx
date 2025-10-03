function ErrorMessage ({ title, message, onRetry, retryText = 'Reintentar' }) {
  return (
    <div className='text-center py-16'>
      <div className='bg-red-800 text-white p-6 rounded-lg max-w-md mx-auto'>
        <h3 className='text-lg font-semibold mb-2'>{title}</h3>
        <p className='text-sm mb-4'>{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className='bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition-colors'
          >
            {retryText}
          </button>
        )}
      </div>
    </div>
  )
}

export default ErrorMessage
