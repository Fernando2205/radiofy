import { SpeakerIcon } from '../common/icons'

function StationAvatar ({
  src,
  alt,
  size = 'w-12 h-12',
  fallbackIconSize = 'w-6 h-6',
  className = '',
  rounded = 'rounded-md'
}) {
  const handleImageError = (e) => {
    e.target.style.display = 'none'
    const fallback = e.target.nextElementSibling
    if (fallback) {
      fallback.style.display = 'flex'
    }
  }

  return (
    <div className={`${size} flex-shrink-0 ${className}`}>
      {src
        ? (
          <>
            <img
              src={src}
              alt={alt}
              className={`w-full h-full object-cover ${rounded}`}
              onError={handleImageError}
            />
            <div className={`w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 ${rounded} items-center justify-center hidden`}>
              <SpeakerIcon className={`${fallbackIconSize} text-gray-400`} />
            </div>
          </>
          )
        : (
          <div className={`w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 ${rounded} flex items-center justify-center`}>
            <SpeakerIcon className={`${fallbackIconSize} text-gray-400`} />
          </div>
          )}
    </div>
  )
}

export default StationAvatar
