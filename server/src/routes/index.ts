import { Hono } from "hono";
import { authRouter } from "./authRouter";
import { gameRouter } from "./gameRouter";
import { adminRouter } from "./adminRouter";


export const parentRoute = new Hono<{
    Bindings:{
        DATABASE_URL: String,
        JWT_SECRET: String
    }
}>()

parentRoute.route('/admin',adminRouter )
parentRoute.route('/auth',authRouter)
parentRoute.route('/game', gameRouter)


parentRoute.get('/', async(c)=>{
    return c.text("hi there")
})

