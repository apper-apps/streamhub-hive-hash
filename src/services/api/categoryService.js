import mockCategories from '@/services/mockData/categories.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const categoryService = {
  async getAll() {
    await delay(250)
    return mockCategories.map(category => ({
      ...category,
      videos: category.videos || []
    }))
  },

  async getById(id) {
    await delay(200)
    const category = mockCategories.find(cat => cat.Id === parseInt(id))
    if (!category) {
      throw new Error('Category not found')
    }
    return {
      ...category,
      videos: category.videos || []
    }
  },

  async create(categoryData) {
    await delay(400)
    const maxId = Math.max(...mockCategories.map(cat => cat.Id))
    const newCategory = {
      Id: maxId + 1,
      videos: [],
      ...categoryData
    }
    mockCategories.push(newCategory)
    return { ...newCategory }
  },

  async update(id, categoryData) {
    await delay(300)
    const index = mockCategories.findIndex(cat => cat.Id === parseInt(id))
    if (index === -1) {
      throw new Error('Category not found')
    }
    mockCategories[index] = { ...mockCategories[index], ...categoryData }
    return { ...mockCategories[index] }
  },

  async delete(id) {
    await delay(300)
    const index = mockCategories.findIndex(cat => cat.Id === parseInt(id))
    if (index === -1) {
      throw new Error('Category not found')
    }
    const deletedCategory = mockCategories.splice(index, 1)[0]
    return { ...deletedCategory }
  }
}