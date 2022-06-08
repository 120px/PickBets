import { Bet } from "../entities/Bet"
import { Resolver, Query, Arg, Int, Mutation, Float, Ctx } from "type-graphql"
import { stringify } from "querystring"
import { User } from "../entities/User"
import { MyContext } from "src/types/MyContext"
import { getConnection, getRepository } from "typeorm"


// @Arg("account_balance", () => Float) account_balance: number

@Resolver()
export class BetResolver {
    //all bets
    @Query(() => [Bet])
    async bets(): Promise<Bet[]> {
        return Bet.find()
    }

    @Query(() => [Bet])
    async findUserBets(
        @Ctx() {req} : MyContext,
    ) : Promise<Bet[]>{

        const user_bets = await getConnection().getRepository(Bet)
        .createQueryBuilder("user_bets")
        .where("user_id = :id", {id: req.session?.userId})
        .orderBy("created_at")
        .limit(3)
        .getMany()

        console.log(user_bets)
        return user_bets
        
    }

    @Query(() => [Bet])
    async findAllUserBets(
        @Ctx() {req} : MyContext,
    ) : Promise<Bet[]>{

        const user_Allbets = await getConnection().getRepository(Bet)
        .createQueryBuilder("user_bets")
        .where("user_id = :id", {id: req.session?.userId})
        .getMany()

        console.log(user_Allbets)
        return user_Allbets
        
    }

    @Query(() => User, { nullable: true })
    async whoAmI(
        @Ctx() { req }: MyContext
    ) {
        if (!req.session!.userId) {
            return null
        }

        const user = await User.findOneBy({
            id: req.session!.userId
        })
        return user
    }

    @Mutation(() => Bet)
    async createBet(
        @Ctx() { req }: MyContext,
        @Arg("betting_for", () => String) betting_for: string,
        @Arg("betting_against", () => String) betting_against: string,
        @Arg("odds", () => Float) odds: number,
        @Arg("potential_payout", () => Float) potential_payout: number,
        @Arg("wager", () => Float) wager: number,
        @Arg("bet_result", () => String) bet_result: string,

    ) {

        if (!req.session?.userId) {
            return {

            }
        }

        const newBet = await Bet.create({ betting_for, betting_against, odds, potential_payout, wager, bet_result, user_id: req.session?.userId }).save()

        const user = await User.findOneBy({
            id: req.session!.userId
        })

        let newBalance = user!.account_balance - wager

        //handle bet outcomes
        if (bet_result === "WIN"){
            newBalance = +user!.account_balance + potential_payout
        }else{

        }

        if(newBalance < 0){
            return
        }

        User.createQueryBuilder().update(User).set({account_balance: newBalance}).where("id = :id", {id: req.session?.userId}).execute()
        
        // user!.account_balance = user!.account_balance - wager
        return newBet
    }

}