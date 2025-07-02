import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

export const useUserList = () => {
  const [userList, setUserList] = useState([])

  useEffect(() => {
    loadUserList()
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

  const saveUserList = (list) => {
    try {
      localStorage.setItem('streamhub_user_list', JSON.stringify(list))
      setUserList(list)
    } catch (error) {
      console.error('Error saving user list:', error)
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

  return {
    userList,
    addToList,
    removeFromList,
    isInList,
    clearList
  }
}