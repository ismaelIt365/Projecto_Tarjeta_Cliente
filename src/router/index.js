import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'login',
  
    component: () => import('../components/Login.vue')
  },
  {
    path: '/politicas',
    name: 'politicas',
  
    component: () => import('../components/Politicas.vue')
  },
  
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
