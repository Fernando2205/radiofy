import { SpeakerIcon, AllStationsIcon, SearchIcon, BaselineRadio } from '../common/icons'
import useRadioContext from '../../hooks/useRadioContext'

function Sidebar () {
  const { getStationsByCountry, currentCountry } = useRadioContext()

  const popularCountries = [
    { name: 'Colombia', displayName: '🇨🇴 Colombia' },
    { name: 'The United States Of America', displayName: '🇺🇸 Estados Unidos' },
    { name: 'Spain', displayName: '🇪🇸 España' },
    { name: 'Mexico', displayName: '🇲🇽 México' },
    { name: 'Argentina', displayName: '🇦🇷 Argentina' }
  ]

  const handleCountryClick = (countryName) => {
    getStationsByCountry(countryName)
  }

  return (
    <div className='w-72 h-full bg-black rounded-lg p-6 flex flex-col gap-6 overflow-hidden '>
      {/* Logo y título */}
      <div className='flex items-center gap-2 cursor-pointer group'>
        <BaselineRadio className='w-8 h-8 text-green-500 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 ' />
        <span className='text-2xl font-bold text-white '>RadioFy</span>
      </div>

      {/* Navegación principal */}
      <nav className='flex flex-col gap-4'>
        <div className='flex flex-col gap-2'>
          <h3 className='text-gray-400 text-sm font-medium uppercase tracking-wider mb-2'>
            Explorar
          </h3>

          <div className='flex items-center gap-3 text-gray-400 hover:text-white transition-colors  py-1'>
            <AllStationsIcon className='w-6 h-6' />
            <span className='font-medium'>Todas las Estaciones</span>
          </div>

          <div className='flex items-center gap-3 text-gray-400 hover:text-white transition-colors  py-1'>
            <SearchIcon className='w-6 h-6' />
            <span className='font-medium'>Buscar</span>
          </div>
        </div>
      </nav>

      {/* Países populares */}
      <div className='flex-1 overflow-hidden flex flex-col'>
        <h3 className='text-gray-400 text-sm font-medium uppercase tracking-wider mb-4 flex-shrink-0'>
          Países Populares
        </h3>

        <div className='flex flex-col gap-1 overflow-y-auto flex-1 thin-scrollbar'>
          {popularCountries.map((country, index) => (
            <div
              key={index}
              onClick={() => handleCountryClick(country.name)}
              className={`flex items-center gap-3 rounded-md px-3 py-2 cursor-pointer transition-all ${
                currentCountry === country.name
                  ? 'bg-green-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              <span className='text-sm font-medium'>{country.displayName}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer del sidebar */}
      <div className='pt-4 border-t border-gray-800 '>
        <div className='text-xs text-gray-500 space-y-1'>
          <p>RadioFy - Streaming Radio</p>
          <a
            href='https://github.com/Fernando2205'
            target='_blank'
            className='text-green-400 hover:text-green-300 transition-colors underline hover:no-underline inline-block' rel='noreferrer'

          >
            Delio Palacios
          </a>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
