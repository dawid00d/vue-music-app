<template>
    <div class="group cursor-pointer">
        <router-link :to="{ name: 'album-details', params: { id: album.id } }" class="block">
            <div class="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                <img :src="image" :alt="`Album ${title}`"
                    class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                <div class="absolute top-2 right-2 z-10">
                    <button @click.stop="addToPlaylist"
                        class="p-2 rounded-full bg-white/90 text-gray-900 shadow-md hover:bg-white transition-colors duration-300">
                        <HeartIcon class="h-5 w-5" />
                    </button>
                </div>
                <div
                    class="absolute bottom-0 left-0 right-0 bg-white/95 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <div class="flex items-center justify-between mb-2">
                        <span class="text-sm font-medium text-gray-900">Pokaż więcej</span>
                        <ArrowTopRightOnSquareIcon class="h-4 w-4 text-gray-500" />
                    </div>
                    <p v-if="description" class="text-xs text-gray-600 line-clamp-3 leading-relaxed">{{ description }}
                    </p>
                </div>
            </div>
            <div class="mt-2">
                <h3 class="text-sm font-medium text-gray-900">{{ title }}</h3>
                <p class="text-sm text-gray-500">{{ artist }}</p>
            </div>
        </router-link>
    </div>
</template>

<script setup lang="ts">
import { HeartIcon, ArrowTopRightOnSquareIcon } from '@heroicons/vue/24/outline'
import { usePlaylistStore } from '@/stores/playlist'
import type { Album } from '@/types/itunes'

const props = defineProps<{
    title: string
    artist: string
    image: string
    description?: string
    album: Album
}>()

const playlistStore = usePlaylistStore()

const addToPlaylist = () => {
    playlistStore.addAlbum(props.album)
}
</script>