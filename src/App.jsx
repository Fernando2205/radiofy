import { Routes, Route, } from 'react-router-dom'
import { RadioProvider } from './context/RadioContext'
import ServerSelector from './components/ServerSelector'

function App () {
  return (
    <RadioProvider>
      <div className='min-h-screen bg-gray-900 text-white'>
        <div className='container mx-auto px-4 py-8'>
          <header className='mb-8'>
            <h1 className='text-4xl font-bold text-center mb-2'>
              RadioFy
            </h1>
            <p className='text-center text-gray-400'>
              Escucha emisoras de radio de todo el mundo
            </p>
          </header>

          <ServerSelector />

          <main>
            <Routes>
              <Route
                path='/' element={
                  <div className='text-center py-16'>
                    <p className='text-gray-400'>
                      Selecciona un servidor para comenzar a explorar emisoras
                    </p>
                  </div>
              }
              />
            </Routes>
          </main>
        </div>
      </div>
    </RadioProvider>
  )
}

export default App
