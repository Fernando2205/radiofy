import { Routes, Route } from 'react-router-dom'
import { RadioProvider } from './context/RadioContext'
import Header from './components/Header'
import Home from './pages/Home'
import NowPlaying from './components/NowPlaying'
function App () {
  return (
    <RadioProvider>
      <div className='min-h-screen bg-gray-900 text-white pb-20'>
        <Header />

        <div className='container mx-auto px-4 py-8'>
          <main>
            <Routes>
              <Route
                path='/' element={<Home />}
              />
            </Routes>
          </main>
        </div>
        
        <NowPlaying />
      </div>
    </RadioProvider>
  )
}

export default App
