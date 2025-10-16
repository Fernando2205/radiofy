import { useState, useRef, useEffect } from 'react'
import useRadioContext from '../../hooks/useRadioContext'
import { ChevronDownIcon, CheckIcon } from '../common/icons'
import SidebarToggle from '../ui/SideBarToggle'

function Header ({ sidebarVisible, onToggleSidebar }) {
  const {
    selectedServer,
    currentCountry,
    servers,
    serverStatus,
    testingServers,
    loadingServers,
    error,
    fetchServers,
    selectServer
  } = useRadioContext()

  const [showProfile, setShowProfile] = useState(false)
  const [showServers, setShowServers] = useState(false)
  const dropdownRef = useRef(null)
  const profileDropdownRef = useRef(null)

  useEffect(() => {
    fetchServers()
  }, [fetchServers])

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    function handleClickOutside (event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowServers(false)
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setShowProfile(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleServerSelect = (server) => {
    selectServer(server)
    setShowServers(false)
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

  return (
    <div className='sticky top-0 bg-black/20 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between z-10'>
      {/* Navegación */}
      <div className='flex items-center gap-4'>
        {/* Botón toggle sidebar */}
        <SidebarToggle sidebarVisible={sidebarVisible} onToggle={onToggleSidebar} />

        <div className='flex items-center gap-2 text-sm text-gray-300'>
          <span className='font-medium text-white'>Inicio</span>
          {currentCountry && (
            <>
              <span className='text-gray-500'>/</span>
              <span className='text-gray-400'>{currentCountry}</span>
            </>
          )}
        </div>
      </div>

      {/* Información del servidor y usuario */}
      <div className='flex items-center gap-4 '>
        {/* Selector de servidores */}
        <div className='relative' ref={dropdownRef}>
          <button
            onClick={() => setShowServers(!showServers)}
            disabled={loadingServers}
            className='flex items-center gap-2 bg-[#232323] hover:bg-[#303030] text-white px-3 py-2 rounded-lg transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'
          >
            {loadingServers
              ? (
                <>
                  <div className='w-2 h-2 bg-yellow-400 rounded-full animate-pulse' />
                  <span className='font-medium'>Cargando servidores...</span>
                </>
                )
              : selectedServer
                ? (
                  <>
                    {getServerStatusIcon(selectedServer)}
                    <span className='font-medium'>{selectedServer.name}</span>
                  </>
                  )
                : (
                  <span>Seleccionar Servidor</span>
                  )}
            <ChevronDownIcon className={`w-4 h-4 transition-transform ${showServers ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown de servidores */}
          {showServers && (
            <div className='absolute right-0 mt-2 w-80 bg-[#232323] rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto animate-dropdown cursor-pointer thin-scrollbar'>
              <div className='p-3 border-b border-gray-700'>
                <h3 className='text-sm font-semibold text-white'>Servidores Disponibles</h3>
              </div>

              {loadingServers
                ? (
                  <div className='p-4 text-center text-gray-400'>
                    <div className='animate-pulse'>Cargando servidores...</div>
                  </div>
                  )
                : error
                  ? (
                    <div className='p-4'>
                      <div className='text-center text-white mb-3'>
                        <p className='text-sm'>{error}</p>
                      </div>
                      <button
                        onClick={fetchServers}
                        className='w-full bg-white hover:scale-101 text-black px-4 py-2 rounded text-sm font-semibold transition-all duration-200 cursor-pointer'
                      >
                        Reintentar
                      </button>
                    </div>
                    )
                  : servers.length === 0
                    ? (
                      <div className='p-4 text-center text-gray-400'>
                        <p>No se encontraron servidores</p>
                        <button
                          onClick={fetchServers}
                          className='mt-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm'
                        >
                          Buscar Servidores
                        </button>
                      </div>
                      )
                    : (
                      <div className='py-2'>
                        {servers.map((server) => {
                          const isSelected = selectedServer?.ip === server.ip
                          return (
                            <button
                              key={`${server.ip}`}
                              onClick={() => handleServerSelect(server)}
                              className={`w-full px-4 py-3 text-left hover:bg-gray-700 transition-colors ${
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
                                <div className='flex items-center gap-2'>
                                  {getServerStatusIcon(server)}
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

        {/* Perfil de usuario */}
        <div className='relative' ref={profileDropdownRef}>
          <button
            onClick={() => setShowProfile(!showProfile)}
            className='flex items-center gap-2 bg-[#232323] hover:bg-[#303030] rounded-full px-4 py-2 transition-colors cursor-pointer'
          >
            <div className='w-7 h-7 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-black font-bold text-sm'>
              U
            </div>
            <span className='text-white font-medium text-sm'>Usuario</span>
            <ChevronDownIcon className={`w-4 h-4 text-gray-400 transition-transform ${showProfile ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown del perfil */}
          {showProfile && (
            <div className='absolute right-0 mt-2 w-48 bg-[#232323] rounded-lg shadow-lg  py-2 animate-dropdown'>
              <div className='px-4 py-2 text-sm text-gray-300'>
                Si ve esto pongame 5 profe
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header
