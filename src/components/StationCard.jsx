import useRadioContext from '../hooks/useRadioContext'
import { RadioIcon, PlayIcon, PauseIcon } from './icons'

function StationCard ({ station, onPlay, isPlaying }) {
  const { pauseStation } = useRadioContext()
  
  const handleImageError = (e) => {
    // Ocultar imagen rota y mostrar ícono por defecto
    e.target.style.display = 'none'
    const fallbackDiv = e.target.nextElementSibling
    if (fallbackDiv) {
      fallbackDiv.style.display = 'flex'
    }
  }

  const handlePlayClick = () => {
    if (isPlaying) {
      pauseStation()
    } else {
      onPlay(station)
    }
  }

  return (
    <div className='bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors group cursor-pointer'>
      {/* Logo de la estación */}
      <div className='aspect-square mb-3 relative' onClick={handlePlayClick}>
        {station.favicon
          ? (
            <>
              <img
                src={station.favicon}
                alt={station.name}
                onError={handleImageError}
                className='w-full h-full object-cover rounded-lg cursor-pointer'
              />
              {/* Fallback div para cuando haya error en la imagen */}
              <div className='w-full h-full bg-gray-600 rounded-lg items-center justify-center hidden '>
                <RadioIcon className='w-12 h-12 text-gray-400' />
                
              </div>
            </>
            )
          : (
            <div className='w-full h-full bg-gray-600 rounded-lg flex items-center justify-center cursor-pointer'>
              {/* Mismo div para cuando no existe favicon */}
              <RadioIcon className='w-12 h-12 text-gray-400' />
            </div>
            )}

        {/* Botón de reproducir superpuesto */}
        <button
          onClick={handlePlayClick}
          className='absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer'
        >
          {isPlaying
            ? (
              <PauseIcon className='w-8 h-8 text-white' />
              )
            : (
              <PlayIcon className='w-8 h-8 text-white' />
              )}
        </button>
      </div>

      {/* Información de la estación */}
      <div className='space-y-2'>
        <h3 className='text-white font-medium text-sm leading-tight line-clamp-2'>
          {station.name || 'Nombre no disponible'}
        </h3>

        <p className='text-gray-400 text-xs'>
          {station.country || 'País no disponible'}
        </p>

        {station.tags && station.tags.length > 0 && (
          <div className='flex flex-wrap gap-1'>
            {station.tags.split(',').slice(0, 2).map((tag, index) => (
              <span
                key={index}
                className='bg-gray-600 text-gray-300 text-xs px-2 py-1 rounded'
              >
                {tag.trim()}
              </span>
            ))}
          </div>
        )}

        {/* Información adicional */}
        <div className='flex items-center justify-between text-xs text-gray-500'>
          <span>{station.bitrate ? `${station.bitrate} kbps` : ''}</span>
          <span>{station.clickcount ? `${station.clickcount}` : ''}</span>
        </div>
      </div>
    </div>
  )
}

export default StationCard
