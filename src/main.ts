import './assets/main.scss'

import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import Home from './pages/Home.vue'
import Favorites from './pages/Favorites.vue'
import { createPinia } from 'pinia'
import Profile from './pages/Profile.vue'
const app = createApp(App)
const routes = [
  {
    path: '/',
    component: Home,
    name: 'home'
  },
  {
    path: '/favorites',
    component: Favorites,
    name: 'favorites'
  },
  {
    path: '/profile',
    component: Profile,
    name: 'profile'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const pinia = createPinia();
app.use(pinia);
app.use(router);
app.use(autoAnimatePlugin)
app.mount('#app')
