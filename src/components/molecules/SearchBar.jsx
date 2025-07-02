import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Input from '@/components/atoms/Input'
import Button from '@/components/atoms/Button'

const SearchBar = ({ 
  onSearch, 
  placeholder = "Search for movies, TV shows...",
  value = '',
  onChange,
  onFocus,
  onBlur,
  expanded = false,
  className = ''
}) => {
  const [isExpanded, setIsExpanded] = useState(expanded)
  const [searchValue, setSearchValue] = useState(value)

  useEffect(() => {
    setSearchValue(value)
  }, [value])

  const handleInputChange = (e) => {
    const newValue = e.target.value
    setSearchValue(newValue)
    onChange?.(e)
    onSearch?.(newValue)
  }

  const handleFocus = (e) => {
    setIsExpanded(true)
    onFocus?.(e)
  }

  const handleBlur = (e) => {
    if (!searchValue.trim()) {
      setIsExpanded(false)
    }
    onBlur?.(e)
  }

  const handleClear = () => {
    setSearchValue('')
    onChange?.({ target: { value: '' } })
    onSearch?.('')
  }

  return (
    <div className={`relative ${className}`}>
      <AnimatePresence>
        {(isExpanded || expanded) ? (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 'auto', opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="flex items-center"
          >
            <div className="relative">
              <Input
                type="text"
                placeholder={placeholder}
                value={searchValue}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                icon="Search"
                className="pr-10 min-w-80"
              />
              
              {searchValue && (
                <button
                  onClick={handleClear}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </motion.div>
        ) : (
          <Button
            variant="ghost"
            onClick={() => setIsExpanded(true)}
            icon="Search"
            className="p-2"
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default SearchBar