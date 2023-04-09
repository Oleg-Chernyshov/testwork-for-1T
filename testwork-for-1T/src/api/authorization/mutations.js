import gql from "graphql-tag"

export const UserSignIn = gql`mutation UserSignIn($input: UserSignInInput!) {
    userSignIn(input: $input) {
          recordId
          record {
              token_type
              expires_in
              access_token
              refresh_token
          }
          status
    }
  }`

export const UserSignUp = gql`mutation UserSignUp($input: UserSignUpInput!) {
    userSignUp(input: $input) {
          recordId
          record {
              id
              email
              registration_passed
              name
              surname
          }
          status
    }
  }`

export const UserSignUpSetPassword = gql`mutation UserSignUpSetPassword($input: UserSignUpSetPasswordInput!) {
    userSignUpSetPassword(input: $input) {
          status
    }
  }`


