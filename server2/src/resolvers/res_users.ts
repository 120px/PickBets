import { User } from "../entities/User"
import { Resolver, Query, Arg, Int, Mutation, Float, InputType, Field, ObjectType, Ctx } from "type-graphql"
import { type } from "os"
import { Response } from "express"
import { MyContext } from "src/types/MyContext"

// @Arg("account_balance", () => Float) account_balance: number

@InputType()
class UserRegisterInput {
    @Field()
    username: string
    @Field()
    password: string
    @Field()
    email: string
    @Field()
    first_name: string
    @Field()
    last_name: string

}

@ObjectType()
class FieldError {
    @Field()
    field: string
    @Field()
    message: string
}

@ObjectType()
class UserLoginResponse {
    @Field(() => User, { nullable: true })
    user?: User

    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[]

}

@Resolver()
export class UserResolver {
    //finding all users
    @Query(() => [User])
    async users(): Promise<User[]> {
        return User.find()
    }

    @Query(() => User, { nullable: true })
    async whoAmI(
        @Ctx() { req }: MyContext
    ) {
        if (!req.session!.userId) {
            return null
        }

        const user = await User.findOne({
            where: {
                id: req.session!.userId
            }
        })
        return user
    }

    @Mutation(() => UserLoginResponse)
    async userLogin(
        @Arg("usernameInput") usernameInput: string,
        @Arg("passwordInput") passwordInput: string,
        @Ctx() { req }: MyContext
    ): Promise<UserLoginResponse> {

        const user = await User.findOneBy({ username: usernameInput })
        if (!user) {
            return {
                errors: [{
                    field: "username",
                    message: "Username does not exist"
                }]
            }
        }

        if (user.password !== passwordInput) {
            return {
                errors: [{
                    field: "password",
                    message: "Incorrect password"
                }]
            }
        }

        req.session!.userId = user.id
        return { user }
    }

    //registering
    @Mutation(() => UserLoginResponse)
    async userRegister(
        @Arg("user_input", () => UserRegisterInput) user_input: UserRegisterInput) {

        let newUser
        try {
            const newUser = await User.create({
                username: user_input.username,
                password: user_input.password,
                email: user_input.email,
                first_name: user_input.first_name,
                last_name: user_input.last_name
            }).save()

            console.log("asd1")
            return newUser

        } catch (err) {
            console.log(err)
            if (err.code === "23505") {

                if (err.detail.includes("username")){
                    return {
                        errors: [{
                            field: "username",
                            message: "Username already exists!"
                        }]
                    }
                }

                if (err.detail.includes("email")){
                    return {
                        errors: [{
                            field: "email",
                            message: "Email already exists!"
                        }]
                    }
                }                
            }
        }

        return newUser
    }
}