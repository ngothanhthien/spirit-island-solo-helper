import { createRouter, createWebHistory } from 'vue-router'
// @ts-ignore
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
    path: '/statistics',
    component: lazyLoad('StatisticsView'),
    name: 'StatisticsView'
  },
  {
    path: '/testing',
    component: lazyLoad('TestView'),
    name: 'TestView'
  },
  {
    path: '/panel',
    component: lazyLoad('PanelToolView')
  },
  {
    path: '/card',
    component: lazyLoad('CardToolView')
  },
  {
    path: '/innate',
    component: lazyLoad('InnateToolView')
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/'
  }
]
export default createRouter({
  history: createWebHistory(),
  routes
})
