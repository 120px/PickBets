import { Bet } from "../entities/Bet"
import { Resolver, Query, Arg, Int, Mutation, Float } from "type-graphql"
import { stringify } from "querystring"


 // @Arg("account_balance", () => Float) account_balance: number

@Resolver()
export class BetResolver {
    //all bets
    @Query(() => [Bet])
    async bets(): Promise<Bet[]> {
        return Bet.find()
    }

    @Query(() => [Bet])
    async userBets(): Promise<Bet[]> {
        return Bet.find()
    }

    @Mutation(() => Bet)
    async createBet(
        @Arg("betting_for", () => String) betting_for: string,
        @Arg("betting_against", () => String) betting_against: string,
        @Arg("odds", () => Float) odds: number,
        @Arg("potential_payout", () => Float) potential_payout: number,
        @Arg("wager", () => Float) wager: number,
        @Arg("in_progress", () => Boolean) in_progress: boolean,
        @Arg("bet_result", () => String) bet_result: string,       
        // @Arg("user_id_bet", () => Int) user_id_bet: number,       
        ) {

        const newBet = await Bet.create({betting_for, betting_against, odds, potential_payout, wager, in_progress, bet_result}).save()
        return newBet
    }

}