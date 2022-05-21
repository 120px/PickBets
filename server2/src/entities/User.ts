import { Field, Int, ObjectType, } from "type-graphql"
import {Entity, BaseEntity, Column, PrimaryColumn, CreateDateColumn, OneToMany, PrimaryGeneratedColumn} from "typeorm"
import { Bet } from "./Bet"

//convert Entity to graphQL types

@ObjectType()
@Entity("user")
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number

    @Field(() => String)
    @Column({
        unique: true
    })
    username: string

    @Field()
    @Column()
    password: string

    @Field(() => String)
    @Column({
        unique: true
    })
    email: string

    @Field(() => String)
    @Column()
    first_name: string

    @Field(() => String)
    @Column()
    last_name: string

    @Column({
        type: "numeric",
        default: 0
    })
    account_balance: number

    @CreateDateColumn()
    created_at: Date

    //setting up bet relationship
    // @Field()
    @OneToMany(
        () => Bet,
        bet => bet.user
    )
    bets: Bet[]
}