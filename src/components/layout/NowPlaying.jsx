import useRadioContext from '../../hooks/useRadioContext'
import { PlayIcon, PauseIcon, LiveIndicator } from '../common/icons'
import { LoadingSpinner } from '../common/loaders'
import StationAvatar from '../ui/StationAvatar'
import VolumeControl from '../ui/VolumeControl'

function NowPlaying () {
  const {
    currentStation,
    isPlaying,
    loading,
    pauseStation,
    resumeStation
  } = useRadioContext()

  if (!currentStation) return null

  const handlePlayPause = () => {
    if (isPlaying) {
      pauseStation()
    } else {
      resumeStation()
    }
  }

  return (
    <div className='h-full bg-gradient-to-r from-[#121212] to-black backdrop-blur-md border border-gray-700 rounded-lg px-6 flex items-center shadow-2xl animate-slide-up-fade'>
      {/* Información de la estación */}
      <div className='flex items-center space-x-4 flex-1 min-w-0'>
        <StationAvatar
          src={currentStation.favicon}
          alt={currentStation.name}
          size='w-12 h-12'
        />

        <div className='min-w-0 flex-1'>
          <p className='text-white font-medium text-sm truncate'>
            {currentStation.name}
          </p>
          <div className='flex items-center space-x-2 text-xs text-gray-400 truncate'>
            <span className='truncate'>{currentStation.country}</span>
            {currentStation.bitrate && (
              <>
                <span className='flex-shrink-0'>•</span>
                <span className='flex-shrink-0'>{currentStation.bitrate} kbps</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Espaciador flexible */}
      <div className='w-6 flex-shrink-0' />

      {/* Control de reproducción */}
      <div className='flex items-center space-x-4 flex-shrink-0'>
        <button
          onClick={handlePlayPause}
          disabled={loading}
          className='w-10 h-10 bg-green-500  text-black rounded-full flex items-center justify-center hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer '
        >
          {loading
            ? (
              <LoadingSpinner className='w-5 h-5 text-black' />
              )
            : isPlaying
              ? (
                <PauseIcon className='w-5 h-5' />
                )
              : (
                <PlayIcon className='w-5 h-5' />
                )}
        </button>

        {/* Control de volumen */}
        <VolumeControl />

        {/* Indicador LIVE */}
        <LiveIndicator />

      </div>
    </div>
  )
}

export default NowPlaying
