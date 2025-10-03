import { useEffect, useState, useMemo } from 'react'
import useRadioContext from '../hooks/useRadioContext'
import StationCard from '../components/StationCard'
import CountrySelector from '../components/CountrySelector'
import { CloseIcon, SearchIcon } from '../components/icons'
function Home () {
  const {
    selectedServer,
    stations,
    loadingStations,
    stationsError,
    currentCountry,
    getColombianStations, // Nueva función
    getRandomCountryStations,
    playStation,
    currentStation,
    isPlaying
  } = useRadioContext()

  const [searchTerm, setSearchTerm] = useState('')

  // Filtrar estaciones basado en el término de búsqueda
  const filteredStations = useMemo(() => {
    if (!searchTerm.trim()) {
      return stations
    }
    
    const term = searchTerm.toLowerCase()
    return stations.filter(station => 
      station.name?.toLowerCase().includes(term) ||
      station.tags?.toLowerCase().includes(term)
    )
  }, [stations, searchTerm])

  useEffect(() => {
    if (selectedServer && stations.length === 0) {
      // Cargar emisoras colombianas por defecto
      getColombianStations()
    }
  }, [selectedServer, stations.length, getColombianStations])

  if (!selectedServer) {
    return (
      <div className='text-center py-16'>
        <h2 className='text-2xl font-semibold mb-4 text-white'>
          Bienvenido a RadioFy
        </h2>
        <p className='text-gray-400 mb-8'>
          Espera un momento mientras carga el servidor
        </p>
      </div>
    )
  }

  if (loadingStations) {
    return (
      <div className='space-y-6'>
        <div className='text-center py-8'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4' />
          <p className='text-gray-400'>Cargando emisoras...</p>
        </div>
      </div>
    )
  }

  if (stationsError) {
    return (
      <div className='text-center py-16'>
        <div className='bg-red-800 text-white p-6 rounded-lg max-w-md mx-auto'>
          <h3 className='text-lg font-semibold mb-2'>Error al cargar emisoras</h3>
          <p className='text-sm mb-4'>{stationsError}</p>
          <button
            onClick={getColombianStations}
            className='bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition-colors'
          >
            Reintentar
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className='space-y-6'>
      <CountrySelector/>
      
      {/* Campo de búsqueda */}
      {stations.length > 0 && (
        <div className='max-w-md'>
          <label className='block text-sm font-medium text-gray-300 mb-2'>
            Buscar emisoras
          </label>
          <div className='relative'>
            <input
              type='text'
              placeholder='Buscar por nombre o género...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent'
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white'
              >
                <CloseIcon className='w-5 h-5' />
              </button>
            )}
          </div>
        </div>
      )}
      
      {/* Título de la sección */}
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='text-2xl font-bold text-white mb-2'>
            {searchTerm 
              ? `Resultados para "${searchTerm}"` 
              : currentCountry ? `Emisoras de ${currentCountry}` : 'Emisoras Populares'
            }
          </h2>
          <p className='text-gray-400'>
            {filteredStations.length} emisoras encontradas
            {searchTerm && stations.length !== filteredStations.length && (
              ` de ${stations.length} total`
            )}
          </p>
        </div>

        <div className='flex space-x-3'>
          <button
            onClick={getColombianStations}
            className='bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors'
          >
            Ir a emisoras Colombia
          </button>
         
        </div>
      </div>

      {/* Grid de emisoras */}
      {stations.length > 0
        ? (
          <>
            {filteredStations.length > 0 ? (
              <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
                {filteredStations.map((station) => (
                  <StationCard
                    key={station.stationuuid}
                    station={station}
                    onPlay={playStation}
                    isPlaying={currentStation?.stationuuid === station.stationuuid && isPlaying}
                  />
                ))}
              </div>
            ) : (
              <div className='text-center py-16'>
                <SearchIcon className='w-16 h-16 text-gray-500 mx-auto mb-4' />
                <p className='text-gray-400 mb-4'>
                  No se encontraron emisoras para "{searchTerm}"
                </p>
                <button
                  onClick={() => setSearchTerm('')}
                  className='bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors'
                >
                  Limpiar búsqueda
                </button>
              </div>
            )}
          </>
          )
        : (
          <div className='text-center py-16'>
            <p className='text-gray-400 mb-4'>No se encontraron emisoras</p>
            <button
              onClick={getColombianStations}
              className='bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors'
            >
              Cargar emisoras Colombia
            </button>
          </div>
          )}
    </div>
  )
}

export default Home
