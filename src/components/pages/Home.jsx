import React, { useState, useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import { motion } from 'framer-motion'
import HeroBanner from '@/components/organisms/HeroBanner'
import VideoCarousel from '@/components/organisms/VideoCarousel'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import { videoService } from '@/services/api/videoService'
import { categoryService } from '@/services/api/categoryService'
import { useUserProgress } from '@/hooks/useUserProgress'

const Home = () => {
  const {
    onVideoPlay,
    onVideoDetails,
    onAddToList,
    onRemoveFromList,
    isVideoInList,
    userList
  } = useOutletContext()

  const [featuredVideo, setFeaturedVideo] = useState(null)
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { userProgress } = useUserProgress()

  useEffect(() => {
    loadHomeData()
  }, [])

  const loadHomeData = async () => {
    try {
      setLoading(true)
      setError('')
      
      const [allVideos, allCategories] = await Promise.all([
        videoService.getAll(),
        categoryService.getAll()
      ])

      // Set featured video (highest rated)
      const featured = allVideos.reduce((prev, current) => 
        (prev.rating > current.rating) ? prev : current
      )
      setFeaturedVideo(featured)

      // Set categories with videos
      const categoriesWithVideos = allCategories.map(category => ({
        ...category,
        videos: category.videos || []
      }))
      setCategories(categoriesWithVideos)

    } catch (err) {
      setError('Failed to load content. Please try again.')
      console.error('Error loading home data:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error message={error} onRetry={loadHomeData} />
  }

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <HeroBanner
        featuredVideo={featuredVideo}
        onPlay={onVideoPlay}
        onAddToList={onAddToList}
        onRemoveFromList={onRemoveFromList}
        isInList={featuredVideo ? isVideoInList(featuredVideo) : false}
      />

      {/* Content Sections */}
      <div className="relative z-10 -mt-32 space-y-12 pb-20">
        <div className="container mx-auto px-4">
          {/* Continue Watching */}
          {Object.keys(userProgress).length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <VideoCarousel
                title="Continue Watching"
                videos={Object.keys(userProgress).map(videoId => {
                  // Find video by ID from all categories
                  for (const category of categories) {
                    const video = category.videos.find(v => v.Id.toString() === videoId)
                    if (video) return video
                  }
                  return null
                }).filter(Boolean)}
                onVideoPlay={onVideoPlay}
                onAddToList={onAddToList}
                onRemoveFromList={onRemoveFromList}
                onVideoDetails={onVideoDetails}
                userProgress={userProgress}
                userList={userList}
                className="mb-12"
              />
            </motion.div>
          )}

          {/* Category Carousels */}
          {categories.map((category, index) => (
            <motion.div
              key={category.Id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="mb-12"
            >
              <VideoCarousel
                title={category.name}
                videos={category.videos}
                onVideoPlay={onVideoPlay}
                onAddToList={onAddToList}
                onRemoveFromList={onRemoveFromList}
                onVideoDetails={onVideoDetails}
                userProgress={userProgress}
                userList={userList}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home