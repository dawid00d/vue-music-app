<template>
  <div class="w-full">
    <div class="space-y-8">
      <section>
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-2xl font-bold text-gray-900">Top Filmy</h2>
        </div>
        <p class="text-sm text-gray-500 mb-6">Najlepsze filmy dla Ciebie</p>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <MovieCard v-for="movie in movies.slice(0, 8)" :key="movie.id.attributes['im:id']"
            :title="movie['im:name'].label" :director="movie['im:artist'].label" :image="movie['im:image'][2].label"
            :year="movie['im:releaseDate'].label.split('-')[0]" :category="movie.category.attributes.label"
            :description="movie.summary.label" :movie="movie" />
        </div>
      </section>
      <section>
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-2xl font-bold text-gray-900">Nowości</h2>
        </div>
        <p class="text-sm text-gray-500 mb-6">Najnowsze premiery</p>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <MovieCard v-for="movie in movies.slice(8, 16)" :key="movie.id.attributes['im:id']"
            :title="movie['im:name'].label" :director="movie['im:artist'].label" :image="movie['im:image'][2].label"
            :year="movie['im:releaseDate'].label.split('-')[0]" :category="movie.category.attributes.label"
            :description="movie.summary.label" :movie="movie" />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Movie } from '@/types/itunes'
import MovieCard from '@/components/cards/MovieCard.vue'
import { itunesRssService } from '@/api'

const movies = ref<Movie[]>([])
const loading = ref(false)
const error = ref<string | null>(null)


const fetchMovies = async () => {
  loading.value = true
  error.value = null
  try {
    const { data } = await itunesRssService.getTopMovies()
    movies.value = data.feed.entry
  } catch (err) {
    console.error('Błąd podczas pobierania filmów:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchMovies()
})
</script>