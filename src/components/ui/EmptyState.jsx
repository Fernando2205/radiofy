import { SearchIcon } from '../common/icons'

function EmptyState ({
  icon: Icon = SearchIcon,
  iconClassName = 'w-20 h-20 text-gray-600',
  title,
  description,
  actionText,
  onAction,
  actionClassName = 'bg-white text-black hover:bg-gray-200'
}) {
  return (
    <div className='text-center py-20'>
      <Icon className={`${iconClassName} mx-auto mb-6`} />
      <h3 className='text-xl font-semibold text-white mb-2'>
        {title}
      </h3>
      <p className='text-gray-400 mb-6'>
        {description}
      </p>
      {onAction && actionText && (
        <button
          onClick={onAction}
          className={`${actionClassName} px-6 py-3 rounded-full font-medium transition-colors hover:cursor-pointer`}
        >
          {actionText}
        </button>
      )}
    </div>
  )
}

export default EmptyState
