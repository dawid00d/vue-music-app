<template>
    <div class="container mx-auto px-4 py-8">
        <div v-if="loading" class="flex justify-center items-center h-64">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>

        <div v-else-if="error" class="text-center text-red-600">
            {{ error }}
        </div>

        <div v-else-if="album" class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                <img :src="album.image" :alt="album.title" class="w-full h-full object-cover" />
            </div>
            <div class="space-y-6">
                <h1 class="text-3xl font-bold text-gray-900">{{ album.title }}</h1>
                <p class="text-xl text-gray-600">{{ album.artist }}</p>

                <div class="flex items-center gap-4 text-sm text-gray-500">
                    <span>{{ new Date(album.releaseDate).getFullYear() }}</span>
                    <span>{{ album.genre }}</span>
                </div>

                <div class="prose max-w-none">
                    <p class="text-gray-700">{{ album.copyright }}</p>
                </div>

                <div class="flex items-center gap-4">
                    <span class="text-lg font-semibold text-gray-900">{{ album.price }} {{ album.currency }}</span>
                </div>

                <div class="flex gap-4">
                    <a :href="album.link?.[0]?.attributes?.href" target="_blank"
                        class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-black">
                        <ArrowTopRightOnSquareIcon class="h-4 w-4 mr-2" />
                        Otwórz w iTunes
                    </a>
                    <button @click="addToPlaylist"
                        class="inline-flex items-center px-4 py-2  text-sm font-medium text-gray-700">
                        <HeartIcon class="h-6 w-6 mr-2" />
                    </button>
                </div>
                <div v-if="songs.length > 0" class="mt-8">
                    <h2 class="text-xl font-semibold text-gray-900 mb-4">Lista utworów</h2>
                    <div class="space-y-2">
                        <div v-for="(song, index) in songs" :key="song.trackId"
                            class="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">

                            <div class="flex items-center gap-4">
                                <button @click="addSongToPlaylist(song)"
                                    class="p-2  bg-white text-gray-900 shadow-sm hover:bg-gray-50">
                                    <HeartIcon class="h-5 w-5" />
                                </button>
                                <span class="text-sm text-gray-500 w-8 ml-5">{{ index + 1 }}</span>
                                <div>
                                    <p class="text-sm font-medium text-gray-900">{{ song.trackName }}</p>
                                    <p class="text-xs text-gray-500">{{ song.artistName }}</p>
                                </div>
                            </div>
                            <div class="flex items-center gap-4">
                                <span class="text-sm text-gray-500">{{ formatDuration(song.trackTimeMillis) }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowTopRightOnSquareIcon, HeartIcon } from '@heroicons/vue/24/outline'
import { itunesLookupService } from '@/api'
import { usePlaylistStore } from '@/stores/playlist'
import type { Album, Song } from '@/types/itunes'
import { mapAlbumFromLookup } from '@/types/itunes'

const route = useRoute()
const playlistStore = usePlaylistStore()

const album = ref<Album | null>(null)
const songs = ref<Song[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

const fetchAlbumDetails = async () => {
    loading.value = true
    error.value = null
    try {
        const [albumData, songsData] = await Promise.all([
            itunesLookupService.getAlbumById(route.params.id as string),
            itunesLookupService.getAlbumSongs(route.params.id as string)
        ])
        album.value = mapAlbumFromLookup(albumData.data.results[0])
        songs.value = songsData.data.results.slice(1)
    } catch (err) {
        console.error('Błąd podczas pobierania szczegółów albumu:', err)
    } finally {
        loading.value = false
    }
}

const addToPlaylist = () => {
    if (album.value) {
        playlistStore.addAlbum(album.value as any)
    }
}

const addSongToPlaylist = (song: Song) => {
    playlistStore.addSong(song)
}

const formatDuration = (milliseconds: number) => {
    const minutes = Math.floor(milliseconds / 60000)
    const seconds = Math.floor((milliseconds % 60000) / 1000)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

onMounted(() => {
    fetchAlbumDetails()
})
</script>