import React from 'react'

const Badge = ({ 
  children, 
  variant = 'default', 
  size = 'sm',
  className = '' 
}) => {
  const baseClasses = "inline-flex items-center justify-center font-medium rounded-full"
  
  const variants = {
    default: "bg-gray-600 text-white",
    primary: "bg-gradient-to-r from-primary to-red-600 text-white",
    success: "bg-gradient-to-r from-success to-green-600 text-white",
    warning: "bg-gradient-to-r from-warning to-yellow-600 text-black",
    error: "bg-gradient-to-r from-error to-red-600 text-white",
    info: "bg-gradient-to-r from-info to-blue-600 text-white",
    rating: "bg-warning text-black font-bold"
  }
  
  const sizes = {
    xs: "px-2 py-1 text-xs",
    sm: "px-2.5 py-1.5 text-sm",
    md: "px-3 py-2 text-base",
    lg: "px-4 py-2.5 text-lg"
  }
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`
  
  return (
    <span className={classes}>
      {children}
    </span>
  )
}

export default Badge