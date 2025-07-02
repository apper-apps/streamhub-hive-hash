import React, { useState, useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import { motion } from 'framer-motion'
import VideoCard from '@/components/molecules/VideoCard'
import CategoryFilter from '@/components/molecules/CategoryFilter'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import { useUserProgress } from '@/hooks/useUserProgress'

const MyList = () => {
  const {
    onVideoPlay,
    onVideoDetails,
    onAddToList,
    onRemoveFromList,
    isVideoInList,
    userList
  } = useOutletContext()

  const [filteredList, setFilteredList] = useState([])
  const [activeFilter, setActiveFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { userProgress } = useUserProgress()

  useEffect(() => {
    loadMyList()
  }, [userList])

  useEffect(() => {
    filterList()
  }, [userList, activeFilter])

  const loadMyList = async () => {
    try {
      setLoading(true)
      setError('')
      
      // Simulate loading delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
    } catch (err) {
      setError('Failed to load your list. Please try again.')
      console.error('Error loading my list:', err)
    } finally {
      setLoading(false)
    }
  }

  const filterList = () => {
    if (activeFilter === 'all') {
      setFilteredList(userList)
    } else if (activeFilter === 'movies') {
      setFilteredList(userList.filter(video => video.type === 'movie'))
    } else if (activeFilter === 'series') {
      setFilteredList(userList.filter(video => video.type === 'series'))
    } else if (activeFilter === 'continue') {
      setFilteredList(userList.filter(video => 
        userProgress[video.Id] && userProgress[video.Id].progress > 0 && userProgress[video.Id].progress < 100
      ))
    }
  }

  const handleFilterChange = (filter) => {
    setActiveFilter(filter)
  }

  const filters = [
    { id: 'all', name: 'All' },
    { id: 'movies', name: 'Movies' },
    { id: 'series', name: 'TV Shows' },
    { id: 'continue', name: 'Continue Watching' }
  ]

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error message={error} onRetry={loadMyList} />
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-display font-bold text-white mb-2">
            My List
          </h1>
          <p className="text-gray-400">
            Your personal collection of saved content
          </p>
        </div>

        {userList.length === 0 ? (
          <Empty
            title="Your List is Empty"
            description="Start building your personal collection by adding movies and TV shows you want to watch."
            actionText="Browse Content"
            onAction={() => window.location.href = '/browse'}
            icon="Heart"
          />
        ) : (
          <>
            {/* Filter */}
            <div className="mb-8">
              <CategoryFilter
                categories={filters}
                activeCategory={activeFilter}
                onCategoryChange={handleFilterChange}
              />
            </div>

            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-400">
                {filteredList.length} {filteredList.length === 1 ? 'title' : 'titles'}
                {activeFilter !== 'all' && (
                  <span className="ml-2">
                    in <span className="text-white font-medium">
                      {filters.find(f => f.id === activeFilter)?.name}
                    </span>
                  </span>
                )}
              </p>
            </div>

            {/* Videos Grid */}
            {filteredList.length === 0 ? (
              <Empty
                title="No Content Found"
                description={`No content found in ${filters.find(f => f.id === activeFilter)?.name.toLowerCase()}.`}
                actionText="View All"
                onAction={() => setActiveFilter('all')}
              />
            ) : (
              <motion.div
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                {filteredList.map((video, index) => (
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
                      isInList={true}
                      progress={userProgress[video.Id]?.progress || 0}
                      size="md"
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default MyList