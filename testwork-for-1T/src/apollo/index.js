import { createHttpLink, InMemoryCache } from '@apollo/client/core'
import { setContext } from "@apollo/client/link/context";

export /* async */ function getClientOptions(/* {app, router, ...} */ options) {
  const httpLink = createHttpLink({
    // uri: "https://firm-dassie-25.hasura.app/v1/graphql",
    uri: "https://app.dev.druid.1t.ru/graphql",
  })

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = sessionStorage.getItem("token");
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        // Authorization: token ? `Bearer ${token}` : "",
        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI3IiwianRpIjoiYzE0ZmUyNTU4NmUyMDU5MmYyODZhMzY2NGM4NjgyYmM1YTM5Zjc1YjA1OGVkYjgzMDBhMWY0MWIxODRmMWVkYTg0ZDczMTE2M2JhOGI1NmQiLCJpYXQiOjE2ODAzNjY4NDAuMzEzNTkyLCJuYmYiOjE2ODAzNjY4NDAuMzEzNTk1LCJleHAiOjE3MTE5ODkyNDAuMzA3MDA1LCJzdWIiOiI1OTcyMDg2NDY0MTY0Njk1MDkzIiwic2NvcGVzIjpbXX0.jx9GLvWbecblyEwAV_adyrbFlP1pdJOYmFNEwzLjB0yarNP-scJIqoJIIBRbjBFN8anmC02eT4PeCI05yLtIs0iG-AoyOov8AziSwp0UgZbwA1Ap2DlPAHM_T8ehMzmG8qIEvWIPK9v6-5038P7wetDZBmAzxQdSVKbE25m8cSjc_Q7x15iYioMgB95Gt7o0LlyJP5WvHtTHECygR4gSvtAioTbABp2IFUIEUv5bnXCjos8CW3cT1yuncElV6VNR0--W-z3lYuXfILLTDrrLUV8IQu35b2w99iOs_Ndw8F4exV7deiMSbJwSad9nMIOOKw-wSSL4unljLLxARvDV-RNbjZrFw3qWMweF952ZZhgReiVMtwx2hi21QSnW_EgxWy9sncx6YlOe6vdjSsS7eQszufaDICsKa2Vz5WXAX-hGinX24peVrtel93MdSub0DmSdPZTsJ40dPCAlkXPDQVI0dtbUHJU-eC5QfXeG74EMO3Qt_sW8n9HVraa7W_z0GnsdkPtBemGhViy96M1Ex42Hxg8cGVvoICMSjlyrC4fIHUqPPy7uHqiPZ4IDjraXaqpaOn_uOdPf29GZWpLZJDDhVJHo6yuHWlMEQg-Ylxa5cgCw81QPhD5h1-JS_uhsgF0brS7_CjB-kj4dWei02VuuqR14WiggTEJgnBBnIC0&space=727`,
      }
    }
  })

  return Object.assign(
    {
      link: authLink.concat(httpLink),
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
      : {}
  )
}
