import { ObjectType, Field, Int, Float, } from "type-graphql"
import {Entity, BaseEntity, Column, PrimaryColumn, ManyToOne, JoinColumn, PrimaryGeneratedColumn} from "typeorm"
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

    @Field()
    @Column({default: false})
    in_progress: boolean

    @Column({
        type: "enum",
        enum: BetResults
    })
    bet_result: string

    // @Column({
    //     type: "enum",
    //     enum: MatchResult
    // })
    // match_result: string

    // @Column({
    //     type: "enum",
    //     enum: BetType
    // })
    // bet_type: string 

    //setting up relationship
    // @Field()
    @ManyToOne(
        () => User, 
        user => user.bets
    )

    //specifying name of primary key
    @JoinColumn({
        name: "user_id"
    })
    user: User

}