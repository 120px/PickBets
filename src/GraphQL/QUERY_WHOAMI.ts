import { useMutation, gql } from '@apollo/client';

export const QUERY_WHOAMI = gql`
  query Query {
  whoAmI {
    password
    username  
  }
}
`;
