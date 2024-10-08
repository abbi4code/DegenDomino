import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";
import {
  setCookie,
 
} from "hono/cookie";

export const adminRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string
  };
  Variables:{
    adminId: string
  }
}>();



adminRouter.post('/signin',async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())


    try {
        const body = await c.req.json()

        const admin = await prisma.admin.findUnique({
            where:{
                email: body.email,
                password: body.password
            }
        })
        if(!admin){
            c.status(404)
            return c.json({msg: "admin with this email/password not exist"})
        }
        //@ts-ignore
        const token = await sign(admin.id, c.env.JWT_SECRET)
        console.log(token)

        setCookie(c, "adminntoken", token, {
            httpOnly:true,
            secure:true,
            sameSite: "None",
            maxAge: 9999999,
          });



        c.status(200)

        return c.json({msg: "admin successfully signin",token})
        
    } catch (error) {
        console.log(error)
        return c.json({msg:"error while admin signin"})
        
    }

})
adminRouter.use("/*", async (c, next) => {
  try {
    // const token = getCookie(c, "adminntoken")
  const token =  c.req.header("Authorization") || "";
  console.log(token)
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

    c.set("adminId", validtoken);

    await next();
  } catch (error) {
    console.log(error);
    return c.json({msg: "error while validating token"})
  }
});


adminRouter.post('/postgame', async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    try {
        const body = await c.req.json()

        const adminid = c.get("adminId")
        if(!body){
            c.status(404)
            return c.json({msg: "invalid inputs"})
        }

        const validtokenreq = parseInt(body.tokenreq);


        const game = await prisma.game.create({
            data:{
                title: body.title,
                description: body.description,
                tokenreq: validtokenreq,
                
                adminid: adminid
            }
        })
        c.status(200)

        return c.json({msg: "Game Posted Successfully"})


        
    } catch (error) {
        console.log(error)
        c.status(404)
        return c.json({msg:"error while posting games or game with that name already made"})
        
    }
})

adminRouter.get("/bulk",async(c)=>{
     const prisma = new PrismaClient({
       datasourceUrl: c.env.DATABASE_URL,
     }).$extends(withAccelerate());

     try {

        const allgames = await prisma.game.findMany()
        if(!allgames){
            c.status(404)
            return c.json({msg: "error while getting all games"})
        }
        c.status(200)
        return c.json({allgames})
        
     } catch (error) {
        console.log(error)
        
     }
})






