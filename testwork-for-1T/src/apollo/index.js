import { createHttpLink, InMemoryCache } from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'
import { createUploadLink } from 'apollo-upload-client'
import { ApolloLink, concat } from '@apollo/client/core'

export /* async */ function getClientOptions(/* {app, router, ...} */ options) {
  const httpLink = createHttpLink({
    // uri: "https://firm-dassie-25.hasura.app/v1/graphql",
    uri: 'https://app.stud.druid.1t.ru/graphql',
  })
  const uploadLink = createUploadLink({
    // uri: "https://firm-dassie-25.hasura.app/v1/graphql",
    uri: 'https://app.stud.druid.1t.ru/graphql',
  })

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = sessionStorage.getItem('token')
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : '',
        // Authorization: `Bearer `,
      },
    }
  })

  const link = concat(
    authLink,
    ApolloLink.split(
      (operation) => operation.getContext().hasUpload,
      uploadLink,
      httpLink,
    ),
  )

  return Object.assign(
    {
      link: link,
      cache: new InMemoryCache(),
    },
    process.env.MODE === 'spa'
      ? {
          //
        }
      : {},
    process.env.MODE === 'ssr'
      ? {
          //
        }
      : {},
    process.env.MODE === 'pwa'
      ? {
          //
        }
      : {},
    process.env.MODE === 'bex'
      ? {
          //
        }
      : {},
    process.env.MODE === 'cordova'
      ? {
          //
        }
      : {},
    process.env.MODE === 'capacitor'
      ? {
          //
        }
      : {},
    process.env.MODE === 'electron'
      ? {
          //
        }
      : {},
    // dev/prod options.
    process.env.DEV
      ? {
          //
        }
      : {},
    process.env.PROD
      ? {
          //
        }
      : {},
    // For ssr mode, when on server.
    process.env.MODE === 'ssr' && process.env.SERVER
      ? {
          ssrMode: true,
        }
      : {},
    // For ssr mode, when on client.
    process.env.MODE === 'ssr' && process.env.CLIENT
      ? {
          ssrForceFetchDelay: 100,
        }
      : {},
  )
}
