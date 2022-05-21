import { createConnection } from "typeorm"
import "reflect-metadata";
import { ApolloServer } from "apollo-server-express"
import express from "express"
import { Bet } from "./entities/Bet"
import { User } from "./entities/User"
import { buildSchema } from "type-graphql"
import { UserResolver } from "./resolvers/res_users"
import { BetResolver } from "./resolvers/res_bets";
import cors from "cors"
import session from "express-session"

const PORT = 8181


const main = async () => {

    try {
        const connection = await createConnection({
            type: "postgres",
            host: "localhost",
            database: "PickBets",
            port: 5432,
            username: "postgres",
            password: "123",
            entities: [User, Bet],
            synchronize: true
        })

        const app = express()
        app.use(cors())

        //for the cookies on apollo server
        // app.set('trust proxy', 1);


        app.use(session({
            name: "qid",
            secret: "12PICK_BETS551731",

            cookie: {
                maxAge: 1000 * 60 * 60 * 24,
                httpOnly: false,
                sameSite: "lax", // csrf
                secure: false, // cookie only works in https
                // domain: __prod__ ? ".codeponder.com" : undefined,
            }

        }))

        const apolloServer = new ApolloServer({
            schema: await buildSchema({
                resolvers: [UserResolver, BetResolver],
                validate: false
            }),

            context: ({ req, res }) => ({
                req, res
            })
        })

        await apolloServer.start()
        apolloServer.applyMiddleware({
            app,
            //for the cookies on apollo server
            // cors: false
        })

        app.get('/', (_, res) => {
            res.send('Example Server');
        });

        app.listen(PORT, () => {
            console.log("express server started on port: " + PORT)
        })

    } catch (error) {
        console.log(error)
    }

}

main()