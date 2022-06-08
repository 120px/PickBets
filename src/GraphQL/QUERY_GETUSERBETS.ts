import { useMutation, gql } from '@apollo/client';

export const QUERY_GETUSERBETS = gql`

    query FindUserBets {
    findUserBets {
        betting_for
        betting_against
        odds
        potential_payout
        wager
        bet_result
  }
}
`;
