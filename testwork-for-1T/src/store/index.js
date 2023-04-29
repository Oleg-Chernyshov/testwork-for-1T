import { createStore } from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

export const state = {
  module_index: -1,
  modules: [],
  files: [],
  documents: [],
  subjects: [],
  allTasks: [],
  responsibles: [],
  executors: [],
  optionsModules: [],
  optionsForResponsibles: [],
  optionsForExecutors: [],
  refetchQueryExecutors: {},
  refetchQueryAllTasks: {},
  refetchQueryResponsible: {},
  refetchModules: {},
}

const store = createStore({
  state,
  getters,
  actions,
  mutations,
})

if (module.hot) {
  module.hot.accept(['./getters', './actions', './mutations'], () => {
    store.hotUpdate({
      getters: require('./getters'),
      actions: require('./actions'),
      mutations: require('./mutations'),
    })
  })
}

export default store
