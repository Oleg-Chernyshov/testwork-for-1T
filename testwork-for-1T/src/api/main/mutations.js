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
