import { useEffect, useState, useRef } from 'react'
import useRadioContext from '../../hooks/useRadioContext'
import { ChevronDownIcon, CheckIcon } from '../common/icons'

function CountrySelector () {
  const [showCountries, setShowCountries] = useState(false)
  const dropdownRef = useRef(null)

  const {
    countries,
    loadingCountries,
    selectedServer,
    currentCountry,
    fetchCountries,
    getStationsByCountry,
    getColombianStations
  } = useRadioContext()

  useEffect(() => {
    if (selectedServer && countries.length === 0) {
      fetchCountries()
    }
  }, [selectedServer, countries.length, fetchCountries])

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    function handleClickOutside (event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowCountries(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleCountrySelect = (countryName) => {
    if (countryName === 'Colombia') {
      getColombianStations()
    } else {
      getStationsByCountry(countryName)
    }
    setShowCountries(false)
  }

  if (!selectedServer) return null

  return (
    <div className='relative' ref={dropdownRef}>
      <button
        onClick={() => setShowCountries(!showCountries)}
        disabled={loadingCountries}
        className='flex items-center justify-between gap-2 bg-[#242424] hover:bg-[#303030] text-white px-4 py-2 rounded-full transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer w-100 h-12'
      >
        <span className='font-medium truncate'>{currentCountry || 'Colombia'}</span>
        <ChevronDownIcon className='w-4 h-4 flex-shrink-0' />
      </button>

      {/* Dropdown de países */}
      {showCountries && (
        <div className='absolute left-0 mt-2 bg-[#232323] rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto animate-dropdown thin-scrollbar w-100'>
          <div className='py-2'>
            {/* Colombia primero */}
            {currentCountry && (
              <button
                onClick={() => handleCountrySelect(currentCountry)}
                className='w-full px-4 py-3 text-left bg-green-600 hover:bg-green-700 transition-colors'
              >
                <div className='flex items-center justify-between'>
                  <div className='text-sm font-medium text-white'>
                    {/* Buscar el país en el array para obtener su código ISO */}
                    {countries.find(c => c.name === currentCountry)?.iso_3166_1} - {currentCountry}
                  </div>
                </div>
              </button>
            )}

            {/* Resto de países ordenados */}
            {countries
              .filter(country => country.name !== currentCountry)
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((country, index) => {
                const isSelected = currentCountry === country.name
                return (
                  <button
                    key={index}
                    onClick={() => handleCountrySelect(country.name)}
                    className={`w-full px-4 py-3 text-left hover:bg-[#323232] transition-colors ${
                      isSelected ? 'bg-green-600 hover:bg-green-700' : ''
                    }`}
                  >
                    <div className='flex items-center justify-between'>
                      <div className='text-sm font-medium text-white'>
                        {country.iso_3166_1} - {country.name}
                      </div>

                    </div>
                  </button>
                )
              })}
          </div>
        </div>
      )}
    </div>
  )
}

export default CountrySelector
