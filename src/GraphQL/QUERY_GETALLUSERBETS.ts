import { useMutation, gql } from '@apollo/client';

export const QUERY_GETALLUSERBETS = gql`

query FindAllUserBets {
  findAllUserBets {
    user_id
    bet_result
    wager
    potential_payout
    odds
    betting_against
    betting_for
  }
}
`;
