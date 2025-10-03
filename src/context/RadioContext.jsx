import { useState, useRef, useEffect, createContext } from 'react'
import useRadio from '../hooks/useRadio'

export const RadioContext = createContext()

export function RadioProvider ({ children }) {
  const radioHook = useRadio()
  const [currentStation, setCurrentStation] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [loading, setLoading] = useState(false)
  const [volume, setVolume] = useState(1) // Valor de 0 a 1
  const [isMuted, setIsMuted] = useState(false)
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

  const changeVolume = (newVolume) => {
    const volumeValue = Math.max(0, Math.min(1, newVolume))
    setVolume(volumeValue)
    if (audioRef.current) {
      audioRef.current.volume = volumeValue
    }
    // Si el volumen es mayor que 0, no está muteado
    if (volumeValue > 0) {
      setIsMuted(false)
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        // Desmutear: restaurar el volumen anterior
        audioRef.current.volume = volume
        setIsMuted(false)
      } else {
        // Mutear: guardar volumen actual y poner a 0
        audioRef.current.volume = 0
        setIsMuted(true)
      }
    }
  }

  // Sincronizar volumen inicial con el elemento audio
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

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
    setIsPlaying,
    volume,
    isMuted,
    changeVolume,
    toggleMute
  }

  return (
    <RadioContext.Provider value={value}>
      <audio ref={audioRef} preload='none' />
      {children}
    </RadioContext.Provider>
  )
}
