import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'login',
  
    component: () => import('../components/Flayer/FlayerDigital.vue')
  },
  {
    path: '/politicas',
    name: 'politicas',
  
    component: () => import('../components/Politicas.vue')
  },
  {
    path: '/cookies',
    name: 'cookies',
    component: () => import('../components/CookiesPolicy.vue')
  },
  
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
