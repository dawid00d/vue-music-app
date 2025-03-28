<template>

    <div class="w-64 bg-black text-white p-6 flex-shrink-0">
        <div class="mb-8">
            <h1 class="text-2xl font-bold">Music App</h1>
        </div>

        <div class="space-y-6">
            <div>
                <h2 class="text-sm font-semibold text-gray-400 mb-2">Odkryj</h2>
                <div class="space-y-1">
                    <router-link to="/"
                        class="flex items-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-white/20 h-9 px-4 py-2 w-full justify-start"
                        :class="route.path === '/' ? 'bg-white/10 text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white'">
                        <PlayIcon class="h-4 w-4" />
                        Strona główna
                    </router-link>
                    <router-link to="/movies"
                        class="flex items-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-white/20 h-9 px-4 py-2 w-full justify-start"
                        :class="route.path === '/movies' ? 'bg-white/10 text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white'">
                        <Squares2X2Icon class="h-4 w-4" />
                        Filmy
                    </router-link>
                    <router-link to="/albums"
                        class="flex items-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-white/20 h-9 px-4 py-2 w-full justify-start"
                        :class="route.path === '/albums' ? 'bg-white/10 text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white'">
                        <SpeakerWaveIcon class="h-4 w-4" />
                        Albumy
                    </router-link>
                </div>
            </div>
            <div>
                <h2 class="text-sm font-semibold text-gray-400 mb-2">Biblioteka</h2>
                <div class="space-y-1">
                    <button
                        class="flex items-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-white/20 h-9 px-4 py-2 w-full justify-start text-gray-300 hover:bg-white/5 hover:text-white">
                        <HeartIcon class="h-4 w-4" />
                        Playlista
                    </button>
                    <button
                        class="flex items-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-white/20 h-9 px-4 py-2 w-full justify-start text-gray-300 hover:bg-white/5 hover:text-white">
                        <EyeIcon class="h-4 w-4" />
                        Do obejrzenia później
                    </button>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import {
    PlayIcon,
    Squares2X2Icon,
    SpeakerWaveIcon,
    HeartIcon,
    EyeIcon
} from '@heroicons/vue/24/outline'

const route = useRoute()
</script>