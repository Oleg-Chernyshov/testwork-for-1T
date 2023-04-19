const routes = [
  {
    path: '/',
    component: () => import('layouts/AuthorizationLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Authorization/EnterPage.vue'),
      },
    ],
  },
  {
    path: '/app',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/Team', component: () => import('pages/Team.vue') },
      {
        path: '/Executors',
        component: () => import('components/Executors.vue'),
      },
      {
        path: '/Responsible',
        component: () => import('components/Responsible.vue'),
      },
      { path: '/Modules', component: () => import('pages/Modules.vue') },
      { path: '/AllTasks', component: () => import('pages/Tasks.vue') },
      { path: '/Excluded', component: () => import('pages/Excluded.vue') },
      {
        path: '/ModulesTasks',
        component: () => import('components/modulesTasks.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
