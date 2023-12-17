import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig> {
  // https://router.vuejs.org/api/interfaces/routeroptions.html#routes
  routes: (_routes) => [
    {
      name: 'Login',
      path: '/login',
      component: () => import('~/pages/auth/Login.vue').then(r => r.default || r)
    },
    {
      name: 'Categories',
      path: '/',
      component: () => import('~/pages/Categories.vue').then(r => r.default || r)
    },
    {
      name: 'Drinks',
      path: '/drinks/:categoryId',
      component: () => import('~/pages/Drinks.vue').then(r => r.default || r)
    },
    {
      name: 'DrinksSearch',
      path: '/drinks/search/:search',
      component: () => import('~/pages/DrinksSearch.vue').then(r => r.default || r)
    },
  ],
}
