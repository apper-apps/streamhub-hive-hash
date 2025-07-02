import mockVideos from '@/services/mockData/videos.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const videoService = {
  async getAll() {
    await delay(300)
    return [...mockVideos]
  },

  async getById(id) {
    await delay(200)
    const video = mockVideos.find(video => video.Id === parseInt(id))
    if (!video) {
      throw new Error('Video not found')
    }
    return { ...video }
  },

  async getByGenre(genre) {
    await delay(250)
    return mockVideos.filter(video => 
      video.genre && video.genre.includes(genre)
    ).map(video => ({ ...video }))
  },

  async getFeatured() {
    await delay(200)
    const featured = mockVideos.filter(video => video.rating >= 8.5)
    return featured.map(video => ({ ...video }))
  },

  async getTrending() {
    await delay(200)
    const trending = [...mockVideos]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 10)
    return trending.map(video => ({ ...video }))
  },

  async search(query) {
    await delay(300)
    const searchLower = query.toLowerCase()
    return mockVideos.filter(video => 
      video.title.toLowerCase().includes(searchLower) ||
      video.description.toLowerCase().includes(searchLower) ||
      (video.genre && video.genre.some(g => g.toLowerCase().includes(searchLower)))
    ).map(video => ({ ...video }))
  },

  async create(videoData) {
    await delay(400)
    const maxId = Math.max(...mockVideos.map(video => video.Id))
    const newVideo = {
      Id: maxId + 1,
      ...videoData
    }
    mockVideos.push(newVideo)
    return { ...newVideo }
  },

  async update(id, videoData) {
    await delay(300)
    const index = mockVideos.findIndex(video => video.Id === parseInt(id))
    if (index === -1) {
      throw new Error('Video not found')
    }
    mockVideos[index] = { ...mockVideos[index], ...videoData }
    return { ...mockVideos[index] }
  },

  async delete(id) {
    await delay(300)
    const index = mockVideos.findIndex(video => video.Id === parseInt(id))
    if (index === -1) {
      throw new Error('Video not found')
    }
    const deletedVideo = mockVideos.splice(index, 1)[0]
    return { ...deletedVideo }
  }
}