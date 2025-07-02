import mockProfiles from '@/services/mockData/profiles.json'

class ProfileService {
  constructor() {
    this.profiles = [...mockProfiles]
    this.lastId = Math.max(...this.profiles.map(p => p.Id), 0)
  }

  // Simulate network delay
  delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms))

  async getAll() {
    await this.delay()
    return [...this.profiles]
  }

  async getById(id) {
    await this.delay()
    
    if (!Number.isInteger(id) || id <= 0) {
      throw new Error('Invalid profile ID')
    }

    const profile = this.profiles.find(p => p.Id === id)
    if (!profile) {
      throw new Error('Profile not found')
    }
    
    return { ...profile }
  }

  async create(profileData) {
    await this.delay()
    
    // Generate new ID
    this.lastId += 1
    
    const newProfile = {
      Id: this.lastId,
      name: profileData.name || 'New Profile',
      avatar: profileData.avatar || null,
      color: profileData.color || 'bg-blue-500',
      isKidsProfile: profileData.isKidsProfile || false,
      preferences: profileData.preferences || {
        language: 'en',
        maturityRating: 'PG-13',
        autoPlay: true
      },
      createdAt: new Date().toISOString(),
      lastActive: new Date().toISOString()
    }
    
    this.profiles.push(newProfile)
    
    return { ...newProfile }
  }

  async update(id, profileData) {
    await this.delay()
    
    if (!Number.isInteger(id) || id <= 0) {
      throw new Error('Invalid profile ID')
    }

    const index = this.profiles.findIndex(p => p.Id === id)
    if (index === -1) {
      throw new Error('Profile not found')
    }

    // Don't allow ID updates
    const { Id, ...updateData } = profileData
    
    const updatedProfile = {
      ...this.profiles[index],
      ...updateData,
      Id: id, // Keep original ID
      lastActive: new Date().toISOString()
    }
    
    this.profiles[index] = updatedProfile
    
    return { ...updatedProfile }
  }

  async delete(id) {
    await this.delay()
    
    if (!Number.isInteger(id) || id <= 0) {
      throw new Error('Invalid profile ID')
    }

    const index = this.profiles.findIndex(p => p.Id === id)
    if (index === -1) {
      throw new Error('Profile not found')
    }

    const deletedProfile = this.profiles[index]
    this.profiles.splice(index, 1)
    
    return { ...deletedProfile }
  }

  async getByUserId(userId) {
    await this.delay()
    
    const userProfiles = this.profiles.filter(p => p.userId === userId)
    return userProfiles.map(p => ({ ...p }))
  }

  async setActiveProfile(id) {
    await this.delay()
    
    if (!Number.isInteger(id) || id <= 0) {
      throw new Error('Invalid profile ID')
    }

    const profile = await this.getById(id)
    
    // Update last active timestamp
    await this.update(id, { lastActive: new Date().toISOString() })
    
    return profile
  }
}

// Create singleton instance
const profileService = new ProfileService()

export default profileService