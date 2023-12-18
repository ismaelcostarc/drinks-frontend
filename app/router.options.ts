import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig> {
  // https://router.vuejs.org/api/interfaces/routeroptions.html#routes
  routes: (_routes) => [
    {
      name: 'Login',
      path: '/login',
      meta: {
        public: true,
        dontNeedAuth: true
      },
      component: () => import('~/pages/auth/Login.vue').then(r => r.default || r)
    },
    {
      name: 'Categories',
      path: '/',
      meta: {
        public: true,
      },
      component: () => import('~/pages/Categories.vue').then(r => r.default || r)
    },
    {
      name: 'Drinks',
      path: '/category/:categoryId/drinks',
      meta: {
        public: true,
      },
      component: () => import('~/pages/drinks/Drinks.vue').then(r => r.default || r)
    },
    {
      name: 'DrinksSearch',
      path: '/drinks/search/:search',
      meta: {
        public: true,
      },
      component: () => import('~/pages/drinks-search/DrinksSearch.vue').then(r => r.default || r)
    },
    {
      name: 'Favorites',
      path: '/favorites',
      component: () => import('~/pages/favorites/Favorites.vue').then(r => r.default || r)
    },
  ],
}
