// import { state } from "../store/index";
// import { ref, computed, reactive, watch } from "vue";

// const modules = computed(() => state.modules);
// console.log(321, modules.value);
// watch(modules, () => {
//   console.log(123, modules.value);
// })

// arr = []
// for (mod of modules.value) {
//   module = {
//     path: '/' + mod.name, component: () => import('pages/Team.vue')
//   }
// }

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),

    children: [
      { path: '/Team', component: () => import('pages/Team.vue') },
      { path: '/Executors', component: () => import('components/Executors.vue') },
      { path: '/Responsible', component: () => import('components/Responsible.vue') },
      { path: '/Modules', component: () => import('pages/Modules.vue') },
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