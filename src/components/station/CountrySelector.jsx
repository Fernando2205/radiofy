import { useEffect } from 'react'
import useRadioContext from '../../hooks/useRadioContext'

function CountrySelector () {
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

  if (!selectedServer) return null

  return (
    <div className='flex items-center gap-2'>
      <select
        value={currentCountry || 'Colombia'}
        onChange={(e) => {
          if (e.target.value === 'Colombia') {
            getColombianStations()
          } else {
            getStationsByCountry(e.target.value)
          }
        }}
        className='bg-gray-800 hover:bg-gray-700 border-0 rounded-full px-4 py-2 text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors cursor-pointer min-w-40 h-12'
        disabled={loadingCountries}
      >
        <option value='Colombia' className='bg-gray-800'>CO - Colombia</option>
        {countries
          .filter(country => country.name !== 'Colombia')
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((country, index) => (
            <option key={index} value={country.name} className='bg-gray-800'>
              {country.iso_3166_1} - {country.name}
            </option>
          ))}
      </select>

    </div>
  )
}

export default CountrySelector
