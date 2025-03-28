<template>
    <div class="w-full">
        <div class="flex items-center justify-between mb-8">
            <h1 class="text-3xl font-bold text-gray-900">Albumy</h1>

        </div>

        <div v-if="loading" class="flex justify-center items-center h-64">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>

        <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert">
            <strong class="font-bold">Błąd!</strong>
            <span class="block sm:inline">{{ error }}</span>
        </div>

        <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            <AlbumCard v-for="album in albums" :key="album.id" :title="album.title" :artist="album.artist"
                :image="album.image" :album="album" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { PlusIcon } from '@heroicons/vue/24/outline'
import type { Album } from '@/types/itunes'
import { mapAlbumFromRss } from '@/types/itunes'
import itunesRssService from '@/api/services/itunesRssService'
import AlbumCard from '@/components/cards/AlbumCard.vue'

const albums = ref<Album[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

const fetchAlbums = async () => {
    loading.value = true
    error.value = null
    try {
        const response = await itunesRssService.getTopAlbums()
        albums.value = response.data.feed.entry.map(mapAlbumFromRss)
    } catch (err) {
        console.error('Błąd podczas pobierania albumów:', err)
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    console.log('Komponent AlbumsView zamontowany')
    fetchAlbums()
})
</script>