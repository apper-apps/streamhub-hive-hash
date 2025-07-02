import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import ApperIcon from '@/components/ApperIcon'

const HeroBanner = ({ 
  featuredVideo, 
  onPlay, 
  onAddToList, 
  onRemoveFromList,
  isInList = false 
}) => {
  const [imageLoaded, setImageLoaded] = useState(false)

  if (!featuredVideo) {
    return (
      <div className="relative h-screen bg-surface animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>
    )
  }

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={featuredVideo.thumbnail}
          alt={featuredVideo.title}
          className={`w-full h-full object-cover transition-opacity duration-1000 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Badges */}
              <div className="flex items-center space-x-3 mb-4">
                <Badge variant="primary" size="sm">
                  Featured
                </Badge>
                <Badge variant="rating" size="sm">
                  <ApperIcon name="Star" className="w-3 h-3 mr-1" />
                  {featuredVideo.rating}
                </Badge>
                <Badge variant="default" size="sm">
                  {featuredVideo.year}
                </Badge>
                <Badge variant="default" size="sm">
                  {Math.floor(featuredVideo.duration / 60)}h {featuredVideo.duration % 60}m
                </Badge>
              </div>

              {/* Title */}
              <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-4 leading-tight">
                {featuredVideo.title}
              </h1>

              {/* Description */}
              <p className="text-lg text-gray-300 mb-6 leading-relaxed max-w-xl">
                {featuredVideo.description}
              </p>

              {/* Genre Tags */}
              {featuredVideo.genre && featuredVideo.genre.length > 0 && (
                <div className="flex items-center space-x-2 mb-8">
                  {featuredVideo.genre.slice(0, 3).map((genre, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-surface/80 text-gray-300 text-sm rounded-full"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center space-x-4">
                <Button
                  variant="play"
                  size="lg"
                  icon="Play"
                  onClick={() => onPlay?.(featuredVideo)}
                  className="font-bold"
                >
                  Play Now
                </Button>

                <Button
                  variant={isInList ? "success" : "secondary"}
                  size="lg"
                  icon={isInList ? "Check" : "Plus"}
                  onClick={() => isInList ? onRemoveFromList?.(featuredVideo) : onAddToList?.(featuredVideo)}
                >
                  {isInList ? "In My List" : "Add to List"}
                </Button>

                <Button
                  variant="ghost"
                  size="lg"
                  icon="Info"
                >
                  More Info
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ApperIcon name="ChevronDown" className="w-6 h-6" />
      </motion.div>
    </div>
  )
}

export default HeroBanner