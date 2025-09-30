import { useEffect } from 'react'
import useRadio from '../hooks/useRadio'

function ServerSelector () {
  const { servers, selectedServer, loading, error, fetchServers, selectServer } = useRadio()

  useEffect(() => {
    fetchServers()
  }, [fetchServers])

  if (loading) {
    return (
      <div className='bg-gray-800 text-white p-4 rounded-lg'>
        <h3 className='text-lg font-semibold mb-2'>Conectando a servidores...</h3>
        <div className='animate-pulse flex space-x-4'>
          <div className='rounded-full bg-gray-600 h-10 w-10' />
          <div className='flex-1 space-y-2 py-1'>
            <div className='h-4 bg-gray-600 rounded w-3/4' />
            <div className='h-4 bg-gray-600 rounded w-1/2' />
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='bg-red-800 text-white p-4 rounded-lg'>
        <h3 className='text-lg font-semibold mb-2'>Error de Conexión</h3>
        <p className='mb-3'>{error}</p>
        <button
          onClick={fetchServers}
          className='bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition-colors'
        >
          Reintentar
        </button>
      </div>
    )
  }
  return (
    <div className='bg-gray-800 text-white p-4 rounded-lg mb-6'>
      <h3 className='text-lg font-semibold mb-4'>Seleccionar Servidor Radio Browser</h3>

      {selectedServer && (
        <div className='mb-4 p-3 bg-green-700 rounded'>
          <p className='text-sm'>
            <span className='font-medium'>Conectado a:</span> {selectedServer.name}
          </p>
        </div>
      )}

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
        {servers.map((server, index) => (
          <button
            key={index}
            onClick={() => selectServer(server)}
            className={`p-3 rounded-lg border transition-all duration-200 text-left ${
              selectedServer?.ip === server.ip
                ? 'bg-green-600 border-green-500'
                : 'bg-gray-700 border-gray-600 hover:bg-gray-600'
            }`}
          >
            <div className='font-medium'>{server.name}</div>
            <div className='text-sm text-gray-300'>{server.ip}</div>
            <div className='flex items-center mt-1'>

              <span className='text-xs'>
                {server.lastCheckOk ? 'Activo' : 'Inactivo'}
              </span>
            </div>
          </button>
        ))}
      </div>

      {servers.length === 0 && (
        <div className='text-center text-gray-400 py-8'>
          <p>No se encontraron servidores disponibles</p>
          <button
            onClick={fetchServers}
            className='mt-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition-colors'
          >
            Buscar Servidores
          </button>
        </div>
      )}
    </div>
  )
}
export default ServerSelector
