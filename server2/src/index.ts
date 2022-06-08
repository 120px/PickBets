import { createConnection } from "typeorm"
import "reflect-metadata";
import { ApolloServer } from "apollo-server-express"
import express from "express"
import { Bet } from "./entities/Bet"
import { User } from "./entities/User"
import { buildSchema } from "type-graphql"
import { UserResolver } from "./resolvers/res_users"
import { BetResolver } from "./resolvers/res_bets";
import fetch from "node-fetch";
import cors from "cors"
import session from "express-session"
require("dotenv").config()

const PORT = 8181
const api_key = process.env.API_KEY

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
        app.use(cors({
            origin: "http://localhost:3000",
            credentials: true 
        }))

        // for the cookies on apollo server
        app.set('trust proxy', 1);

        app.use(session({
            name: "qid",
            secret: "12PICK_BETS551731",
            saveUninitialized: false,
            resave: true,

            cookie: {
                domain: "localhost",
                path: "/",
                maxAge: 1000 * 60 * 60 * 24,
                httpOnly: false,
                sameSite: "lax", // csrf
                secure: false, // cookie only works in https if true
                // domain: __prod__ ? ".codeponder.com" : undefined,
            },


        }))

        app.get("/NCAAF", async (req, res) => {
            const options = {
                medthod: "GET",
                headers: {
                    "Content-Type":"application/json",
                    "Access-Control-Allow-Origin": "*"
                },
            }
            const response = await fetch(`https://api.the-odds-api.com/v4/sports/americanfootball_ncaaf/odds/?apiKey=${api_key}&regions=us&markets=h2h,spreads&oddsFormat=decimal`)
            const data = await response.json()
            await res.json(data)
        })

        app.get("/MLB", async (req, res) => {
            const options = {
                medthod: "GET",
                headers: {
                    "Content-Type":"application/json",
                    "Access-Control-Allow-Origin": "*"
                },
            }
            const response = await fetch(`https://api.the-odds-api.com/v4/sports/baseball_mlb/odds/?apiKey=${api_key}&regions=us&markets=h2h,spreads&oddsFormat=decimal`)
            const data = await response.json()
            await res.json(data)
        })

        app.get("/NHL", async (req, res) => {
            const options = {
                medthod: "GET",
                headers: {
                    "Content-Type":"application/json",
                    "Access-Control-Allow-Origin": "*"
                },
            }
            const response = await fetch(`https://api.the-odds-api.com/v4/sports/icehockey_nhl/odds/?apiKey=${api_key}&regions=us&markets=h2h,spreads&oddsFormat=decimal`)
            const data = await response.json()
            await res.json(data)
        })

        app.get("/NBA", async (req, res) => {
            const options = {
                medthod: "GET",
                headers: {
                    "Content-Type":"application/json",
                    "Access-Control-Allow-Origin": "*"
                },
            }
            const response = await fetch(`https://api.the-odds-api.com/v4/sports/basketball_nba/odds/?apiKey=${api_key}&regions=us&markets=h2h,spreads&oddsFormat=decimal`)
            const data = await response.json()
            await res.json(data)
        })

        app.get("/SOCCER", async (req, res) => {
            const options = {
                medthod: "GET",
                headers: {
                    "Content-Type":"application/json",
                    "Access-Control-Allow-Origin": "*"
                },
            }
            const response = await fetch(`https://api.the-odds-api.com/v4/sports/soccer_usa_mls/odds/?apiKey=${api_key}&regions=us&markets=h2h,spreads&oddsFormat=decimal`)
            const data = await response.json()
            await res.json(data)
        })

        app.get("/MMA", async (req, res) => {
            const options = {
                medthod: "GET",
                headers: {
                    "Content-Type":"application/json",
                    "Access-Control-Allow-Origin": "*"
                },
            }
            const response = await fetch(`https://api.the-odds-api.com/v4/sports/mma_mixed_martial_arts/odds/?apiKey=${api_key}&regions=us&markets=h2h,spreads&oddsFormat=decimal`)
            const data = await response.json()
            await res.json(data)
        })

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
            cors: false
        })

        app.listen(PORT, () => {
            console.log("express server started on port: " + PORT)
        })

    } catch (error) {
        console.log(error)
    }

}

main()