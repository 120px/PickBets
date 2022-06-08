import { useMutation, gql } from '@apollo/client';

export const LOGOUT_USER = gql`
  mutation Mutation {
  logout
}
`;
