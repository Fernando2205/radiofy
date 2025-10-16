import useRadioContext from '../../hooks/useRadioContext'
import { SimplePlayIcon, SimplePauseIcon } from '../common/icons'
import StationAvatar from '../ui/StationAvatar'

function StationCard ({ station, onPlay, isPlaying }) {
  const { pauseStation } = useRadioContext()

  const handlePlayClick = () => {
    if (isPlaying) {
      pauseStation()
    } else {
      onPlay(station)
    }
  }

  return (
    <div className='group bg-gray-900/40 hover:bg-gray-800/60 rounded-lg p-4 transition-all duration-500 ease-out transform hover:scale-105'>
      {/* Logo de la estación */}
      <div className='aspect-square mb-4 relative' onClick={handlePlayClick}>
        <StationAvatar
          src={station.favicon}
          alt={station.name}
          size='w-full h-full'
          fallbackIconSize='w-12 h-12'
          className='cursor-pointer shadow-lg'
        />

        {/* Botón de reproducir */}
        <button
          className='absolute bottom-2 right-2 w-12 h-12 bg-green-500 hover:bg-green-400 rounded-full flex items-center justify-center shadow-lg transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:scale-105 cursor-pointer'
        >
          {isPlaying
            ? (
              <SimplePauseIcon className='w-6 h-6 text-black' />
              )
            : (
              <SimplePlayIcon className='w-6 h-6 text-black' />
              )}
        </button>
      </div>

      {/* Información de la estación */}
      <div className='space-y-1 cursor-default'>
        <h3 className='text-white font-semibold text-sm leading-tight line-clamp-2 group-hover:text-green-400 transition-colors'>
          {station.name || 'Nombre no disponible'}
        </h3>

        <p className='text-gray-400 text-xs font-medium'>
          {station.country || 'País no disponible'}
        </p>

        {station.tags && station.tags.length > 0 && (
          <p className='text-gray-500 text-xs line-clamp-1'>
            {station.tags.split(',').slice(0, 3).map(tag => tag.trim()).join(' • ')}
          </p>
        )}
      </div>
    </div>
  )
}

export default StationCard
