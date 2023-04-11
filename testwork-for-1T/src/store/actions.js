import { useQuery } from '@vue/apollo-composable'
import { GetGroupById, GetAllTasks, GetAllModules } from 'src/api/main/queryes'

export const GET_MODULES = ({ commit }) => {
  const fetching = async () => {
    try {
      const { onResult, refetch } = useQuery(GetAllModules)
      onResult((queryResult) => {
        let options = []
        let modules = queryResult.data['paginate_type1'].data
        for (let module of modules) {
          options.push(module.name)
        }
        commit('setModules', {
          modules: modules,
          refetch: refetch,
          optionsModules: options,
        })
      })
    } catch (e) {
      console.log('Ошибка:', e)
    }
  }
  fetching()
}

export const GET_RESPONSIBLES = ({ commit }) => {
  const fetching = async () => {
    try {
      let responsibles = []
      const { onResult, refetch } = useQuery(GetGroupById, {
        id: '3662509860808044515',
      })
      onResult((queryResult) => {
        console.log(queryResult);
        let options = []
        responsibles = queryResult.data.get_group.subject
        for (let subject of responsibles) {
          options.push(
            subject.fullname?.first_name + ' ' + subject.fullname?.last_name,
          )
        }
        console.log('act', responsibles, options)
        commit('setResponsibles', {
          responsibles: responsibles,
          optionsForResponsibles: options,
          refetch: refetch,
        })
      })
    } catch (e) {
      console.log('Ошибка:', e)
    }
  }
  fetching()
}

export const GET_EXECUTORS = ({ commit }) => {
  const fetching = async () => {
    try {
      let executors = []
      const { onResult, refetch } = useQuery(GetGroupById, {
        id: '4428325871296613250',
      })
      onResult((queryResult) => {
        let options = []
        executors = queryResult.data.get_group.subject
        for (let subject of executors) {
          options.push(
            subject.fullname?.first_name + ' ' + subject.fullname?.last_name,
          )
        }
        commit('setExecutors', {
          executors: executors,
          optionsForExecutors: options,
          refetch: refetch,
        })
      })
    } catch (e) {
      console.log('Ошибка:', e)
    }
  }
  fetching()
}

export const GET_ALL_TASKS = ({ commit }) => {
  const fetching = async () => {
    try {
      const { onResult, refetch } = useQuery(GetAllTasks)
      onResult((queryResult) => {
        console.log(queryResult.data.paginate_type2.data)
        commit('setAllTasks', {
          allTasks: queryResult.data.paginate_type2.data,
          refetch: refetch,
        })
      })
    } catch (e) {
      console.log('Ошибка:', e)
    }
  }
  fetching()
}

export const GET_ID = ({ commit }, id) => {
  commit('SetId', id)
}
