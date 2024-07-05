import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { getCookie } from "hono/cookie";
import { verify } from "hono/jwt";
import { Payload } from "@prisma/client/runtime/library";





export const gameRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  },
  Variables:{
    userID: string
  }
  
}>();

gameRouter.use('/*', async(c,next)=>{

    const token = getCookie(c,"token")
    if(!token){
        return c.json({msg: "token not provided"})
    }

    const validtoken = await verify(token, c.env.JWT_SECRET)
    if(!validtoken){
        return c.json({msg: "invalid token"})
    }
    //@ts-ignore
    c.set("userID", validtoken) 


    console.log("token verified", validtoken)

    await next()





})

gameRouter.get("/game", async (c) => {
  return c.json({ msg: "cheaking if this working" });
});

gameRouter.get('/bulk', async(c)=>{

   const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())


    try {
        const players = await prisma.user.findMany({
          orderBy: {
            highest_score: "desc",
          },
        });

        return c.json({players})
        
    } catch (error) {
        console.log(error)
        return c.json({msg: "error while showing leaderboard"})
        
    }

    
})

gameRouter.post('/startgame', async(c)=>{

    const userID = c.get("userID")
    console.log(userID)
    return c.text("game page")

})