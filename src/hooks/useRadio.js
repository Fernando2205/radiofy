import { useState, useCallback } from 'react'
import axios from 'axios'

function useRadio () {
  const [servers, setServers] = useState([])
  const [selectedServer, setSelectedServer] = useState(null)
  const [serverStatus, setServerStatus] = useState({})
  const [loading, setLoading] = useState(false)
  const [testingServers, setTestingServers] = useState(false)
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
        url: `https://${server.name}/`,
        // Crear un ID único combinando nombre e IP para casos de nombres duplicados
        id: `${server.name}-${server.ip}`
      }))

      setServers(serverList)

      // Seleccion automática del primer servidor
      if (serverList.length > 0 && !selectedServer) {
        setSelectedServer(serverList[0])
      }

      // Testear servidores automáticamente
      testAllServers(serverList)
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
        timeout: 5000
      })
      return response.status === 200
    } catch (error) {
      console.error(error)
      return false
    }
  }, [])

  // Funcion para testear todos los servidores
  const testAllServers = useCallback(async (serverList = servers) => {
    if (serverList.length === 0) return

    setTestingServers(true)
    const statusPromises = serverList.map(async (server) => {
      const isOnline = await testServerConnection(server)
      return { serverIp: server.ip, isOnline }
    })

    try {
      const results = await Promise.all(statusPromises)
      const statusMap = {}
      results.forEach(result => {
        statusMap[result.serverIp] = result.isOnline
      })
      setServerStatus(statusMap)
    } catch (error) {
      console.error('Error testing servers:', error)
    } finally {
      setTestingServers(false)
    }
  }, [servers, testServerConnection])

  const selectServer = useCallback((server) => {
    setSelectedServer(server)
  }, [])

  const getServerUrl = useCallback(() => {
    return selectedServer ? selectedServer.url : 'https://all.api.radio-browser.info/'
  }, [selectedServer])

  return {
    servers,
    selectedServer,
    serverStatus,
    loading,
    testingServers,
    error,
    fetchServers,
    selectServer,
    getServerUrl,
    testAllServers
  }
}

export default useRadio
