import React from 'react'
import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'

const CategoryFilter = ({ 
  categories, 
  activeCategory, 
  onCategoryChange,
  className = ''
}) => {
  return (
    <div className={`flex items-center space-x-4 overflow-x-auto hide-scrollbar pb-2 ${className}`}>
      <Button
        variant={activeCategory === 'all' ? 'primary' : 'ghost'}
        size="sm"
        onClick={() => onCategoryChange('all')}
      >
        All
      </Button>
      
      {categories.map((category) => (
        <motion.div
          key={category.id || category.name}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant={activeCategory === category.id || activeCategory === category.name ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => onCategoryChange(category.id || category.name)}
            className="whitespace-nowrap"
          >
            {category.name}
          </Button>
        </motion.div>
      ))}
    </div>
  )
}

export default CategoryFilter