import React, { useState, useEffect } from 'react'
import { useOutletContext, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import VideoCard from '@/components/molecules/VideoCard'
import SearchBar from '@/components/molecules/SearchBar'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import { videoService } from '@/services/api/videoService'
import { useUserProgress } from '@/hooks/useUserProgress'

const Search = () => {
  const {
    onVideoPlay,
    onVideoDetails,
    onAddToList,
    onRemoveFromList,
    isVideoInList,
    userList
  } = useOutletContext()

  const [searchParams, setSearchParams] = useSearchParams()
  const [allVideos, setAllVideos] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const { userProgress } = useUserProgress()

  useEffect(() => {
    loadAllVideos()
  }, [])

  useEffect(() => {
    const query = searchParams.get('q') || ''
    setSearchQuery(query)
    if (query.trim()) {
      performSearch(query)
    } else {
      setSearchResults([])
    }
  }, [searchParams, allVideos])

  const loadAllVideos = async () => {
    try {
      setLoading(true)
      setError('')
      
      const videos = await videoService.getAll()
      setAllVideos(videos)

    } catch (err) {
      setError('Failed to load search data. Please try again.')
      console.error('Error loading search data:', err)
    } finally {
      setLoading(false)
    }
  }

  const performSearch = async (query) => {
    setIsSearching(true)
    
    // Simulate search delay for better UX
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const results = allVideos.filter(video => {
      const searchLower = query.toLowerCase()
      return (
        video.title.toLowerCase().includes(searchLower) ||
        video.description.toLowerCase().includes(searchLower) ||
        (video.genre && video.genre.some(g => g.toLowerCase().includes(searchLower)))
      )
    })
    
    setSearchResults(results)
    setIsSearching(false)
  }

  const handleSearchChange = (e) => {
    const query = e.target.value
    setSearchQuery(query)
    
    if (query.trim()) {
      setSearchParams({ q: query })
    } else {
      setSearchParams({})
    }
  }

  const handleSearchSubmit = (query) => {
    if (query.trim()) {
      setSearchParams({ q: query })
    } else {
      setSearchParams({})
    }
  }

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error message={error} onRetry={loadAllVideos} />
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-display font-bold text-white mb-6">
            Search
          </h1>
          
          <SearchBar
            value={searchQuery}
            onChange={handleSearchChange}
            onSearch={handleSearchSubmit}
            placeholder="Search for movies, TV shows, genres..."
            expanded={true}
            className="max-w-2xl"
          />
        </div>

        {/* Search Results */}
        <div className="mb-6">
          {searchQuery.trim() && (
            <div className="flex items-center justify-between">
              <p className="text-gray-400">
                {isSearching ? (
                  "Searching..."
                ) : (
                  <>
                    {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'} for
                    <span className="text-white font-medium ml-1">"{searchQuery}"</span>
                  </>
                )}
              </p>
              
              {searchQuery.trim() && (
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setSearchParams({})
                  }}
                  className="text-primary hover:text-white transition-colors text-sm"
                >
                  Clear search
                </button>
              )}
            </div>
          )}
        </div>

        {/* Results Grid */}
        {!searchQuery.trim() ? (
          <Empty
            title="Start Your Search"
            description="Enter a movie title, TV show, or genre to find your next favorite content."
            icon="Search"
          />
        ) : isSearching ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {Array.from({ length: 12 }).map((_, index) => (
              <div key={index} className="w-60 h-36 bg-surface shimmer rounded-lg" />
            ))}
          </div>
        ) : searchResults.length === 0 ? (
          <Empty
            title="No Results Found"
            description={`We couldn't find any content matching "${searchQuery}". Try searching with different keywords or check your spelling.`}
            actionText="Browse All Content"
            onAction={() => window.location.href = '/browse'}
          />
        ) : (
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {searchResults.map((video, index) => (
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

export default Search