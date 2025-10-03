import { useEffect } from 'react'
import useRadioContext from '../hooks/useRadioContext'

function CountrySelector() {
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
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-300 mb-2">
        Seleccionar País
      </label>
      <div className="flex gap-3">
        <select
          value={currentCountry || 'Colombia'}
          onChange={(e) => {
            if (e.target.value === 'Colombia') {
              getColombianStations()
            } else {
              getStationsByCountry(e.target.value)
            }
          }}
          className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white min-w-48"
          disabled={loadingCountries}
        >
          <option value="Colombia">CO Colombia</option>
          {countries
            .filter(country => country.name !== 'Colombia') // Evitar duplicados
            .sort((a, b) => a.name.localeCompare(b.name)) // Ordenar alfabéticamente
            // .slice(0, 50) // Limitar a los primeros 50 países después del ordenamiento
            .map((country, index) => (
              <option key={index} value={country.name}>
                {country.iso_3166_1} - {country.name} 
              </option>
            ))}
        </select>
      </div>
    </div>
  )
}

export default CountrySelector