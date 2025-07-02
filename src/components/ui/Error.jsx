import React from 'react'
import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const Error = ({ 
  message = "Something went wrong", 
  onRetry,
  title = "Oops! We encountered an error"
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <motion.div
        className="text-center max-w-lg"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Error Icon */}
        <motion.div
          className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-error to-red-600 rounded-full mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <ApperIcon name="AlertTriangle" className="w-12 h-12 text-white" />
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-3xl font-display font-bold text-white mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {title}
        </motion.h1>

        {/* Message */}
        <motion.p
          className="text-gray-400 text-lg mb-8 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {message}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {onRetry && (
            <Button
              variant="primary"
              size="lg"
              onClick={onRetry}
              icon="RefreshCw"
              className="w-full sm:w-auto"
            >
              Try Again
            </Button>
          )}
          
          <Button
            variant="secondary"
            size="lg"
            onClick={() => window.location.href = '/'}
            icon="Home"
            className="w-full sm:w-auto"
          >
            Go Home
          </Button>
        </motion.div>

        {/* Additional Help */}
        <motion.div
          className="mt-12 p-6 bg-surface rounded-lg border border-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-white font-semibold mb-2 flex items-center">
            <ApperIcon name="HelpCircle" className="w-5 h-5 mr-2 text-info" />
            Need Help?
          </h3>
          <p className="text-gray-400 text-sm">
            If this problem persists, try refreshing the page or check your internet connection.
            Our streaming service is designed to work seamlessly across all devices.
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Error