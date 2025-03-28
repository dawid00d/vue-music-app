import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import MoviesView from '@/views/MoviesView.vue'
import AlbumsView from '@/views/AlbumsView.vue'
import MovieDetailsView from '@/views/MovieDetailsView.vue'
import AlbumDetailsView from '@/views/AlbumDetailsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/movies',
      name: 'movies',
      component: MoviesView
    },
    {
      path: '/albums',
      name: 'albums',
      component: AlbumsView
    },
    {
      path: '/movies/:id',
      name: 'movie-details',
      component: MovieDetailsView
    },
    {
      path: '/albums/:id',
      name: 'album-details',
      component: AlbumDetailsView
    }
  ]
})

export default router
