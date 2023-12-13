import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig> {
  // https://router.vuejs.org/api/interfaces/routeroptions.html#routes
  routes: (_routes) => [
    {
      name: 'categories',
      path: '/',
      component: () => import('~/pages/categories/Categories.vue').then(r => r.default || r)
    }
  ],
}
