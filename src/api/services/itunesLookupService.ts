import itunesLookupClient from '../clients/itunesLookupClient'

export default {
  async getAlbumById(id: string) {
    const response = await itunesLookupClient.get(`/lookup?id=${id}&entity=song`)
    return response
  },
  async getMovieById(id: string) {
    const response = await itunesLookupClient.get(`/lookup?id=${id}`)
    return response
  },
  async getAlbumSongs(id: string) {
    const response = await itunesLookupClient.get(`/lookup?id=${id}&entity=song`)
    return response
  }
} 