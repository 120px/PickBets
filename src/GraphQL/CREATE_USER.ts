import { useMutation, gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation Mutation($userInput: UserRegisterInput!) {
  userRegister(user_input: $userInput) {
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
