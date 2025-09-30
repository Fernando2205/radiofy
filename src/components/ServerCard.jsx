function ServerCard ({ server, isSelected, isOnline, isTestingThisServer, onSelect, disabled }) {
  return (
    <button
      onClick={onSelect}
      disabled={disabled}
      className={`p-3 rounded-lg border transition-all duration-200 text-left ${
        isSelected
          ? 'bg-green-600 border-green-500'
          : 'bg-gray-700 border-gray-600 hover:bg-gray-600 disabled:hover:bg-gray-700'
      }`}
    >
      <div className='font-medium'>{server.name}</div>
      <div className='text-sm text-gray-300'>{server.ip}</div>
      <div className='flex items-center mt-1'>
        {isTestingThisServer
          ? (
            <div className='w-2 h-2 bg-yellow-400 rounded-full mr-2 animate-pulse' />
            )
          : (
            <div className={`w-2 h-2 rounded-full mr-2 ${
            isOnline === true
? 'bg-green-400'
            : isOnline === false ? 'bg-red-400' : 'bg-gray-400'
          }`}
            />
            )}
        <span className='text-xs'>
          {isTestingThisServer
            ? 'Probando...'
            : isOnline === true
              ? 'En línea'
              : isOnline === false ? 'Sin conexión' : 'No probado'}
        </span>
      </div>
    </button>
  )
}

export default ServerCard
