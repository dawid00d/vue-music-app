import { defineStore } from 'pinia'
import type { Album, Song } from '@/types/itunes'

type PlaylistItem = Song | Album

export const usePlaylistStore = defineStore('playlist', () => {
  const items: PlaylistItem[] = []
  let currentItem: PlaylistItem | null = null
  let currentSong: Song | null = null

  function getItemsCount() {
    return items.length
  }

  function addAlbum(album: Album) {
    items.push(album)
  }

  function addSong(song: Song) {
    items.push(song)
  }


  function removeItem(itemId: string) {

  }

  function setCurrentItem(item: PlaylistItem) {

  }

  function setCurrentSong(song: Song) {
    currentSong = song
  }

  function clearPlaylist() {
    items.length = 0
    currentItem = null
    currentSong = null
  }

  return {
    items,
    currentItem,
    currentSong,
    getItemsCount,
    addAlbum,
    addSong,
    removeItem,
    setCurrentItem,
    setCurrentSong,
    clearPlaylist
  }
})
