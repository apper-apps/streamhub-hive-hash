import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import VideoCard from '@/components/molecules/VideoCard'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const VideoCarousel = ({ 
  title, 
  videos, 
  onVideoPlay, 
  onAddToList, 
  onRemoveFromList,
  onVideoDetails,
  userProgress = {},
  userList = [],
  className = ''
}) => {
  const scrollRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const scroll = (direction) => {
    const container = scrollRef.current
    if (!container) return

    const scrollAmount = container.offsetWidth * 0.8
    const newScrollLeft = direction === 'left' 
      ? container.scrollLeft - scrollAmount
      : container.scrollLeft + scrollAmount

    container.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    })

    // Update button states after animation
    setTimeout(() => {
      setCanScrollLeft(container.scrollLeft > 0)
      setCanScrollRight(container.scrollLeft < container.scrollWidth - container.offsetWidth)
    }, 300)
  }

  const handleScroll = () => {
    const container = scrollRef.current
    if (!container) return

    setCanScrollLeft(container.scrollLeft > 0)
    setCanScrollRight(container.scrollLeft < container.scrollWidth - container.offsetWidth - 10)
  }

  if (!videos || videos.length === 0) {
    return null
  }

  return (
    <div className={`relative group ${className}`}>
      {/* Section Title */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <Button variant="ghost" size="sm" className="text-primary hover:text-white">
          View All
          <ApperIcon name="ChevronRight" className="w-4 h-4 ml-1" />
        </Button>
      </div>

      {/* Carousel Container */}
      <div className="relative">
        {/* Left Arrow */}
        {canScrollLeft && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/80 hover:bg-black/90 text-white p-2 rounded-full transition-all duration-200"
            onClick={() => scroll('left')}
          >
            <ApperIcon name="ChevronLeft" className="w-6 h-6" />
          </motion.button>
        )}

        {/* Right Arrow */}
        {canScrollRight && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/80 hover:bg-black/90 text-white p-2 rounded-full transition-all duration-200"
            onClick={() => scroll('right')}
          >
            <ApperIcon name="ChevronRight" className="w-6 h-6" />
          </motion.button>
        )}

        {/* Videos Container */}
        <div
          ref={scrollRef}
          className="flex space-x-4 overflow-x-auto hide-scrollbar pb-4"
          onScroll={handleScroll}
        >
          {videos.map((video) => (
            <VideoCard
              key={video.Id}
              video={video}
              onPlay={onVideoPlay}
              onAddToList={onAddToList}
              onRemoveFromList={onRemoveFromList}
              onViewDetails={onVideoDetails}
              isInList={userList.some(item => item.Id === video.Id)}
              progress={userProgress[video.Id]?.progress || 0}
              size="md"
              className="flex-shrink-0"
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default VideoCarousel