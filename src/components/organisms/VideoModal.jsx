import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import ApperIcon from '@/components/ApperIcon'

const VideoModal = ({ 
  video, 
  isOpen, 
  onClose, 
  onPlay, 
  onAddToList, 
  onRemoveFromList,
  isInList = false 
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!video) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            className="relative bg-surface rounded-xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200"
            >
              <ApperIcon name="X" className="w-6 h-6" />
            </button>

            {/* Hero Section */}
            <div className="relative h-96 overflow-hidden">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onPlay?.(video)}
                  className="bg-white/90 hover:bg-white text-black p-6 rounded-full transition-all duration-200 shadow-xl"
                >
                  <ApperIcon name="Play" className="w-12 h-12" />
                </motion.button>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              {/* Title and Badges */}
              <div className="mb-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Badge variant="rating" size="sm">
                    <ApperIcon name="Star" className="w-3 h-3 mr-1" />
                    {video.rating}
                  </Badge>
                  <Badge variant="default" size="sm">
                    {video.year}
                  </Badge>
                  <Badge variant="default" size="sm">
                    {Math.floor(video.duration / 60)}h {video.duration % 60}m
                  </Badge>
                  <Badge variant="info" size="sm">
                    {video.type}
                  </Badge>
                </div>

                <h1 className="text-4xl font-display font-bold text-white mb-4">
                  {video.title}
                </h1>
              </div>

              {/* Description */}
              <div className="mb-8">
                <p className="text-gray-300 text-lg leading-relaxed">
                  {video.description}
                </p>
              </div>

              {/* Genres */}
              {video.genre && video.genre.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-white font-semibold mb-3">Genres</h3>
                  <div className="flex flex-wrap gap-2">
                    {video.genre.map((genre, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-700 text-gray-300 text-sm rounded-full"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center space-x-4">
                <Button
                  variant="play"
                  size="lg"
                  icon="Play"
                  onClick={() => onPlay?.(video)}
                >
                  Play Now
                </Button>

                <Button
                  variant={isInList ? "success" : "secondary"}
                  size="lg"
                  icon={isInList ? "Check" : "Plus"}
                  onClick={() => isInList ? onRemoveFromList?.(video) : onAddToList?.(video)}
                >
                  {isInList ? "Remove from List" : "Add to My List"}
                </Button>

                <Button variant="ghost" size="lg" icon="Share">
                  Share
                </Button>
              </div>

              {/* Additional Info */}
              <div className="mt-8 pt-8 border-t border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-white font-semibold mb-2">Details</h4>
                    <div className="space-y-2 text-gray-300">
                      <p><span className="text-white">Release Year:</span> {video.year}</p>
                      <p><span className="text-white">Duration:</span> {Math.floor(video.duration / 60)}h {video.duration % 60}m</p>
                      <p><span className="text-white">Type:</span> {video.type}</p>
                      <p><span className="text-white">Rating:</span> {video.rating}/10</p>
                    </div>
                  </div>
                  
                  {video.genre && video.genre.length > 0 && (
                    <div>
                      <h4 className="text-white font-semibold mb-2">Categories</h4>
                      <p className="text-gray-300">{video.genre.join(', ')}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default VideoModal