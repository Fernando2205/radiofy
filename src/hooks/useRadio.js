import useServers from './useServers'
import useStations from './useStations'
import useCountries from './useCountries'

function useRadio () {
  const serverHook = useServers()
  const stationsHook = useStations(serverHook.selectedServer)
  const countriesHook = useCountries(serverHook.selectedServer)

  return {
    // FUNCIONALIDADES

    // Servidores
    ...serverHook,

    // Estaciones
    stations: stationsHook.stations,
    loadingStations: stationsHook.loading,
    stationsError: stationsHook.error,
    currentCountry: stationsHook.currentCountry,
    getColombianStations: stationsHook.getColombianStations,
    getStationsByCountry: stationsHook.getStationsByCountry,

    // Países
    countries: countriesHook.countries,
    loadingCountries: countriesHook.loading,
    countriesError: countriesHook.error,
    fetchCountries: countriesHook.fetchCountries,
  }
}

export default useRadio
