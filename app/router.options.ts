import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig> {
  // https://router.vuejs.org/api/interfaces/routeroptions.html#routes
  routes: (_routes) => [
    {
      name: 'login',
      path: '/login',
      component: () => import('~/pages/login/Login.vue').then(r => r.default || r)
    },
    {
      name: 'categories',
      path: '/',
      component: () => import('~/pages/categories/Categories.vue').then(r => r.default || r)
    },
    {
      name: 'drinks',
      path: '/drinks',
      component: () => import('~/pages/drinks/Drinks.vue').then(r => r.default || r)
    },
  ],
}
