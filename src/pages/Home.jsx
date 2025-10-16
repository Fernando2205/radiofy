import { useEffect, useState, useMemo } from 'react'
import useRadioContext from '../hooks/useRadioContext'
import {
  StationCard,
  CountrySelector,
  SearchBar,
  ErrorMessage,
  LoadingState,
  EmptyState,
  SearchIcon
} from '../components'
function Home ({ isTransitioning }) {
  const {
    selectedServer,
    stations,
    loadingStations,
    stationsError,
    currentCountry,
    getColombianStations,
    playStation,
    currentStation,
    isPlaying
  } = useRadioContext()

  const [searchTerm, setSearchTerm] = useState('')

  const getGreeting = () => {
    const currentHour = new Date().getHours()

    if (currentHour >= 5 && currentHour < 12) {
      return 'Buenos días'
    } else if (currentHour >= 12 && currentHour < 18) {
      return 'Buenas tardes'
    } else {
      return 'Buenas noches'
    }
  }

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
    return <LoadingState message='Cargando emisoras...' />
  }

  if (stationsError) {
    return (
      <ErrorMessage
        title='Error al cargar emisoras'
        message={stationsError}
        onRetry={getColombianStations}
      />
    )
  }

  return (
    <div className='pt-6 pb-24'>
      {/* Header */}
      <div className='mb-8'>
        <h1 className='text-4xl font-bold text-white mb-2'>
          {getGreeting()}
        </h1>
        <p className='text-gray-300'>Descubre emisoras de radio de todo el mundo</p>
      </div>

      {/* Búsqueda y filtros */}
      <div className='mb-8 flex items-center gap-4'>
        <CountrySelector />

        {stations.length > 0 && (
          <div className='flex-1 max-w-md'>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>
        )}
      </div>

      {/* Sección principal */}
      <div className='mb-6'>
        <div className='flex items-center justify-between mb-6'>
          <h2 className='text-2xl font-bold text-white'>
            {searchTerm
              ? 'Resultados de búsqueda'
              : currentCountry ? `Emisoras populares en ${currentCountry}` : 'Emisoras populares'}
          </h2>

        </div>

        {searchTerm && (
          <p className='text-gray-400 text-sm mb-4'>
            {filteredStations.length} resultados para "{searchTerm}"
          </p>
        )}
      </div>

      {/* Grid de emisoras */}
      {stations.length > 0
        ? (
          <>
            {filteredStations.length > 0
              ? (
                <div className={`grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-6 transition-all duration-500 ${
  isTransitioning ? 'opacity-50 scale-[0.99]' : 'opacity-100 scale-100'
}`}
                >
                  {filteredStations.map((station) => (
                    <StationCard
                      key={station.stationuuid}
                      station={station}
                      onPlay={playStation}
                      isPlaying={currentStation?.stationuuid === station.stationuuid && isPlaying}
                    />
                  ))}
                </div>
                )
              : (
                <EmptyState
                  title='No se encontraron resultados'
                  description='Intenta buscar algo diferente.'
                  actionText='Limpiar búsqueda'
                  onAction={() => setSearchTerm('')}
                />
                )}
          </>
          )
        : (
          <EmptyState
            title='¡Comienza a explorar!'
            description='Descubre emisoras de radio de todo el mundo.'
            actionText='Explorar emisoras'
            onAction={getColombianStations}
            actionClassName='bg-green-500 hover:bg-green-400 text-black'
          />
          )}
    </div>
  )
}

export default Home
