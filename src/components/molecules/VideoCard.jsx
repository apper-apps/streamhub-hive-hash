import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Badge from '@/components/atoms/Badge'
import ProgressBar from '@/components/atoms/ProgressBar'
import ApperIcon from '@/components/ApperIcon'

const VideoCard = ({ 
  video, 
  onPlay, 
  onAddToList, 
  onRemoveFromList,
  onViewDetails,
  isInList = false,
  progress = 0,
  size = 'md',
  showProgress = true,
  className = ''
}) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  const sizes = {
    sm: 'w-48 h-28',
    md: 'w-60 h-36',
    lg: 'w-72 h-40',
    xl: 'w-80 h-48'
  }

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  const handleImageError = () => {
    setImageError(true)
    setImageLoaded(true)
  }

  return (
    <motion.div
      className={`relative group cursor-pointer ${sizes[size]} ${className}`}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      onClick={() => onViewDetails?.(video)}
    >
      {/* Thumbnail */}
      <div className="relative w-full h-full rounded-lg overflow-hidden bg-surface">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-surface shimmer rounded-lg" />
        )}
        
        {imageError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-surface text-gray-400">
            <ApperIcon name="Image" className="w-12 h-12" />
          </div>
        ) : (
          <img
            src={video.thumbnail}
            alt={video.title}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        )}

        {/* Progress Bar */}
        {showProgress && progress > 0 && (
          <div className="absolute bottom-0 left-0 right-0">
            <ProgressBar progress={progress} height="h-1" />
          </div>
        )}

        {/* Rating Badge */}
        <div className="absolute top-2 left-2">
          <Badge variant="rating" size="xs">
            <ApperIcon name="Star" className="w-3 h-3 mr-1" />
            {video.rating}
          </Badge>
        </div>

        {/* Duration Badge */}
        <div className="absolute top-2 right-2">
          <Badge variant="default" size="xs">
            {Math.floor(video.duration / 60)}h {video.duration % 60}m
          </Badge>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation()
                onPlay?.(video)
              }}
              className="bg-white bg-opacity-90 hover:bg-opacity-100 text-black p-3 rounded-full transition-all duration-200"
            >
              <ApperIcon name="Play" className="w-6 h-6" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation()
                isInList ? onRemoveFromList?.(video) : onAddToList?.(video)
              }}
              className="bg-surface bg-opacity-90 hover:bg-opacity-100 text-white p-3 rounded-full transition-all duration-200"
            >
              <ApperIcon name={isInList ? "Check" : "Plus"} className="w-6 h-6" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Video Info */}
      <div className="mt-3 px-1">
        <h3 className="text-white font-semibold text-sm line-clamp-2 mb-1">
          {video.title}
        </h3>
        
        <div className="flex items-center space-x-2 text-xs text-gray-400">
          <span>{video.year}</span>
          <span>•</span>
          <span className="capitalize">{video.type}</span>
          {video.genre && video.genre.length > 0 && (
            <>
              <span>•</span>
              <span>{video.genre[0]}</span>
            </>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default VideoCard