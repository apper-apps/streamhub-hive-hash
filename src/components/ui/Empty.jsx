import React from 'react'
import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const Empty = ({
  title = "No Content Available",
  description = "There's nothing to show here right now.",
  actionText = "Explore Content",
  onAction,
  icon = "Film"
}) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-20 px-4 text-center"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Icon */}
      <motion.div
        className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-surface to-gray-700 rounded-full mb-8"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      >
        <ApperIcon name={icon} className="w-12 h-12 text-gray-400" />
      </motion.div>

      {/* Title */}
      <motion.h2
        className="text-2xl font-display font-bold text-white mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {title}
      </motion.h2>

      {/* Description */}
      <motion.p
        className="text-gray-400 text-lg mb-8 max-w-md leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {description}
      </motion.p>

      {/* Action Button */}
      {onAction && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            variant="primary"
            size="lg"
            onClick={onAction}
            icon="ArrowRight"
            iconPosition="right"
          >
            {actionText}
          </Button>
        </motion.div>
      )}

      {/* Decorative Elements */}
      <motion.div
        className="mt-12 grid grid-cols-3 gap-4 opacity-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ delay: 0.8 }}
      >
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="w-20 h-12 bg-surface rounded border border-gray-700"
          />
        ))}
      </motion.div>
    </motion.div>
  )
}

export default Empty