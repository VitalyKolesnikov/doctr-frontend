import { useState, useRef, useCallback } from 'react'

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

export default function useSpeechRecognition() {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [error, setError] = useState(null)
  const recognitionRef = useRef(null)
  const isSupported = !!SpeechRecognition

  const startListening = useCallback(() => {
    if (!isSupported) return

    setError(null)
    const recognition = new SpeechRecognition()
    recognition.lang = 'ru-RU'
    recognition.interimResults = true
    recognition.continuous = true

    recognition.onresult = (event) => {
      let interim = ''
      let final = ''
      for (let i = 0; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          final += event.results[i][0].transcript
        } else {
          interim += event.results[i][0].transcript
        }
      }
      setTranscript(final + interim)
    }

    recognition.onerror = (event) => {
      if (event.error === 'not-allowed') {
        setError('Доступ к микрофону запрещён')
      } else if (event.error === 'no-speech') {
        setError('Речь не обнаружена')
      } else {
        setError(`Ошибка: ${event.error}`)
      }
      setIsListening(false)
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    recognitionRef.current = recognition
    recognition.start()
    setIsListening(true)
    setTranscript('')
  }, [isSupported])

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      recognitionRef.current = null
    }
  }, [])

  return { isListening, transcript, error, isSupported, startListening, stopListening }
}
