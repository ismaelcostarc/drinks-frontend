import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig> {
  // https://router.vuejs.org/api/interfaces/routeroptions.html#routes
  routes: (_routes) => [
    {
      name: 'login',
      path: '/login',
      component: () => import('~/pages/auth/Login.vue').then(r => r.default || r)
    },
    {
      name: 'categories',
      path: '/',
      component: () => import('~/pages/Categories.vue').then(r => r.default || r)
    },
    {
      name: 'drinks',
      path: '/drinks/:categoryId',
      component: () => import('~/pages/Drinks.vue').then(r => r.default || r)
    },
  ],
}
