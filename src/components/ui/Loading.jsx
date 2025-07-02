import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Loading = ({ message = "Loading content..." }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        {/* Logo with animation */}
        <motion.div
          className="flex items-center justify-center mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-16 h-16 bg-gradient-to-r from-primary to-red-600 rounded-xl flex items-center justify-center mr-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <ApperIcon name="Play" className="w-8 h-8 text-white" />
            </motion.div>
          </div>
          <span className="text-3xl font-display font-bold gradient-text">
            StreamHub
          </span>
        </motion.div>

        {/* Loading animation */}
        <motion.div
          className="flex items-center justify-center space-x-2 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-primary rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>

        {/* Loading message */}
        <motion.p
          className="text-gray-400 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {message}
        </motion.p>

        {/* Skeleton content preview */}
        <motion.div
          className="mt-12 space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {/* Hero banner skeleton */}
          <div className="w-full h-64 bg-surface shimmer rounded-lg mx-auto max-w-4xl" />
          
          {/* Carousel skeletons */}
          <div className="space-y-8">
            {[1, 2, 3].map((section) => (
              <div key={section} className="space-y-4">
                <div className="h-6 bg-surface shimmer rounded w-48" />
                <div className="flex space-x-4 overflow-hidden">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <div
                      key={item}
                      className="w-60 h-36 bg-surface shimmer rounded-lg flex-shrink-0"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Loading