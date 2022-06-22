import { ObjectType, Field, Int, Float, } from "type-graphql"
import {Entity, BaseEntity, Column, ManyToOne,  PrimaryGeneratedColumn, CreateDateColumn} from "typeorm"
import { User } from "./User"

export enum BetResults{
    WIN = "win",
    LOST = "lost"
}

export enum BetType{
    MONEYLINE = "money_line"

}

export enum MatchResult{
    HOME_TEAM = "home",
    AWAY_TEAM = "away",
    TIE = "tie"
}

@ObjectType()
@Entity("bet")
export class Bet extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number

    @Field(() => String)
    @Column()
    betting_for: string

    @Field(() => String)
    @Column()
    betting_against: string

    @Field(() => Float)
    @Column({
        type: "numeric"
    })
    odds: number

    @Field(() => Float)
    @Column({
        type: "numeric",

    })
    potential_payout: number
    
    @Field(() => Float)
    @Column({
        type: "numeric"
    })
    wager: number

    @Field(() => String)
    @Column()
    bet_result: string

    @Field()
    @Column()
    user_id: number

    // setting up relationship
    @ManyToOne(
        () => User, 
        user => user.bets
    )
    user: User

    @CreateDateColumn()
    created_at: Date
}