import gql from "graphql-tag"

export const addNewModule = gql`
mutation ($input: create_type1_input!) {
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
mutation ($input: create_type2_input!) {
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

export const inviteUser = gql`
mutation userGroupInviteUser($input: UserGroupInviteUserInput!) {
    userGroupInviteUser(input: $input) {
      status
    }
  } 
`