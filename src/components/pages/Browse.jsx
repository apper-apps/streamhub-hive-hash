import React, { useState, useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import { motion } from 'framer-motion'
import VideoCard from '@/components/molecules/VideoCard'
import CategoryFilter from '@/components/molecules/CategoryFilter'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import { videoService } from '@/services/api/videoService'
import { categoryService } from '@/services/api/categoryService'
import { useUserProgress } from '@/hooks/useUserProgress'

const Browse = () => {
  const {
    onVideoPlay,
    onVideoDetails,
    onAddToList,
    onRemoveFromList,
    isVideoInList,
    userList
  } = useOutletContext()

  const [videos, setVideos] = useState([])
  const [categories, setCategories] = useState([])
  const [filteredVideos, setFilteredVideos] = useState([])
  const [activeCategory, setActiveCategory] = useState('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { userProgress } = useUserProgress()

  useEffect(() => {
    loadBrowseData()
  }, [])

  useEffect(() => {
    filterVideos()
  }, [videos, activeCategory, categories])

  const loadBrowseData = async () => {
    try {
      setLoading(true)
      setError('')
      
      const [allVideos, allCategories] = await Promise.all([
        videoService.getAll(),
        categoryService.getAll()
      ])

      setVideos(allVideos)
      setCategories(allCategories)

    } catch (err) {
      setError('Failed to load browse content. Please try again.')
      console.error('Error loading browse data:', err)
    } finally {
      setLoading(false)
    }
  }

  const filterVideos = () => {
    if (activeCategory === 'all') {
      setFilteredVideos(videos)
    } else {
      const category = categories.find(cat => cat.Id === activeCategory || cat.name === activeCategory)
      if (category && category.videos) {
        setFilteredVideos(category.videos)
      } else {
        // Filter by genre if category not found
        const filtered = videos.filter(video => 
          video.genre && video.genre.includes(activeCategory)
        )
        setFilteredVideos(filtered)
      }
    }
  }

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId)
  }

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error message={error} onRetry={loadBrowseData} />
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-display font-bold text-white mb-2">
            Browse Content
          </h1>
          <p className="text-gray-400">
            Discover your next favorite movie or TV show
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-400">
            {filteredVideos.length} {filteredVideos.length === 1 ? 'title' : 'titles'} found
            {activeCategory !== 'all' && (
              <span className="ml-2">
                in <span className="text-white font-medium">
                  {categories.find(cat => cat.Id === activeCategory || cat.name === activeCategory)?.name || activeCategory}
                </span>
              </span>
            )}
          </p>
        </div>

        {/* Videos Grid */}
        {filteredVideos.length === 0 ? (
          <Empty
            title="No Content Found"
            description="We couldn't find any content matching your current filter. Try selecting a different category."
            actionText="View All Content"
            onAction={() => setActiveCategory('all')}
          />
        ) : (
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {filteredVideos.map((video, index) => (
              <motion.div
                key={video.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <VideoCard
                  video={video}
                  onPlay={onVideoPlay}
                  onAddToList={onAddToList}
                  onRemoveFromList={onRemoveFromList}
                  onViewDetails={onVideoDetails}
                  isInList={isVideoInList(video)}
                  progress={userProgress[video.Id]?.progress || 0}
                  size="md"
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Browse