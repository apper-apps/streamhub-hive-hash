import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import SearchBar from '@/components/molecules/SearchBar'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const Header = ({ onSearch }) => {
  const location = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchQuery(value)
    onSearch?.(value)
  }

  const navigationItems = [
    { name: 'Home', path: '/', icon: 'Home' },
    { name: 'Browse', path: '/browse', icon: 'Grid3X3' },
    { name: 'My List', path: '/my-list', icon: 'Heart' },
  ]

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-red-600 rounded-lg flex items-center justify-center">
                <ApperIcon name="Play" className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-display font-bold gradient-text">
                StreamHub
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                  location.pathname === item.path
                    ? 'text-white bg-surface'
                    : 'text-gray-300 hover:text-white hover:bg-surface/50'
                }`}
              >
                <ApperIcon name={item.icon} className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Search & Actions */}
          <div className="flex items-center space-x-4">
            {location.pathname !== '/search' && (
              <SearchBar
                value={searchQuery}
                onChange={handleSearchChange}
                onSearch={onSearch}
                placeholder="Search movies, shows..."
              />
            )}

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button variant="ghost" icon="Menu" className="p-2" />
            </div>

            {/* User Menu */}
            <div className="hidden md:flex items-center space-x-2">
              <Button variant="ghost" icon="Bell" className="p-2" />
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-red-600 rounded-full flex items-center justify-center">
                <ApperIcon name="User" className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden mt-4 flex items-center justify-around bg-surface/50 backdrop-blur-sm rounded-lg p-2">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-all duration-200 ${
                location.pathname === item.path
                  ? 'text-white bg-primary'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <ApperIcon name={item.icon} className="w-5 h-5" />
              <span className="text-xs font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </motion.header>
  )
}

export default Header