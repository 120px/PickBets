import { useMutation, gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation Mutation($passwordInput: String!, $usernameInput: String!){
  userLogin(passwordInput: $passwordInput, usernameInput: $usernameInput) {
    user {
      username
    }
    errors {
      field
      message
    }
  }
}
`;