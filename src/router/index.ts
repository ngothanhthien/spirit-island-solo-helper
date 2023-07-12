import { createRouter, createWebHistory } from 'vue-router'
import SetupView from '@/views/SetupView.vue'

const routes = [
  {
    path: '/',
    component: SetupView,
  },
  {
    path: '/game',
    component: import('@/views/GameView.vue'),
  },
  {
    path: '/testing',
    component: () => import('@/views/TestView.vue')
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/',
  },
]
export default createRouter({
  history: createWebHistory(),
  routes,
})
