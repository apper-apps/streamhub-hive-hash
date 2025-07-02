import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

export const useUserProfile = () => {
  const [userList, setUserList] = useState([])
  const [currentProfile, setCurrentProfile] = useState(null)
  const [showProfileSelector, setShowProfileSelector] = useState(false)

  useEffect(() => {
    loadUserList()
    loadCurrentProfile()
  }, [])
const loadUserList = () => {
    try {
      const savedList = localStorage.getItem('streamhub_user_list')
      if (savedList) {
        setUserList(JSON.parse(savedList))
      }
    } catch (error) {
      console.error('Error loading user list:', error)
    }
  }

  const loadCurrentProfile = () => {
    try {
      const savedProfile = localStorage.getItem('streamhub_current_profile')
      if (savedProfile) {
        setCurrentProfile(JSON.parse(savedProfile))
      } else {
        setShowProfileSelector(true)
      }
    } catch (error) {
      console.error('Error loading current profile:', error)
      setShowProfileSelector(true)
    }
  }

  const saveUserList = (list) => {
    try {
      localStorage.setItem('streamhub_user_list', JSON.stringify(list))
      setUserList(list)
    } catch (error) {
      console.error('Error saving user list:', error)
    }
  }

  const saveCurrentProfile = (profile) => {
    try {
      localStorage.setItem('streamhub_current_profile', JSON.stringify(profile))
      setCurrentProfile(profile)
      setShowProfileSelector(false)
      toast.success(`Switched to ${profile.name}'s profile`)
    } catch (error) {
      console.error('Error saving current profile:', error)
      toast.error('Failed to switch profile')
    }
  }
  const addToList = (video) => {
    const isAlreadyInList = userList.some(item => item.Id === video.Id)
    
    if (isAlreadyInList) {
      toast.info(`${video.title} is already in your list`)
      return
    }

    const newList = [...userList, video]
    saveUserList(newList)
    toast.success(`Added ${video.title} to your list`)
  }

  const removeFromList = (videoId) => {
    const video = userList.find(item => item.Id === videoId)
    const newList = userList.filter(item => item.Id !== videoId)
    saveUserList(newList)
    
    if (video) {
      toast.success(`Removed ${video.title} from your list`)
    }
  }

  const isInList = (videoId) => {
    return userList.some(item => item.Id === videoId)
  }

  const clearList = () => {
    saveUserList([])
    toast.success('Your list has been cleared')
  }

const switchProfile = () => {
    setShowProfileSelector(true)
  }

  const selectProfile = (profile) => {
    saveCurrentProfile(profile)
  }

  return {
    userList,
    addToList,
    removeFromList,
    isInList,
    clearList,
    currentProfile,
    showProfileSelector,
    switchProfile,
    selectProfile,
    setShowProfileSelector
  }
}