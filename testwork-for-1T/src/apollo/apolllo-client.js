import { ApolloClient } from '@apollo/client/core'
import { getClientOptions } from 'src/apollo'

const options = getClientOptions()
console.log('options', options)
const apolloClient = new ApolloClient(options)

export default apolloClient
