import { useMutation, gql } from '@apollo/client';

export const CREATE_BET = gql`
mutation Mutation($wager: Float!, $potentialPayout: Float!, $odds: Float!, $bettingAgainst: String!, $bettingFor: String!, $betResult: String!, ) {
  createBet(betting_for: $bettingFor, 
  betting_against: $bettingAgainst, odds: $odds, 
  potential_payout: $potentialPayout, wager: $wager, 
  bet_result: $betResult,){
    bet_result
  }
}
`;