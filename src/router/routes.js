
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Login.vue') },
      {
        path: '/dashboard',
        component: () => import('pages/Index.vue'),
        children: [
          {
            path: '/dashboard/categories',
            component: () => import('pages/Categories.vue')
          },
          {
            path: '/dashboard/categories/:id',
            component: () => import('pages/Articles.vue')
          },
          {
            path: '/dashboard/categories/:id/article/:id',
            component: () => import('pages/SignleArticle.vue')
          }
        ]
      }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
