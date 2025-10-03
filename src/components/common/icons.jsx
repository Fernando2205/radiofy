export function SpeakerIcon ({ className = 'w-6 h-6', ...props }) {
  return (
    <svg className={className} fill='currentColor' viewBox='0 0 20 20' {...props}>
      <path fillRule='evenodd' d='M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217z' clipRule='evenodd' />
    </svg>
  )
}

export function PlayIcon ({ className = 'w-6 h-6', ...props }) {
  return (
    <svg className={className} fill='currentColor' viewBox='0 0 20 20' {...props}>
      <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zM8 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z' clipRule='evenodd' />
    </svg>
  )
}

export function PauseIcon ({ className = 'w-6 h-6', ...props }) {
  return (
    <svg className={className} fill='currentColor' viewBox='0 0 20 20' {...props}>
      <path fillRule='evenodd' d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z' clipRule='evenodd' />
    </svg>
  )
}

export function StopIcon ({ className = 'w-6 h-6', ...props }) {
  return (
    <svg className={className} fill='currentColor' viewBox='0 0 20 20' {...props}>
      <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z' clipRule='evenodd' />
    </svg>
  )
}

// export function CloseIcon ({ className = 'w-5 h-5', ...props }) {
//   return (
//     <svg className={className} fill='currentColor' viewBox='0 0 20 20' {...props}>
//       <path fillRule='evenodd' d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z' clipRule='evenodd' />
//     </svg>
//   )
// }

export function SearchIcon ({ className = 'w-6 h-6', ...props }) {
  return (
    <svg className={className} fill='currentColor' viewBox='0 0 20 20' {...props}>
      <path fillRule='evenodd' d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z' clipRule='evenodd' />
    </svg>
  )
}

export function CheckIcon ({ className = 'w-4 h-4', ...props }) {
  return (
    <svg className={className} fill='currentColor' viewBox='0 0 20 20' {...props}>
      <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
    </svg>
  )
}

export function ChevronDownIcon ({ className = 'w-5 h-5', ...props }) {
  return (
    <svg
      className={className}
      fill='none'
      stroke='currentColor'
      viewBox='0 0 24 24'
      {...props}
    >
      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
    </svg>
  )
}

export function SimplePlayIcon ({ className = 'w-6 h-6', ...props }) {
  return (
    <svg className={className} fill='currentColor' viewBox='0 0 24 24' {...props}>
      <path d='M9.5 5.5v13l10-6.5z' />
    </svg>
  )
}

export function SimplePauseIcon ({ className = 'w-6 h-6', ...props }) {
  return (
    <svg className={className} fill='currentColor' viewBox='0 0 24 24' {...props}>
      <path d='M6 4h4v16H6V4zm8 0h4v16h-4V4z' />
    </svg>
  )
}

export function AllStationsIcon ({ className = 'w-6 h-6', ...props }) {
  return (
    <svg className={className} fill='currentColor' viewBox='0 0 20 20' {...props}>
      <path d='M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' />
    </svg>
  )
}

export function BaselineRadio ({ classname = 'w-6 h-6', ...props }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      className={classname} {...props}
    >
      <path
        fill='currentColor'
        d='M3.24 6.15C2.51 6.43 2 7.17 2 8v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8c0-1.11-.89-2-2-2H8.3l8.26-3.34L15.88 1zM7 20c-1.66 0-3-1.34-3-3s1.34-3 3-3s3 1.34 3 3s-1.34 3-3 3m13-8h-2v-2h-2v2H4V8h16z'
      />
    </svg>
  )
}

export function LiveIndicator ({ className = '', ...props }) {
  return (
    <div className={`flex items-center space-x-2 ${className}`} {...props}>
      <div className='flex items-center space-x-1'>
        <div className='w-1 h-2 bg-green-500 rounded animate-pulse' />
        <div className='w-1 h-3 bg-green-500 rounded animate-pulse delay-75' />
        <div className='w-1 h-2 bg-green-500 rounded animate-pulse delay-150' />
      </div>
      <span className='text-green-500 text-xs font-bold'>LIVE</span>
    </div>
  )
}

export function MenuIcon ({ className = 'w-6 h-6', ...props }) {
  return (
    <svg className={className} fill='none' stroke='currentColor' viewBox='0 0 24 24' {...props}>
      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
    </svg>
  )
}

export function CloseIcon ({ className = 'w-6 h-6', ...props }) {
  return (
    <svg className={className} fill='none' stroke='currentColor' viewBox='0 0 24 24' {...props}>
      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
    </svg>
  )
}
