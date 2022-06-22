import { useMutation, gql } from '@apollo/client';

export const QUERY_WHOAMI = gql`
  query Query {
  whoAmI {
    id
    username  
    account_balance
    first_name
    last_name
    email
  }
}
`;
