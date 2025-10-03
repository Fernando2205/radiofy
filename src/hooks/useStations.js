import { useState, useCallback } from 'react'
import axios from 'axios'

function useStations (selectedServer) {
  const [stations, setStations] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [currentCountry, setCurrentCountry] = useState(null)

  const getStationsByCountry = useCallback(async (countryName, limit = 50) => {
    if (!selectedServer) {
      setError('No hay servidor seleccionado')
      return
    }

    setLoading(true)
    setError(null)
    setCurrentCountry(countryName)

    try {
      const response = await axios.get(
        `${selectedServer.url}json/stations/bycountry/${encodeURIComponent(countryName)}`,
        {
          timeout: 15000,
          params: {
            limit,
            order: 'clickcount',
            reverse: 'true'
          }
        }
      )

      setStations(response.data || [])
    } catch (error) {
      console.error('Error obteniendo estaciones:', error)
      setError('Error al cargar estaciones. Intenta con otro servidor.')
    } finally {
      setLoading(false)
    }
  }, [selectedServer])

  // Función para cargar estaciones colombianas por defecto
  const getColombianStations = useCallback(async () => {
    await getStationsByCountry('Colombia')
  }, [getStationsByCountry])

  return {
    stations,
    loading,
    error,
    currentCountry,
    getStationsByCountry,
    getColombianStations
  }
}

export default useStations
