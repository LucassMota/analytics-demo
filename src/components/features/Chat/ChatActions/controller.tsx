import { useEffect, useState } from 'react'
import { EChatModality } from '../types'

export const useChatActions = () => {
  const [modality, setModality] = useState<EChatModality>(EChatModality.NORMAL)

  const handleModalityChange = (newModality: EChatModality) => {
    setModality(newModality)
    localStorage.setItem('chatModality', newModality)
  }

  useEffect(() => {
    const storedModality = localStorage.getItem('chatModality')
    if (storedModality) {
      setModality(storedModality as EChatModality)
    }
  }, [])

  return {
    modality,
    handleModalityChange
  }
}
