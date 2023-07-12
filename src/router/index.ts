import { createRouter, createWebHistory } from 'vue-router'
import SetupView from '@/views/SetupView.vue'

function lazyLoad(view: string) {
  return () => import(`@/views/${view}.vue`)
}
const routes = [
  {
    path: '/',
    component: SetupView,
  },
  {
    path: '/game',
    component: lazyLoad('GameView'),
  },
  {
    path: '/testing',
    component: lazyLoad('TestingView')
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
