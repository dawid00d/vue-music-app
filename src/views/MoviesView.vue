<template>
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold mb-8">Top 100 Filmów</h1>

        <div v-if="loading" class="flex justify-center items-center h-64">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>

        <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert">
            <strong class="font-bold">Błąd!</strong>
            <span class="block sm:inline">{{ error }}</span>
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <MovieCard v-for="movie in movies" :key="movie.id.attributes['im:id']" :title="movie['im:name'].label"
                :director="movie['im:artist'].label" :image="movie['im:image'][2].label"
                :year="movie['im:releaseDate'].attributes.label" :category="movie.category.attributes.label"
                :description="movie.summary.label" :movie="movie" />
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Movie } from '@/types/itunes'
import { itunesRssService } from '@/api'
import MovieCard from '@/components/cards/MovieCard.vue'

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
