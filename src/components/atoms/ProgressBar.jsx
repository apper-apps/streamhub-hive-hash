import React from 'react'

const ProgressBar = ({ 
  progress = 0, 
  height = 'h-1', 
  showPercentage = false,
  className = '' 
}) => {
  const clampedProgress = Math.min(Math.max(progress, 0), 100)
  
  return (
    <div className={`w-full ${className}`}>
      {showPercentage && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-300">Progress</span>
          <span className="text-sm text-gray-300">{Math.round(clampedProgress)}%</span>
        </div>
      )}
      
      <div className={`w-full bg-gray-700 rounded-full overflow-hidden ${height}`}>
        <div 
          className="h-full bg-gradient-to-r from-primary to-red-600 transition-all duration-300 ease-out rounded-full"
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
    </div>
  )
}

export default ProgressBar