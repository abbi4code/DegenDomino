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

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const userID = c.get("userID")
    console.log(userID)

    const validbalanceuser = await prisma.user.findUnique({
        where:{
            id: userID
        }
    })
    if(!validbalanceuser||  validbalanceuser?.token <= 0){
        return c.json({msg: "insufficient token "})
    }

    const user = await prisma.user.update({
        where: {
            id: userID,
        },
        data:{
            token: {
                decrement: 5
            }
        }
    })


    const userinfo = {fullname: user.full_name, token: user.token}

    return c.json({msg:"game page", userinfo})

})

gameRouter.get('/balance', async(c)=>{
     const prisma = new PrismaClient({
       datasourceUrl: c.env.DATABASE_URL,
     }).$extends(withAccelerate());

     const userID = c.get("userID");
     console.log(userID);

     const user = await prisma.user.findUnique({
        where:{
            id: userID
        }
     })
     const balance = user?.balance

     return c.json({balance})

})
gameRouter.get('/token_balance', async(c)=>{
     const prisma = new PrismaClient({
       datasourceUrl: c.env.DATABASE_URL,
     }).$extends(withAccelerate());

     const userID = c.get("userID");
     console.log(userID);

     const user = await prisma.user.findUnique({
        where:{
            id: userID
        }
     })
     const tokenbalance = user?.token

     return c.json({tokenbalance})

})

