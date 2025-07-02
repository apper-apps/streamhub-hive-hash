import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Header from '@/components/organisms/Header'
import VideoModal from '@/components/organisms/VideoModal'
import { useUserList } from '@/hooks/useUserList'

const Layout = () => {
  const navigate = useNavigate()
  const { userList, addToList, removeFromList } = useUserList()
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSearch = (query) => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`)
    }
  }

  const handleVideoPlay = (video) => {
    console.log('Playing video:', video.title)
    // Here you would typically integrate with a video player
    setIsModalOpen(false)
  }

  const handleVideoDetails = (video) => {
    setSelectedVideo(video)
    setIsModalOpen(true)
  }

  const handleAddToList = (video) => {
    addToList(video)
  }

  const handleRemoveFromList = (video) => {
    removeFromList(video.Id)
  }

  const isVideoInList = (video) => {
    return userList.some(item => item.Id === video.Id)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={handleSearch} />
      
      <main className="pt-20">
        <Outlet context={{
          onVideoPlay: handleVideoPlay,
          onVideoDetails: handleVideoDetails,
          onAddToList: handleAddToList,
          onRemoveFromList: handleRemoveFromList,
          isVideoInList,
          userList
        }} />
      </main>

      <VideoModal
        video={selectedVideo}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPlay={handleVideoPlay}
        onAddToList={handleAddToList}
        onRemoveFromList={handleRemoveFromList}
        isInList={selectedVideo ? isVideoInList(selectedVideo) : false}
      />
    </div>
  )
}

export default Layout