<template>
    <div class="group cursor-pointer">
        <router-link :to="{ name: 'movie-details', params: { id: movie.id.attributes['im:id'] } }" class="block">
            <div class="relative aspect-[2/3] rounded-lg overflow-hidden bg-gray-100">
                <img :src="image" :alt="`Film ${title}`"
                    class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                <div class="absolute top-2 right-2 z-10">
                    <button @click.stop="addToWatchlist"
                        class="p-2 rounded-full bg-white/90 text-gray-900 shadow-md hover:bg-white transition-colors duration-300">
                        <EyeIcon class="h-5 w-5" />
                    </button>
                </div>
                <div
                    class="absolute bottom-0 left-0 right-0 bg-white/95 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <div class="flex items-center justify-between mb-2">
                        <span class="text-sm font-medium text-gray-900">Pokaż więcej</span>
                        <a :href="movie.link[0].attributes.href" target="_blank"
                            class="text-gray-500 hover:text-gray-700">
                            <ArrowTopRightOnSquareIcon class="h-4 w-4" />
                        </a>
                    </div>
                    <p v-if="description" class="text-xs text-gray-600 line-clamp-3 leading-relaxed">{{ description }}
                    </p>
                </div>
            </div>
            <div class="mt-2">
                <h3 class="text-sm font-medium text-gray-900">{{ title }}</h3>
                <p class="text-sm text-gray-500">{{ director }}</p>
                <div class="mt-1 flex items-center gap-2 text-xs text-gray-500">
                    <span v-if="year">{{ year }}</span>
                    <span v-if="rating" class="flex items-center">
                        <StarIcon class="h-3 w-3 mr-1" />
                        {{ rating }}
                    </span>
                    <span v-if="category">{{ category }}</span>
                </div>
            </div>
        </router-link>
    </div>
</template>

<script setup lang="ts">
import { StarIcon, EyeIcon, ArrowTopRightOnSquareIcon } from '@heroicons/vue/24/outline'
import { useWatchlistStore } from '@/stores/watchlist'
import type { Movie } from '@/types/itunes'

const props = defineProps<{
    title: string
    director: string
    image: string
    year?: string
    rating?: string
    category?: string
    description?: string
    movie: Movie
}>()

const watchlistStore = useWatchlistStore()

const addToWatchlist = () => {
    watchlistStore.addMovie(props.movie)
}
</script>