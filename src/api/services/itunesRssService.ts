import itunesRssClient from '../clients/itunesRssClient'

export default {
  async getTopAlbums() {
    const response = await itunesRssClient.get(`/topalbums/limit=100/json`)
    return response
  },
  async getTopMovies() {
    const response = await itunesRssClient.get(`/topmovies/limit=100/json`)
    return response
  }
} 