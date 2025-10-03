import { useState, useRef, useEffect, createContext } from 'react'
import useRadio from '../hooks/useRadio'

export const RadioContext = createContext()

export function RadioProvider ({ children }) {
  const radioHook = useRadio()
  const [currentStation, setCurrentStation] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [loading, setLoading] = useState(false)
  const audioRef = useRef(null)

  const playStation = (station) => {
    if (audioRef.current) {
      setLoading(true)
      audioRef.current.src = station.url_resolved
      audioRef.current.load()
      audioRef.current.play()
        .then(() => {
          setCurrentStation(station)
          setIsPlaying(true)
        })
        .catch(error => {
          console.error('Error reproduciendo estación:', error)
          setIsPlaying(false)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }

  const pauseStation = () => {
    if (audioRef.current && isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }

  const resumeStation = () => {
    if (audioRef.current && currentStation && !isPlaying) {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true)
        })
        .catch(error => {
          console.error('Error reanudando estación:', error)
        })
    }
  }

  // Manejar eventos del elemento audio
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleLoadStart = () => setLoading(true)
    const handleCanPlay = () => setLoading(false)
    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    const handleError = (e) => {
      console.error('Error en el audio:', e)
      setIsPlaying(false)
      setLoading(false)
    }

    audio.addEventListener('loadstart', handleLoadStart)
    audio.addEventListener('canplay', handleCanPlay)
    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)
    audio.addEventListener('error', handleError)

    return () => {
      audio.removeEventListener('loadstart', handleLoadStart)
      audio.removeEventListener('canplay', handleCanPlay)
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
      audio.removeEventListener('error', handleError)
    }
  }, [])

  const value = {
    ...radioHook,
    currentStation,
    playStation,
    isPlaying,
    loading,
    pauseStation,
    resumeStation,
    setCurrentStation,
    setIsPlaying
  }

  return (
    <RadioContext.Provider value={value}>
      <audio ref={audioRef} preload='none' />
      {children}
    </RadioContext.Provider>
  )
}
