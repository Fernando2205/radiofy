import { useState, useRef, useEffect } from 'react'
import { VolumeIcon, VolumeOffIcon, VolumeMuteIcon } from '../common/icons'
import useRadioContext from '../../hooks/useRadioContext'

function VolumeControl ({ className = '' }) {
  const { volume, isMuted, changeVolume, toggleMute } = useRadioContext()
  const [showSlider, setShowSlider] = useState(false)
  const sliderRef = useRef(null)

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value)
    changeVolume(newVolume)
  }

  // Actualizar la variable CSS para el gradiente del slider
  useEffect(() => {
    if (sliderRef.current) {
      const volumePercent = isMuted ? 0 : volume * 100
      sliderRef.current.style.setProperty('--volume-percent', `${volumePercent}%`)
    }
  }, [volume, isMuted])

  const getVolumeIcon = () => {
    if (isMuted || volume === 0) {
      return <VolumeMuteIcon className='w-4 h-4' />
    } else if (volume < 0.5) {
      return <VolumeOffIcon className='w-4 h-4' />
    } else {
      return <VolumeIcon className='w-4 h-4' />
    }
  }

  const displayVolume = isMuted ? 0 : volume

  return (
    <div
      className={`flex items-center space-x-2 relative ${className}`}
      onMouseEnter={() => setShowSlider(true)}
      onMouseLeave={() => setShowSlider(false)}
    >
      {/* Botón de volumen */}
      <button
        onClick={toggleMute}
        className='text-gray-400 hover:text-white transition-colors p-1'
        title={isMuted ? 'Activar sonido' : 'Silenciar'}
      >
        {getVolumeIcon()}
      </button>

      {/* Slider de volumen - se muestra al hacer hover */}
      <div className={`transition-all duration-200 ease-out ${showSlider ? 'opacity-100 w-20' : 'opacity-0 w-0'} overflow-hidden`}>
        <div className='flex items-center space-x-2'>
          <input
            ref={sliderRef}
            type='range'
            min='0'
            max='1'
            step='0.01'
            value={displayVolume}
            onChange={handleVolumeChange}
            className='volume-slider w-full h-1 rounded-lg appearance-none cursor-pointer transition-all'
          />
          <span className='text-xs text-gray-400 w-8 text-center font-mono'>
            {Math.round(displayVolume * 100)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default VolumeControl
