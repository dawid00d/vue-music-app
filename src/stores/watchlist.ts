import { defineStore } from 'pinia'
import type { Movie } from '@/types/itunes'

export const useWatchlistStore = defineStore('watchlist', () => {
  const movies: Movie[] = []

  function getMoviesCount() {
    return movies.length
  }

  function addMovie(movie: Movie) {
    if (!movies.find(m => m.id.attributes['im:id'] === movie.id.attributes['im:id'])) {
      movies.push(movie)
    }
  }

  function removeMovie(movieId: string) {
    const index = movies.findIndex(movie => movie.id.attributes['im:id'] === movieId)
    if (index !== -1) {
      movies.splice(index, 1)
    }
  }

  function clearWatchlist() {
    movies.length = 0
  }

  return {
    movies,
    getMoviesCount,
    addMovie,
    removeMovie,
    clearWatchlist
  }
}) 