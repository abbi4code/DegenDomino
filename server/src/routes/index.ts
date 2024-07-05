import { Hono } from "hono";
import { authRouter } from "./authRouter";
import { gameRouter } from "./gameRouter";

export const parentRoute = new Hono<{
    Bindings:{
        DATABASE_URL: String,
        JWT_SECRET: String
    }
}>()


parentRoute.route('/auth',authRouter)
parentRoute.route('/game', gameRouter)


parentRoute.get('/', async(c)=>{
    return c.text("hi there")
})