
const routes = [
  {
    path: '/',
    component: () => import('layouts/AuthorizationLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Authorization/EnterPage.vue') },
      { path: '/register', component: () => import('pages/Authorization/RegisterPage.vue') },
    ]
  },
  {
    path: '/app',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
    ]
  },


  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
