
const routes = [
  {
    path: '/',
    component: () => import('layouts/AuthorizationLayout.vue'),
    children: [
<<<<<<< HEAD
      { path: '', component: () => import('pages/Authorization/EnterPage.vue') },
      { path: '/register', component: () => import('pages/Authorization/RegisterPage.vue') },
=======
      { path: '/Team', component: () => import('pages/Team.vue') },
      { path: '/Executors', component: () => import('components/Executors.vue') },
      { path: '/Responsible', component: () => import('components/Responsible.vue') }
>>>>>>> origin/Dmitriy-Korolev
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
