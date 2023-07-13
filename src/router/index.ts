import { createRouter, createWebHistory } from 'vue-router'
import SetupView from '@/views/SetupView.vue'

function lazyLoad(view: string) {
  return () => import(`@/views/${view}.vue`)
}
const routes = [
  {
    path: '/setup',
    component: SetupView,
    name: 'SetupView'
  },
  {
    path: '/',
    component: lazyLoad('HomeView'),
    name: 'HomeView'
  },
  {
    path: '/game',
    component: lazyLoad('GameView'),
    name: 'GameView'
  },
  {
    path: '/testing',
    component: lazyLoad('TestView'),
    name: 'TestView'
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
