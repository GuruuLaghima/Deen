import { useState, useEffect } from 'react'

const supported = typeof window !== 'undefined' && 'speechSynthesis' in window

export default function SpeakButton({ text, rate = 0.72, className = '' }) {
  const [playing, setPlaying] = useState(false)

  // Annule la lecture si le composant est démonté
  useEffect(() => () => { window.speechSynthesis?.cancel() }, [])

  if (!supported) return null

  function speak(e) {
    e.stopPropagation() // Ne pas retourner la flashcard
    window.speechSynthesis.cancel()
    const utt = new SpeechSynthesisUtterance(text)
    utt.lang = 'ar-SA'
    utt.rate = rate
    utt.pitch = 1.0
    utt.onstart = () => setPlaying(true)
    utt.onend   = () => setPlaying(false)
    utt.onerror = () => setPlaying(false)
    window.speechSynthesis.speak(utt)
  }

  return (
    <button
      className={`speak-btn${playing ? ' playing' : ''}${className ? ` ${className}` : ''}`}
      onClick={speak}
      title="Écouter la prononciation"
      aria-label="Écouter"
    >
      {playing ? '◼' : '🔊'}
    </button>
  )
}
