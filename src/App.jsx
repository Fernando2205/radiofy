import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { RadioProvider } from './context/RadioContext'
import { Sidebar, Header, NowPlaying } from './components'
import Home from './pages/Home'

function App () {
  const [sidebarVisible, setSidebarVisible] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const handleToggleSidebar = () => {
    setIsTransitioning(true)
    setSidebarVisible(!sidebarVisible)
    setTimeout(() => {
      setIsTransitioning(false)
    }, 500) // Duración de la transición en ms
  }

  return (
    <RadioProvider>
      <div className='h-screen bg-black/95 text-white flex flex-col overflow-hidden relative'>
        {/* Layout principal */}
        <div className={`flex flex-1 p-2 min-h-0 relative ${sidebarVisible ? 'gap-2' : 'gap-0'}`}>
          {/* Sidebar */}
          <div className={`transition-all duration-500 ease-in-out ${
            sidebarVisible
              ? 'w-72 opacity-100 transform translate-x-0'
              : 'w-0 opacity-0 transform -translate-x-full'
          }`}
          >
            <div className={`w-72 h-full transition-all duration-500 ease-in-out ${
              sidebarVisible ? 'scale-100' : 'scale-95'
            }`}
            >
              <Sidebar />
            </div>
          </div>

          {/* Contenido principal */}
          <main className='flex-1 bg-black rounded-lg overflow-hidden flex flex-col min-h-0'>
            <Header sidebarVisible={sidebarVisible} onToggleSidebar={handleToggleSidebar} />

            {/* Área de scroll del contenido */}
            <section className='flex-1 overflow-y-auto px-6 pb-6 min-h-0 thin-scrollbar'>
              <Routes>
                <Route path='/' element={<Home isTransitioning={isTransitioning} />} />

              </Routes>
            </section>
          </main>
        </div>

        {/* Reproductor */}
        <div className={`absolute bottom-2 right-6 h-20 z-50 transition-all duration-500 ease-out ${
          sidebarVisible ? 'left-80' : 'left-6'
        }`}
        >
          <NowPlaying />
        </div>
      </div>
    </RadioProvider>
  )
}

export default App
