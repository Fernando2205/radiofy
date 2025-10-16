import { CloseIcon, SearchIcon } from '../common/icons'

function SearchBar ({ searchTerm, setSearchTerm }) {
  return (
    <div className='relative'>
      <SearchIcon className='w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
      <input
        type='text'
        placeholder='¿Qué quieres escuchar?'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className='w-full bg-[#242424] border-0 rounded-full pl-10 pr-10 py-3 text-white placeholder-[#6a6a6a] focus:outline-none focus:ring-2 focus:ring-green-500'
      />
      {searchTerm && (
        <button
          onClick={() => setSearchTerm('')}
          className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white cursor-pointer'
        >
          <CloseIcon className='w-5 h-5' />
        </button>
      )}
    </div>
  )
}

export default SearchBar
