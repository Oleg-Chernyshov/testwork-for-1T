import { provideApolloClient, useMutation } from '@vue/apollo-composable'
import { ApolloClient } from '@apollo/client/core'
import { createQueue } from 'src/api/main/mutations'
import Cookies from 'js-cookie'
import { getClientOptions } from 'src/apollo/index'
import Stomp from 'stompjs'

const apolloClient = new ApolloClient(getClientOptions())
provideApolloClient(apolloClient)

const socket = new WebSocket('wss://stud.druid.1t.ru/ws')
let client = Stomp.over(socket)

const { mutate: creatingQueue } = useMutation(createQueue)

const queueCreate = async () => {
  const { data: createdQueue } = await creatingQueue()
  Cookies.set('queue', createdQueue.notificationSubscribe.hash)
  return createdQueue
}

const stompConnect = (store) => {
  const queue = Cookies.get('queue')

  const onConnect = async () => {
    console.log('connected')

    let onMessage = (message) => {
      const messageObj = JSON.parse(message.body)

      console.log('Receive message:', messageObj)
      setTimeout(() => {
        const refetch_modules = store.getters.REFETCH_MODULES
        refetch_modules()
        const refetch_all_tasks = store.getters.REFETCH_ALL_TASKS
        refetch_all_tasks()
        const refetch_executors = store.getters.REFETCH_EXECUTORS
        refetch_executors()
        const refetch_responsibles = store.getters.REFETCH_RESPONSIBLES
        refetch_responsibles()
      }, 500)

      message.ack()
    }

    client.subscribe(`/amq/queue/${queue}`, onMessage, { ack: 'client' })
  }

  const onError = (msg) => {
    console.log('Error', msg)
  }

  const onClose = (msg) => {
    console.log('Close', msg)
  }

  client.connect('readonly', '@3P^Lgdab)sv', onConnect, onError, '/', onClose)
}

const stompApi = { queueCreate, stompConnect }

export default stompApi
