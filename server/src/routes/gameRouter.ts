import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { getCookie } from "hono/cookie";
import { verify } from "hono/jwt";





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

    // const token = getCookie(c,"token")
    try {
        const token = c.req.header("Authorization");
        if (!token) {
          c.status(404);
          return c.json({ msg: "token not provided" });
        }

        const validtoken = await verify(token, c.env.JWT_SECRET);
        if (!validtoken) {
          c.status(404);
          return c.json({ msg: "invalid token" });
        }
        //@ts-ignore
        c.set("userID", validtoken);

        console.log("token verified", validtoken);

        await next();
        
    } catch (error) {
        console.log(error)
        return c.json({error})
        
    }





})

gameRouter.get("/game", async (c) => {
  return c.json({ msg: "cheaking if this working" });
});


// this is for leaderboard (top 10)
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
        c.status(200)

        return c.json({players})
        
    } catch (error) {
        console.log(error)
        return c.json({msg: "error while showing leaderboard"})
        
    }

    
})

//all games route

gameRouter.get('/allgames', async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    try {
        const game = await prisma.game.findMany()
        c.status(200)
        return c.json({game})
        
    } catch (error) {
        c.status(404)
        return c.json({msg: "Internal Server Error"})
        
    }

    
})



// this is for when user click on any game to start
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


gameRouter.post('/gameover', async(c)=>{

     const prisma = new PrismaClient({
       datasourceUrl: c.env.DATABASE_URL,
     }).$extends(withAccelerate());


    const id = c.get("userID")

    try {
        const score = await c.req.json()
        const gamescore = await prisma.score.create({
            //@ts-ignore
            data:{
                score: score,
                userid: id

            }
        })

        const maxscore = await prisma.score.aggregate({
            where:{
                userid: id,
                
            },
            _max: {
                score: true
            
            }
        })

        console.log(maxscore,gamescore)

        const highest_score = await prisma.user.update({
            where:{
                id: id
            },
            data:{
                // so if no score found just putting 0 for now
                highest_score: maxscore._max.score || 0
            }
        })

        console.log(highest_score)

        return c.json({highest_score, msg: "gameoverpg working"})

        
    } catch (error) {
        console.log(error)
        return c.json({msg: "error while gameover"})
        
    }


})
