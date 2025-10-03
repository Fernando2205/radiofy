import useRadioContext from '../hooks/useRadioContext'
import  {useState, useRef, useEffect } from 'react'
import { ChevronDownIcon, CheckIcon } from './icons'


function Header () {
  const {
    servers,
    selectedServer,
    serverStatus,
    testingServers,
    loading,
    error,
    fetchServers,
    selectServer
  } = useRadioContext()

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    fetchServers()
  }, [fetchServers])

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    function handleClickOutside (event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleServerSelect = (server) => {
    selectServer(server)
    setIsDropdownOpen(false)
  }

  const getServerStatusIcon = (server) => {
    const isOnline = serverStatus[server.ip]
    const isTestingThisServer = testingServers && serverStatus[server.ip] === undefined

    if (isTestingThisServer) {
      return <div className='w-2 h-2 bg-yellow-400 rounded-full animate-pulse' />
    }

    return (
      <div className={`w-2 h-2 rounded-full ${
        isOnline === true
? 'bg-green-400'
        : isOnline === false ? 'bg-red-400' : 'bg-gray-400'
      }`}
      />
    )
  }

  const getServerStatusText = (server) => {
    const isOnline = serverStatus[server.ip]
    const isTestingThisServer = testingServers && serverStatus[server.ip] === undefined

    if (isTestingThisServer) return 'Probando...'
    if (isOnline === true) return 'En línea'
    if (isOnline === false) return 'Sin conexión'
    return 'No probado'
  }

  return (
    <header className='bg-gray-800 border-b border-gray-700 p-4'>
      <div className='container mx-auto flex items-center justify-between'>
        {/* Logo y título */}
        <div className=''>
          <h1 className='text-xl font-bold text-white'>RadioFy</h1>
        </div>

        {/* Dropdown de servidores */}
        <div className='relative' ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className='flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors'
          >
            {selectedServer
              ? (
                <>
                  {getServerStatusIcon(selectedServer)}
                  <span className='text-sm font-medium'>{selectedServer.name}</span>
                  <span className='text-xs text-gray-400'>({selectedServer.ip})</span>
                </>
                )
              : (
                <span className='text-sm'>Cargando servidores...</span>
                )}
            <ChevronDownIcon className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown menu */}
          {isDropdownOpen && (
            <div className='absolute right-0 mt-2 w-80 bg-gray-700 rounded-lg shadow-lg border border-gray-600 z-50 max-h-96 overflow-y-auto'>
              <div className='p-3 border-b border-gray-600'>
                <h3 className='text-sm font-semibold text-white'>Servidores Disponibles</h3>
              </div>

              {loading
                ? (
                  <div className='p-4 text-center text-gray-400'>
                    <div className='animate-pulse'>Cargando servidores...</div>
                  </div>
                  )
                : error
                  ? (
                    <div className='p-4'>
                      <div className='text-center text-red-400 mb-3'>
                        <p className='text-sm'>{error}</p>
                      </div>
                      <button
                        onClick={fetchServers}
                        className='w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm transition-colors'
                      >
                        Reintentar
                      </button>
                    </div>
                    )
                  : servers.length === 0
                    ? (
                      <div className='p-4 text-center text-gray-400'>
                        <p>No se encontraron servidores disponibles</p>
                        <button
                          onClick={fetchServers}
                          className='mt-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors'
                        >
                          Buscar Servidores
                        </button>
                      </div>
                      )
                    : (
                      <div className='py-2'>
                        {servers.map((server, index) => {
                          const isSelected = selectedServer?.ip === server.ip

                          return (
                            <button
                              key={`${server.ip}-${index}`}
                              onClick={() => handleServerSelect(server)}
                              className={`w-full px-4 py-3 text-left hover:bg-gray-600 transition-colors ${
                              isSelected ? 'bg-green-600 hover:bg-green-700' : ''
                            }`}
                            >
                              <div className='flex items-center justify-between'>
                                <div className='flex-1'>
                                  <div className='text-sm font-medium text-white'>
                                    {server.name}
                                  </div>
                                  <div className='text-xs text-gray-300'>
                                    {server.ip}
                                  </div>
                                </div>

                                <div className='flex items-center space-x-2 ml-3'>
                                  {getServerStatusIcon(server)}
                                  <span className='text-xs text-gray-300'>
                                    {getServerStatusText(server)}
                                  </span>
                                  {isSelected && (
                                    <CheckIcon className='w-4 h-4 text-green-400' />
                                  )}
                                </div>
                              </div>
                            </button>
                          )
                        })}
                      </div>
                      )}
            </div>
          )}
        </div>

        {/* Información adicional (opcional) */}
        <div className='flex items-center space-x-4'>
          {selectedServer && (
            <div className='text-xs text-gray-400'>
              Conectado
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
