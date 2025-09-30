import { useState, useCallback } from 'react'
import axios from 'axios'

function useRadio () {
  const [servers, setServers] = useState([])
  const [selectedServer, setSelectedServer] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // URL base para obtener lista de servidores
  const DNS_SERVERS_URL = 'https://all.api.radio-browser.info/json/servers'

  // Función para obtener la lista de servidores
  const fetchServers = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await axios.get(DNS_SERVERS_URL)
      const serverList = response.data.map(server => ({
        name: server.name,
        ip: server.ip,
        url: `https://${server.name}`
      }))
      setServers(serverList)

      // Seleccion automática del primer servidor
      if (serverList.length > 0 && !selectedServer) {
        setSelectedServer(serverList[0])
      }
    } catch (error) {
      setError('Error al obtener los servidores disponibles')
      console.error('Error fetching servers: ', error)
    } finally {
      setLoading(false)
    }
  }, [selectedServer])

  const selectServer = useCallback((server) => {
    setSelectedServer(server)
  }, [])

  const getServerUrl = useCallback(() => {
    return selectedServer ? selectedServer.url : 'https://all.api.radio-browser.info/'
  }, [selectedServer])
  return {
    servers,
    selectedServer,
    loading,
    error,
    fetchServers,
    selectServer,
    getServerUrl
  }
}

export default useRadio
