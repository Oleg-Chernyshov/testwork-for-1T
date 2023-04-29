import { useQuery } from '@vue/apollo-composable'
import {
  GetGroupById,
  GetAllTasks,
  GetAllModules,
  allDocuments,
  getFiles,
} from 'src/api/main/queryes'

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
        let email = sessionStorage.getItem('email')
        let role = sessionStorage.getItem('role')
        let options = []
        responsibles = queryResult.data.get_group.subject
        for (let subject of responsibles) {
          if (subject.email.email == email) {
            sessionStorage.setItem('role', 'Ответсвенный')
            break
          }
          options.push(
            subject.fullname?.first_name + ' ' + subject.fullname?.last_name,
          )
        }
        if (role === null) {
          sessionStorage.setItem('role', 'Владелец')
        }
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
        let email = sessionStorage.getItem('email')
        let options = []
        executors = queryResult.data.get_group.subject
        for (let subject of executors) {
          if (subject.email.email == email) {
            sessionStorage.setItem('role', 'Исполнитель')
            break
          }
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

export const GET_DOCUMENTS = ({ commit }) => {
  const fetching = async () => {
    try {
      const { onResult, refetch } = useQuery(allDocuments)
      onResult((queryResult) => {
        commit('setDocuments', {
          documents: queryResult.data['paginate_document'].data,
          refetch: refetch,
        })
      })
    } catch (e) {
      console.log('Ошибка:', e)
    }
  }
  fetching()
}

export const GET_FILES = ({ commit }) => {
  const fetching = async () => {
    try {
      const { onResult, refetch } = useQuery(getFiles)
      onResult((queryResult) => {
        commit('setFiles', {
          files: queryResult.data['paginate_file'].data,
          refetch: refetch,
        })
      })
    } catch (e) {
      console.log('Ошибка:', e)
    }
  }
  fetching()
}
