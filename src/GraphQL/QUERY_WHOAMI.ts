import { useMutation, gql } from '@apollo/client';

export const QUERY_WHOAMI = gql`
  query Query {
  whoAmI {
    id
    username  
    account_balance
  }
}
`;
