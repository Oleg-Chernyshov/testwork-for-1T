import { provideApolloClient, useMutation } from '@vue/apollo-composable'
import apolloClient from '../apollo/apolllo-client'
import { filesUpload } from 'src/api/main/mutations'

provideApolloClient(apolloClient)

const { mutate } = useMutation(filesUpload)

const uploadFiles = async (files) => {
  console.log(files)

  const data = await mutate(
    {
      files,
    },
    {
      context: {
        hasUpload: true,
      },
    },
  )

  console.log(BigInt(data.data.filesUpload.ids[0]).toString())
}

const filesApi = { uploadFiles }

export default filesApi
