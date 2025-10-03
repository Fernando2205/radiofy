export function RadioIcon({ className = "w-6 h-6", ...props }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20" {...props}>
      <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217z" clipRule="evenodd" />
    </svg>
  )
}

export function PlayIcon({ className = "w-6 h-6", ...props }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20" {...props}>
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
    </svg>
  )
}

export function PauseIcon({ className = "w-6 h-6", ...props }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20" {...props}>
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
  )
}

export function StopIcon({ className = "w-6 h-6", ...props }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20" {...props}>
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
    </svg>
  )
}

export function CloseIcon({ className = "w-5 h-5", ...props }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20" {...props}>
      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  )
}

export function SearchIcon({ className = "w-6 h-6", ...props }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20" {...props}>
      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
    </svg>
  )
}

export function CheckIcon({ className = "w-4 h-4", ...props }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20" {...props}>
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  )
}

export function ChevronDownIcon({ className = "w-5 h-5", ...props }) {
  return (
    <svg 
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  )
}

export function LoadingSpinner({ className = "w-6 h-6", ...props }) {
  return (
    <div className={`${className} animate-spin rounded-full border-2 border-current border-t-transparent`} {...props}></div>
  )
}