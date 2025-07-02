import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import profileService from '@/services/api/profileService'
import { toast } from 'react-toastify'

const ProfileSelector = ({ onSelectProfile, onClose }) => {
  const [profiles, setProfiles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadProfiles()
  }, [])

  const loadProfiles = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await profileService.getAll()
      setProfiles(data)
    } catch (err) {
      setError('Failed to load profiles')
      toast.error('Failed to load profiles')
    } finally {
      setLoading(false)
    }
  }

  const handleProfileSelect = (profile) => {
    onSelectProfile(profile)
    if (onClose) {
      onClose()
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-accent">Loading profiles...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <ApperIcon name="AlertCircle" size={48} className="text-error mx-auto mb-4" />
          <p className="text-error mb-4">{error}</p>
          <Button onClick={loadProfiles} variant="primary">
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-4xl"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-accent mb-4">
            Who's watching?
          </h1>
          <p className="text-gray-400 text-lg">
            Select your profile to continue
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 mb-8">
          {profiles.map((profile) => (
            <motion.div
              key={profile.Id}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center cursor-pointer group"
              onClick={() => handleProfileSelect(profile)}
            >
              <div className="relative mb-4">
                <div 
                  className={`w-24 h-24 md:w-32 md:h-32 rounded-lg ${profile.color} flex items-center justify-center text-white text-2xl md:text-3xl font-bold transition-all duration-300 group-hover:ring-4 group-hover:ring-primary group-hover:ring-opacity-50`}
                >
                  {profile.avatar ? (
                    <img 
                      src={profile.avatar} 
                      alt={profile.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <span>{profile.name.charAt(0).toUpperCase()}</span>
                  )}
                </div>
                {profile.isKidsProfile && (
                  <div className="absolute -top-2 -right-2 bg-warning text-black rounded-full p-1">
                    <ApperIcon name="Baby" size={16} />
                  </div>
                )}
              </div>
              <h3 className="text-accent text-sm md:text-base font-medium text-center group-hover:text-primary transition-colors duration-300">
                {profile.name}
              </h3>
            </motion.div>
          ))}
          
          {/* Add New Profile Option */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center cursor-pointer group"
            onClick={() => toast.info('Add new profile functionality coming soon!')}
          >
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-lg border-2 border-dashed border-gray-600 flex items-center justify-center transition-all duration-300 group-hover:border-primary">
              <ApperIcon name="Plus" size={32} className="text-gray-600 group-hover:text-primary" />
            </div>
            <h3 className="text-gray-400 text-sm md:text-base font-medium text-center mt-4 group-hover:text-primary transition-colors duration-300">
              Add Profile
            </h3>
          </motion.div>
        </div>

        {onClose && (
          <div className="text-center">
            <Button 
              onClick={onClose} 
              variant="outline" 
              size="md"
              className="px-8"
            >
              Cancel
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default ProfileSelector