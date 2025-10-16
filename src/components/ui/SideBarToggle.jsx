import { CloseIcon, MenuIcon } from '../common/icons'

function SidebarToggle ({ sidebarVisible, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className='group relative p-2 text-gray-400 hover:text-white transition-all duration-300 rounded-md hover:bg-[#242424] hover:scale-105 cursor-pointer'
      title={sidebarVisible ? 'Ocultar sidebar' : 'Mostrar sidebar'}
    >
      <div className='relative w-5 h-5'>
        {/* Icono de menú */}
        <div className={`absolute inset-0 transform transition-all duration-300 ${
          sidebarVisible
            ? 'opacity-0 rotate-180 scale-75'
            : 'opacity-100 rotate-0 scale-100'
        }`}
        >
          <MenuIcon className='w-5 h-5' />
        </div>

        {/* Icono de cerrar */}
        <div className={`absolute inset-0 transform transition-all duration-300 ${
          sidebarVisible
            ? 'opacity-100 rotate-0 scale-100'
            : 'opacity-0 rotate-180 scale-75'
        }`}
        >
          <CloseIcon className='w-5 h-5' />
        </div>
      </div>

    </button>
  )
}
export default SidebarToggle
