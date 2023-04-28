import gql from 'graphql-tag'

export const addNewModule = gql`
  mutation($input: create_type1_input!) {
    create_type1(input: $input) {
      recordId
      record {
        property2 {
          date
        }
        property3 {
          date
        }
        property7 {
          fullname {
            first_name
            last_name
          }
        }
        property8 {
          name
        }
        id
        author_id
        type_id
        created_at
        updated_at
      }
      status
    }
  }
`

export const addNewTask = gql`
  mutation($input: create_type2_input!) {
    create_type2(input: $input) {
      recordId
      record {
        property8 {
          name
        }
        id
        author_id
        type_id
        created_at
        updated_at
      }
      status
    }
  }
`
export const updateUser = gql`
  mutation($input: update_type2_input!, $id: String!) {
    update_type2(input: $input, id: $id) {
      recordId
      record {
        property8 {
          name
        }
        id
        author_id
        type_id
        created_at
        updated_at
      }
      status
    }
  }
`
export const inviteUser = gql`
  mutation userGroupInviteUser($input: UserGroupInviteUserInput!) {
    userGroupInviteUser(input: $input) {
      status
    }
  }
`
export const updateModule = gql`
  mutation($input: update_type1_input!, $id: String!) {
    update_type1(id: $id, input: $input) {
      status
      recordId
      record {
        id
        type_id
        author_id
        level
        position
        created_at
        updated_at
        name
      }
    }
  }
`

export const createRule = gql`
  mutation permissionRuleCreate($input: PermissionRuleCreateInput!) {
    permissionRuleCreate(input: $input) {
      recordId
      status
      record {
        id
        author_id
        level
        model_type
        model_id
        config
        owner_id
        owner_type
        created_at
        updated_at
      }
    }
  }
`

export const DeleteTask = gql`
  mutation delete_type2($id: String!) {
    delete_type2(id: $id) {
      status
      recordId
    }
  }
`

export const DeleteModule = gql`
  mutation delete_type1($id: String!) {
    delete_type1(id: $id) {
      status
      recordId
    }
  }
`

export const DeleteSubject = gql`
  mutation($id: String!) {
    delete_subject(id: $id) {
      status
      recordId
    }
  }
`

export const createQueue = gql`
  mutation {
    notificationSubscribe {
      hash
    }
  }
`

export const UPLOAD_FILES = gql`
  mutation filesUpload($files: [Upload]!) {
    filesUpload(files: $files) {
      status
      ids
    }
  }
`

export const permissionRuleDelete = gql`
  mutation permissionRuleDelete($id: String!) {
    permissionRuleDelete(id: $id) {
      recordId
      status
    }
  }
`

//DOCUMENT
//Создание документа
export const createDocument = gql`
  mutation($input: create_document_input!) {
    create_document(input: $input) {
      status
      recordId
      record {
        id
        type_id
        author_id
        level
        position
        created_at
        updated_at
        name
      }
    }
  }
`
//Пример input:
// {
//   "input": {
//     "name": "Документ2",
//     "content": "content2",
//     "Owner": {
//       "2598174384277431501": "3687791280958260641"
//     }
//   }
// }

//Обновление документа
export const updateDocument = gql`
  mutation($id: String!, $input: update_document_input!) {
    update_document(id: $id, input: $input) {
      status
      recordId
      record {
        id
        type_id
        author_id
        level
        position
        created_at
        updated_at
        name
      }
    }
  }
`
//Пример input:
// {
//   "id": "3150722121807459175",
//   "input": {
//     "name": "Документ1(up)",
//     "content": "content1(up)"
//   }
// }

//Удаление документа (почему-то не срабатывает, хотя приходит сообщение, что документ удален)
export const deleteDocument = gql`
  mutation($id: String!) {
    delete_document(id: $id) {
      status
      recordId
    }
  }
`
//Пример input:
// {
//   "id": "3150722121807459175"
// }

//Загрузка файла
export const filesUpload = gql`
  mutation filesUpload($files: [Upload]!) {
    filesUpload(files: $files) {
      status
      ids
    }
  }
`

export const fileUpdate = gql`
  mutation($id: String!, $input: update_file_input!) {
    update_file(id: $id, input: $input) {
      status
      recordId
      record {
        id
        type_id
        author_id
        level
        position
        created_at
        updated_at
        name
      }
    }
  }
`

//Пример input/id
// {
//   "input": {
//           "title": "sadfsdv",
//           "path": "13/23/04/27",
//           "size": 3317456,
//           "name": "423423.jpg",
//           "short_link": "1gPvlRD-ofBETxwZ",
//           "extension": "jpg",
//           "disk": "file_storage",
//           "hash": "2c9f512f611074fa8af4a3e0408b5110"
//   },
//   "id": "1413518930578876005"
// }

export const fileDelete = gql`
  mutation($id: String!) {
    delete_file(id: $id) {
      status
      recordId
    }
  }
`
//Пример input/id
// {
//   "id": "1413518930578876005"
// }
