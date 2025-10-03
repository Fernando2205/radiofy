import { useState, useCallback } from 'react'
import axios from 'axios'

function useCountries (selectedServer) {
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchCountries = useCallback(async () => {
    if (!selectedServer) return

    setLoading(true)
    setError(null)

    try {
      const response = await axios.get(`${selectedServer.url}json/countries`, {
        timeout: 10000
      })

      const filteredCountries = response.data
        .filter(country => country.stationcount > 0)
        .sort((a, b) => b.stationcount - a.stationcount)

      setCountries(filteredCountries)
    } catch (error) {
      console.error('Error obteniendo países:', error)
      setError('Error al cargar países')
    } finally {
      setLoading(false)
    }
  }, [selectedServer])

  return {
    countries,
    loading,
    error,
    fetchCountries
  }
}

export default useCountries
