import useRadioContext from '../hooks/useRadioContext'
import { RadioIcon, PlayIcon, PauseIcon, LoadingSpinner } from './icons'

function NowPlaying() {
  const { 
    currentStation, 
    isPlaying, 
    loading,
    pauseStation, 
    resumeStation, 
    stopStation 
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
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 px-4 py-3 z-50">
      <div className="flex items-center max-w-7xl mx-auto">
        
        {/* Información de la estación */}
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <div className="w-12 h-12 flex-shrink-0">
            {currentStation.favicon ? (
              <img
                src={currentStation.favicon}
                alt={currentStation.name}
                className="w-full h-full object-cover rounded"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.nextElementSibling.style.display = 'flex'
                }}
              />
            ) : null}
            <div className={`w-full h-full bg-gray-600 rounded flex items-center justify-center ${currentStation.favicon ? 'hidden' : ''}`}>
              <RadioIcon className="w-6 h-6 text-gray-400" />
            </div>
          </div>
          
          <div className="min-w-0 flex-1">
            <p className="text-white font-medium text-sm truncate">
              {currentStation.name}
            </p>
            <p className="text-gray-400 text-xs truncate">
              {currentStation.country}
              {currentStation.bitrate && ` • ${currentStation.bitrate} kbps`}
            </p>
          </div>
        </div>

        {/* Controles de reproducción */}
        <div className="flex items-center flex-shrink-0 mx-4">
          <button
            onClick={handlePlayPause}
            disabled={loading}
            className="bg-white text-gray-900 rounded-full p-2 hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? (
              <LoadingSpinner className="w-6 h-6 text-gray-900" />
            ) : isPlaying ? (
              <PauseIcon className="w-6 h-6" />
            ) : (
              <PlayIcon className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Status indicator */}
        <div className="flex items-center space-x-2 flex-shrink-0 ml-4">
          { (
            <div className="flex items-center space-x-1">
              <div className="w-1 h-3 bg-green-500 rounded animate-pulse"></div>
              <div className="w-1 h-2 bg-green-500 rounded animate-pulse delay-75"></div>
              <div className="w-1 h-4 bg-green-500 rounded animate-pulse delay-150"></div>
              <span className="text-green-500 text-xs font-medium ml-1">EN VIVO</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default NowPlaying