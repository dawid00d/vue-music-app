<template>
    <div class="container mx-auto px-4 py-8">
        <div v-if="loading" class="flex justify-center items-center h-64">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>

        <div v-else-if="error" class="text-center text-red-600">
            {{ error }}
        </div>

        <div v-else-if="movie" class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="relative aspect-[2/3] rounded-lg overflow-hidden bg-gray-100">
                <img :src="movie['im:image'][2].label" :alt="movie['im:name'].label"
                    class="w-full h-full object-cover" />
            </div>
            <div class="space-y-6">
                <h1 class="text-3xl font-bold text-gray-900">{{ movie['im:name'].label }}</h1>
                <p class="text-xl text-gray-600">{{ movie['im:artist'].label }}</p>

                <div class="flex items-center gap-4 text-sm text-gray-500">
                    <span>{{ movie['im:releaseDate'].label.split('-')[0] }}</span>
                    <span>{{ movie.category.attributes.label }}</span>
                </div>

                <div class="prose max-w-none">
                    <p class="text-gray-700">{{ movie.summary.label }}</p>
                </div>

                <div class="flex items-center gap-4">
                    <span class="text-lg font-semibold text-gray-900">{{ movie['im:price'].label }}</span>
                    <span v-if="movie['im:rentalPrice']" class="text-lg font-semibold text-gray-900">
                        Wypożycz: {{ movie['im:rentalPrice'].label }}
                    </span>
                </div>

                <div class="flex gap-4">
                    <a :href="movie.link[0].attributes.href" target="_blank"
                        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                        <ArrowTopRightOnSquareIcon class="h-4 w-4 mr-2" />
                        Otwórz w iTunes
                    </a>
                    <button @click="addToWatchlist"
                        class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                        <EyeIcon class="h-4 w-4 mr-2" />
                        Dodaj do listy
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowTopRightOnSquareIcon, EyeIcon } from '@heroicons/vue/24/outline'
import { itunesLookupService } from '@/api'
import { useWatchlistStore } from '@/stores/watchlist'
import type { Movie } from '@/types/itunes'

const route = useRoute()
const watchlistStore = useWatchlistStore()

const movie = ref<Movie | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

const fetchMovieDetails = async () => {
    loading.value = true
    error.value = null
    try {
        const { data } = await itunesLookupService.getMovieById(route.params.id as string)
        movie.value = data.results[0]
    } catch (err) {
        console.error('Błąd podczas pobierania szczegółów filmu:', err)
    } finally {
        loading.value = false
    }
}

const addToWatchlist = () => {
    if (movie.value) {
        watchlistStore.addMovie(movie.value)
    }
}

onMounted(() => {
    fetchMovieDetails()
})
</script>