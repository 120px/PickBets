import { Field, Int, ObjectType, } from "type-graphql"
import {Entity, BaseEntity, Column, PrimaryColumn, CreateDateColumn, OneToMany, PrimaryGeneratedColumn} from "typeorm"
import { Bet } from "./Bet"

//convert Entity to graphQL types

@ObjectType()
@Entity("user")
export class User extends BaseEntity{

    @Field()
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

    @Field(() => Number)
    @Column({
        type: "numeric",
        default: 1000
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