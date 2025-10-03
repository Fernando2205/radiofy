import { useState, useCallback, useEffect } from 'react'
import axios from 'axios'

function useServers () {
  const [servers, setServers] = useState([])
  const [selectedServer, setSelectedServer] = useState(null)
  const [serverStatus, setServerStatus] = useState({})
  const [loading, setLoading] = useState(false)
  const [testingServers, setTestingServers] = useState(false)
  const [error, setError] = useState(null)

  // URL base para obtener lista de servidores
  const SERVERS_URL = 'https://all.api.radio-browser.info/json/servers'

  // Función para obtener la lista de servidores
  const fetchServers = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await axios.get(SERVERS_URL)
      const serverList = response.data.map(server => ({
        name: server.name,
        ip: server.ip,
        url: `https://${server.name}/`
      }))

      setServers(serverList)

      // Selección automática del primer servidor
      if (serverList.length > 0 && !selectedServer) {
        setSelectedServer(serverList[0])
      }
    } catch (err) {
      setError('Error al obtener servidores disponibles')
      console.error('Error fetching servers:', err)
    } finally {
      setLoading(false)
    }
  }, [selectedServer])

  // Función para testear conexion a un servidor especifico
  const testServerConnection = useCallback(async (server) => {
    try {
      const response = await axios.get(`${server.url}json/stats`, {
        timeout: 10000
      })
      return response.status === 200
    } catch (error) {
      console.error(error)
      return false
    }
  }, [])

  // Función que prueba y actualiza estado de un  servidor
  const testSingleServer = useCallback(async (server) => {
    if (!server) return

    setTestingServers(true)
    try {
      const isOnline = await testServerConnection(server)
      setServerStatus(prev => ({
        ...prev,
        [server.ip]: isOnline
      }))
    } catch (error) {
      console.error('Error testing server:', error)
      setServerStatus(prev => ({
        ...prev,
        [server.ip]: false
      }))
    } finally {
      setTestingServers(false)
    }
  }, [testServerConnection])

  const selectServer = useCallback((server) => {
    setSelectedServer(server)
  }, [])

  // Probar conectividad cuando cambia el servidor seleccionado
  useEffect(() => {
    if (selectedServer) {
      testSingleServer(selectedServer)
    }
  }, [selectedServer, testSingleServer])

  return {
    servers,
    selectedServer,
    serverStatus,
    loading,
    testingServers,
    error,
    fetchServers,
    selectServer,
    testSingleServer,

  }
}

export default useServers
