import { useState, useEffect } from 'react'

export const useUserProgress = () => {
  const [userProgress, setUserProgress] = useState({})

  useEffect(() => {
    loadUserProgress()
  }, [])

  const loadUserProgress = () => {
    try {
      const saved = localStorage.getItem('streamhub_user_progress')
      if (saved) {
        setUserProgress(JSON.parse(saved))
      }
    } catch (error) {
      console.error('Error loading user progress:', error)
    }
  }

  const saveUserProgress = (progress) => {
    try {
      localStorage.setItem('streamhub_user_progress', JSON.stringify(progress))
      setUserProgress(progress)
    } catch (error) {
      console.error('Error saving user progress:', error)
    }
  }

  const updateProgress = (videoId, progress, completed = false) => {
    const newProgress = {
      ...userProgress,
      [videoId]: {
        progress: Math.min(Math.max(progress, 0), 100),
        lastWatched: new Date().toISOString(),
        completed
      }
    }
    saveUserProgress(newProgress)
  }

  const getProgress = (videoId) => {
    return userProgress[videoId] || { progress: 0, lastWatched: null, completed: false }
  }

  const clearProgress = (videoId) => {
    const newProgress = { ...userProgress }
    delete newProgress[videoId]
    saveUserProgress(newProgress)
  }

  const clearAllProgress = () => {
    saveUserProgress({})
  }

  return {
    userProgress,
    updateProgress,
    getProgress,
    clearProgress,
    clearAllProgress
  }
}