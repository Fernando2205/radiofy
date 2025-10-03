export function LoadingIcon ({ className = 'w-12 h-12', ...props }) {
  return (
    <div className={`animate-spin rounded-full ${className} border-b-2 border-green-500 mx-auto mb-4`} {...props} />
  )
}
export function LoadingSpinner ({ className = 'w-6 h-6', ...props }) {
  return (
    <div className={`${className} animate-spin rounded-full border-2 border-current border-t-transparent`} {...props} />
  )
}
